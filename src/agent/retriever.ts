import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import { input } from "../examples/reply.js";
import { packageman } from "../examples/packageman.js";
import { prompt, parser } from "../prompts/retriever.js";



// returs the relevant context for the email reply from the knowledge base

const chain=  RunnableSequence.from([
    prompt,
    model,
    parser

])


export const run = async (email_thread: string,knowledge_base:string) => {



    const result = await chain.invoke({ 
        email_thread:email_thread,
        knowledge_base:knowledge_base,
        format_instructions: parser.getFormatInstructions(),
     });
    return result;
};


run(JSON.stringify(input), JSON.stringify(packageman)).then((result) => {
    console.log(result);
});





