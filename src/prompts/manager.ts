import {  PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import { input2,input } from "../examples/reply.js";

export const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        isTranslationRequired: z.object({
            isTranslationRequired: z
            .boolean()
            .describe("The translation is required if the conversation is not in english"),
            language: z
            .string()
            .optional()
            .describe("The language of the conversation"),
        }),
        isSchedulingRequired: z
        .boolean()
        .describe("isSchedulingRequired"),
        isRetrievalRequired: z
        .boolean()
        .describe("isRetrievalRequired"),
        emailThreadSummary: z
        .string()
        .describe("emailThread"),
        emailHistory: z.array(
            z.object({
                type: z.string(),
                message_id: z.string(),
                time: z.string(),
                email_body: z.string(),
                subject: z.string(),
                email_seq_number: z.string(),
        
            })
        ),
    })
);





export const prompt = PromptTemplate.fromTemplate(`
    You are expert in reading email threads and generating the correct actions for the agent to take. You will be given a thread of emails and your task is to generate the correct actions for the agent to take.
    The actions you can take are:
    - Translation
    - Scheduling
    - Retrieval

\n{format_instructions}\n{email_thread}
    
    `)

