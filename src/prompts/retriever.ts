import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { nullable, z } from "zod";
import { PromptTemplate } from "@langchain/core/prompts";


export const parser = StructuredOutputParser.fromZodSchema(
    z
        .array(
            z.object({
                context: z.string().describe("The relevant context for the email reply from the knowledge base"),
                relevanceScore: z.number().min(0).max(10).describe("The relevance score of the context with 1 being the lowest and 10 being the highest"),
            })
        )
        .nullable()
        .describe("The relevant context for the email reply from the knowledge base"),
    )



export const prompt2 = PromptTemplate.fromTemplate(`

You are a knowledge base extractor tasked with finding relevant information to help reply to an email. You will be provided with a knowledge base, an email thread, and the latest email in that thread. Your job is to extract information from the knowledge base that is relevant and helpful for replying to the latest email.

First, carefully read through the following knowledge base:

<knowledge_base>
{knowledge_base}
</knowledge_base>

Now, review the email thread for context:

<email_thread>
{email_thread}
</email_thread>



3. Search the knowledge base for information relevant to these themes. Focus on selecting content that is directly applicable to the email thread. This may include:
   - Product descriptions
   - Features and benefits
   - Pricing information
   - FAQs
   - Support details
   - Specific offers mentioned in the conversation

4. Strictly select only the information from the knowledge base that is relevant to the email thread. Do not include unrelated content or make assumptions beyond what is provided.

5. Organize the selected information in a clear and logical manner, grouping related points together.

6. Format your response according to the following instructions:

{format_instructions}

Remember:
- Only include information from the provided knowledge base.
- Ensure all selected content is directly relevant to the email thread.
- Do not select the content from the email thread.
- Do not generate new information or make assumptions beyond what is provided.
- Focus on providing factual, helpful information that addresses the specific context of the email conversation.

    
    `)


    export const prompt = PromptTemplate.fromTemplate(`
        You are a context finder that helps identify the most relevant information needed for email replies. Given a knowledge base and an email thread, you will extract only the specific information that would be helpful for crafting a response to the latest email.
        
        <knowledge_base>
        {knowledge_base}
        </knowledge_base>
        
        <email_thread>
        {email_thread}
        </email_thread>
        
        Extract only the most pertinent information by:
        
        1. Identifying the key topics and questions from the latest email
        2. Selecting only the knowledge base content that directly addresses these points
        3. Excluding any information that isn't directly relevant to crafting a reply
        
        Format your response according to:
        {format_instructions}
        
        Remember:
        - Only include information that's directly relevant to addressing the latest email
        - Exclude peripheral information, even if it's related to the broader topic
        - Do not make assumptions or generate new information
        - Keep the context focused and concise
        `)