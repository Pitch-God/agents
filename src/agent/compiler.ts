import { replyPrompt,parser,followUpPrompt } from "../prompts/compiler.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { model } from "../utils/model.js"
import { RunnableConfig } from "@langchain/core/runnables";





export const compilerNode = async (state: typeof StateAnnotation.State, _config: RunnableConfig) => {
    const {emailThread,slots}= state; 

    const replyDetails: Record<string, string > = {}

if(state.isReply){
    replyDetails.type="reply"
}else{
    replyDetails.type="followup"
}

    const chain=  RunnableSequence.from([
        replyDetails.type==="reply"?replyPrompt:followUpPrompt,
        model,
        parser
    ])




if(state.isRetrievalRequired){

   replyDetails.knowledge_base=JSON.stringify(state.retrievedContext)
}




    const result = await chain.invoke({ 
        email_thread:JSON.stringify(emailThread),
        reply_details:JSON.stringify(replyDetails),
        format_instructions: parser.getFormatInstructions(),
        slots:JSON.stringify(slots)
     });



    return {
        finalReply: result
    };
}



