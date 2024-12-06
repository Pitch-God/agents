import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import { input2,input } from "../examples/reply.js";
import { prompt, parser } from "../prompts/manager.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";


const chain=  RunnableSequence.from([
    prompt,
    model,
    parser

]

)


export const managerNode= async(state: typeof StateAnnotation.State, _config: RunnableConfig) => {


    const {emailThread,userLocation}= state;


    const result= await chain.invoke({ 
        email_thread:JSON.stringify(emailThread),
        format_instructions: parser.getFormatInstructions(),
        user_location:userLocation
     });



const {isTranslationRequired, schedule, isRetrievalRequired, emailThreadSummary,userTimeZone}= result;

return {
    isTranslationRequired,
    schedule,
    isRetrievalRequired,
    emailThreadSummary,
    emailThread,
    userTimeZone
}

}



const run = async (email_thread: string) => {
    const result = await chain.invoke({ 

        email_thread:email_thread,
        format_instructions: parser.getFormatInstructions(),
        user_location:"Budapest, Hungary"
     });
    return result;
};



run(JSON.stringify(input2)).then((result) => {
    console.log(result);
});