import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { PromptTemplate } from "@langchain/core/prompts";


export const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        relevantContext: z
        .array(
            z.object({
                context: z.string().describe("The relevant context for the email reply from the knowledge base"),
                relevanceScore: z.number().min(0).max(10).describe("The relevance score of the context with 1 being the lowest and 10 being the highest"),
            })
        )
        .describe("The relevant context for the email reply"),
    }),
);



export const prompt = PromptTemplate.fromTemplate(`

    You are a helpful assistant that helps in retreiveing any relevant context from the {{knowledge_base}} for the email reply based on the {{email_thread}}. 

    Strictly pick only from the {{knowledge base}} that is relevant to the email thread.

    The context can be
    - Product Description
    - Product Features
    - Product Benefits
    - Product Pricing
    - Product Reviews
    - Product FAQs
    - Product Support
    - Product Downloads
    - Product Documentation
    - The offer


    Here is the email thread:
    {email_thread}
    
    Here is the knowledge base:
    {knowledge_base}
    

\n{format_instructions}\n
    
    `)
