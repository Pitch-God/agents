import { StateAnnotation } from "./utils/state.js";
import { toolNode } from "./agent/toolNode.js";
import { schedulerNode } from "./agent/scheduler.js";
import { END, Graph, START, StateGraph } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { input } from "./examples/reply.js";



const shouldSchedule= (state:typeof StateAnnotation.State)=>{
    const {messages}= state;
    const lastMessage = messages[messages.length-1] as AIMessage

    if (!lastMessage) {
        return "scheduler";
    }


   try {
        const content = JSON.parse(lastMessage.content as string);
        // If we have properly formatted slots, we're done
        if (content.slots && content.slots.length === 2) {
            return END;
        }
        // If we have the API response but haven't formatted slots yet
        if (content.suggested_days) {
            return "scheduler";
        }
    } catch (e) {
        // If we can't parse the content, it's probably a tool call
        if (lastMessage?.tool_calls?.length > 0) {
            return "scheduleTool";
        }
    }

    // Add a default return path
    return "scheduler";
}


const workflow= new StateGraph(StateAnnotation)
.addNode("scheduler",schedulerNode)
.addNode("scheduleTool",toolNode)
.addEdge(START, "scheduler")
.addConditionalEdges("scheduler",shouldSchedule)
.addEdge("scheduleTool", "scheduler");


export const graph= workflow.compile()

const result = await graph.invoke({
    emailThread:JSON.stringify(input),
    userLocation: "New York",
    emailSentDate:"2024-12-09T14:43:06.599Z"
})

console.log(result)