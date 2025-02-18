import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export const categoriserPrompt = PromptTemplate.fromTemplate(`
You are an expert at analyzing B2B email conversations and response patterns. You understand that responses generally fall into 6 main categories based on the prospect's level of engagement and needs. Your task is to analyze the conversation and return ONLY the corresponding number:
1: INTERESTED - Shows positive inclination to learn more, expresses general curiosity about offering, gives positive acknowledgment, asks about broad next steps or indicates willingness to proceed further.
2: MORE INFO - Asks specific questions about the service or offering details, seeks clarity on particular aspects, requests information about capabilities, shows targeted curiosity about features or services.
3: MEETING - Directly engages with scheduling, discusses availability, coordinates meeting times, focuses on setting up calls or meetings, works on finding suitable time slots.
4: CASE STUDY - Requests examples of past work, asks for proof or evidence of results, seeks validation through similar client examples, wants to see concrete demonstrations of success.
5: OBJECTION - Raises concerns or doubts, questions pricing or value, mentions implementation challenges, expresses hesitation about approach, brings up potential limitations or issues.
6: MECHANISM - Asks about technical details, queries about processes and implementation, seeks understanding of how things work, focuses on operational aspects and specific methodologies.

CLASSIFICATION RULES:
Return ONLY a single pattern (1-6). If multiple patterns apply, choose based on the most prominent theme in the latest response. Consider the full conversation for context but prioritize the latest response. Do not provide any explanation or additional text. Do not hedge or suggest multiple patterns

Analyse the following email thread:
<email_thread>
{email_thread}
</email_thread>

Output Format:
{format_instructions}

`);

export const categoriserParser = StructuredOutputParser.fromZodSchema(
  z.object({
    category: z
      .enum([
        "INTERESTED",
        "MORE INFO",
        "MEETING",
        "CASE STUDY",
        "OBJECTION",
        "MECHANISM",
      ])
      .describe("The category of the email"),
  }),
);
