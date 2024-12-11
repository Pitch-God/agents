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
        schedule:z
        .object({
            isUserRequested: z
            .boolean()
            .describe("If the recipient has requested a meeting"),
            date: z
            .string()
            .optional()
            .describe("The date of the meeting that the recipient has requested"),
            isRequired: z
            .boolean()
            .describe("If the recipient has not requested a meeting and but it is okay to ask for one"),
        }),
        isRetrievalRequired: z
        .boolean()
        .describe("isRetrievalRequired"),
        emailThreadSummary: z
        .string()
        .describe("The concise summary of the email thread")
    })
);





export const prompt = PromptTemplate.fromTemplate(`
    You are expert in reading email threads and generating the correct actions for the agent to take. You will be given a thread of emails and your task is to generate the correct actions for the agent. Email wiht type:'SENT' are the emails that you have sent to the recipient by you and type:'REPLY' are the emails that you have received from the recipient.
    The actions you can take are:
    - Translation
    - Scheduling
    - Retrieval
   
\n{format_instructions}\n{email_thread}\n
    
    `)
