import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import { input2,input } from "../examples/reply.js";
import { prompt, parser } from "../prompts/manager.js";


const chain=  RunnableSequence.from([
    prompt,
    model,
    parser

]

)








const run = async (email_thread: string) => {
    const result = await chain.invoke({ 

        email_thread:email_thread,
        format_instructions: parser.getFormatInstructions(),
     });
    return result;
};



run(JSON.stringify(input2)).then((result) => {
    console.log(result);
});