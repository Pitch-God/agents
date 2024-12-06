import { StateAnnotation } from "./utils/state.js";
import { END } from "@langchain/langgraph";


export const decideToRetrieve = async (state: typeof StateAnnotation.State) => {

if(state.isRetrievalRequired){
    return "retriever";
}else{
    return "compiler";
}

};


