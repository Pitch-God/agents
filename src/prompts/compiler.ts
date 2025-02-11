import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    reply: z.string().describe("The reply to the email thread "),
    type: z.enum(["reply", "followup"]).describe("reply"),
    style: z
      .enum(["reply", "followup"])
      .describe("the style of the reply or the followup"),
  }),
);

export const replyPrompt = PromptTemplate.fromTemplate(`
        You are tasked with creating a concise, semi-formal response to a client's reply to our previous email. The response should acknowledge their feedback while maintaining professionalism and suggest a time slot for a meeting if provided in the slots <slots> {slots} </slots>. Respond in <language> {language} </language> language.
        
        Review the email thread:
        <email_thread>
        {email_thread}
        </email_thread>


        And here is the reply style example:
        <reply_style>
        {reply_style}
        </reply_style>
        
    
        
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


          And here is the reply style example:
        <reply_style>
        {reply_style}
        </reply_style>
        
     
        
        Format your reply according to:
        {format_instructions}
        
        Remember:
        - Be understanding and patient in tone
        - Keep it short and easy to respond to
        - Don't make them feel guilty about not replying
        - Maintain professionalism while being friendly
        - Leave the door open for them to respond when they can
        `);
