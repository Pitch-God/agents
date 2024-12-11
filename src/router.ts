import { StateAnnotation } from "./utils/state.js";
import { END } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";


export const decideToRetrieve = async (state: typeof StateAnnotation.State) => {

if(state.isRetrievalRequired){
    return "retriever";
}else{
    return "compiler";
}

};



export const decideToSchedule = async (state: typeof StateAnnotation.State) => {

    if(state.schedule.isUserRequested || state.schedule.isRequired){
        return "scheduler";
    }else{
        return "compiler";
    }
}



export const shouldSchedule= (state:typeof StateAnnotation.State)=>{
    const {messages}= state;
    const lastMessage = messages[messages.length-1] as AIMessage

    if (!lastMessage) {
        return "scheduler";
    }


   try {
        const content = JSON.parse(lastMessage.content as string);
        // If we have properly formatted slots, we're done
        if (content.slots && content.slots.length === 2) {
            return "compiler";
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


export function managerRoute(state: typeof StateAnnotation.State): string[] {
    const routes: string[] = [];
    
    // Check if retrieval is required
    if (state.isRetrievalRequired) {
        routes.push("retriever");
    }
    
    // Check if scheduling is required
    if (state.schedule.isUserRequested || state.schedule.isRequired) {
        routes.push("scheduler");
    }
    
    // If no special routes are needed, go straight to compiler
    if (routes.length === 0) {
        routes.push("compiler");
    }
    
    return routes;
}
