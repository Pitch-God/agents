import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    reply: z.string().describe("The reply to the email thread "),
    type: z.enum(["reply", "followup"]).describe("reply"),
  }),
);

export const replyPrompt = PromptTemplate.fromTemplate(`
        You are tasked with creating a concise, semi-formal response to a client's reply to our previous email. The response should acknowledge their feedback while maintaining professionalism and suggest a time slot for a meeting if provided in the slots <slots> {slots} </slots>. Respond in <language> {language} </language> language.
        
        Review the email thread:
        <email_thread>
        {email_thread}
        </email_thread>
        
        Guidelines for your reply:
        1. Acknowledge the client's response points specifically
        2. Address any questions or concerns they've raised
        3. Keep the tone semi-formal 
        4. Provide clear next steps or confirmations
        5. End with a concrete action item or confirmation
        6. Keep the reply short and to the point
        
        Format your reply according to:
        {format_instructions}
        
        Remember:
        - Reference specific points from their reply
        - Show appreciation for their response
        - Be clear about any agreements or decisions
        - Maintain a professional but warm tone
        - Confirm any arrangements or next steps discussed
        `);

export const followUpPrompt = PromptTemplate.fromTemplate(`
        You are tasked with creating a gentle follow-up email after not receiving a response to a previous email and also suggest a time slot for a meeting if given in the slots <slots> {slots} </slots> and respond in <language> {language} </language> language
        
        
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
        `);
