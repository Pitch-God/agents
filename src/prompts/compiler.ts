import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";




export const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        reply: z.string().describe("The reply to the email thread "),
        type:z.enum(["reply","followup"]).describe("reply"),
    }),
    
    );


    export const replyPrompt = PromptTemplate.fromTemplate(`
        You are tasked with creating concise, semi-formal email replies that get straight to the recipient point while maintaining professionalism and also suggest a time slot for a meeting if given in the slots <slots> {slots} </slots>
        
        Review the email thread:
        <email_thread>
        {email_thread}
        </email_thread>
        
        Consider these reply details:
        <reply_details>
        {reply_details}
        </reply_details>
        
        Guidelines for your reply:
        1. Keep the response brief and focused
        2. Use a friendly but professional tone
        3. Address key points directly without unnecessary elaboration
        4. Skip unnecessary pleasantries while remaining polite
        5. End with a simple, appropriate closing
        
        Format your reply according to:
        {format_instructions}
        
        Remember:
        - Be direct but not abrupt
        - Prioritize clarity and brevity
        - Maintain a light, professional tone
        - Only include essential information
        `)




    export const followUpPrompt = PromptTemplate.fromTemplate(`
        You are tasked with creating a gentle follow-up email after not receiving a response to a previous email and also suggest a time slot for a meeting if given in the slots <slots> {slots} </slots>
        
        
        Review the original email thread:
        <email_thread>
        {email_thread}
        </email_thread>
        
        Consider these follow-up details:
        <reply_details>
        {reply_details}
        </reply_details>
        
        Guidelines for your follow-up:
        1. Open with a friendly acknowledgment of their busy schedule
        2. Briefly reference the previous email's key points
        3. Provide a low-pressure reminder of any pending items
        4. Keep the tone helpful rather than demanding
        5. Give them an easy way to respond
        
        Format your reply according to:
        {format_instructions}
        
        Remember:
        - Be understanding and patient in tone
        - Keep it short and easy to respond to
        - Don't make them feel guilty about not replying
        - Maintain professionalism while being friendly
        - Leave the door open for them to respond when they can
        `)