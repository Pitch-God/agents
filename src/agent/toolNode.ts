import { scheduleTools } from "../tools/index.js";
import { ToolNode } from "@langchain/langgraph/prebuilt";


export const toolNode= new ToolNode(scheduleTools)

