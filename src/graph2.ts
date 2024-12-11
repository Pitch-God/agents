import { StateAnnotation } from "./utils/state.js";
import { toolNode } from "./agent/toolNode.js";
import { schedulerNode } from "./agent/scheduler.js";
import { END, Graph, START, StateGraph } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { input } from "./examples/reply.js";



const shouldSchedule= (state:typeof StateAnnotation.State)=>{
    const {messages}= state;
    const lastMessage = messages[messages.length-1] as AIMessage
    if(lastMessage?.tool_calls?.length||0>0){

        return "scheduleTool"
    }else{
        return "scheduler"
    }


}


const workflow= new StateGraph(StateAnnotation)
.addNode("scheduler",schedulerNode)
.addNode("scheduleTool",toolNode)
.addEdge(START, "scheduler")
.addConditionalEdges("scheduler",shouldSchedule)
.addEdge("scheduler",END)


export const graph= workflow.compile()

const result = await graph.invoke({
    emailThread:JSON.stringify(input),
    userLocation: "New York",
    emailSentDate:"2024-12-09T14:43:06.599Z"
})

console.log(result)