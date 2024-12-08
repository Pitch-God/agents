import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { nullable, z } from "zod";




export const parser = StructuredOutputParser.fromZodSchema(
    z
        .array(
            z.object({
                start_time: z.string().describe("The start time of the meeting"),
                end_time: z.string().describe("The end time of the meeting"),
            })
        )
        .describe("The available time slots for a meeting"),
    )

export const suggestMeetingPrompt = PromptTemplate.fromTemplate(`
You are a scheduler that helps schedule meetings and has access to the calendly tools to get the available time slots based on the users location and time slots. You will be provided with the email sent date, location and return timezone. Your job is to find the best time slot for a meeting. And return just two time slots at max.


Find the best time slot for a meeting based on the email sent date, location and return timezone:
<email_sent_date>
{email_sent_date}
</email_sent_date>

<return_timezone>
{return_timezone}
</return_timezone>

<location>
{location}
</location>

Format your response according to:
{format_instructions}

Remember:   
- Only include information that's directly relevant to addressing the latest email
- Exclude peripheral information, even if it's related to the broader topic
- Do not make assumptions or generate new information
- Keep the response brief and focused

`)


