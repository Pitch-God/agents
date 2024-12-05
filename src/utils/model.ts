
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config"




export const model= new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY
});











