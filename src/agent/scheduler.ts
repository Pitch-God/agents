import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import "dotenv/config";
import { suggestMeetingPrompt, parser } from "../prompts/scheduler.js";
import { scheduleTools } from "../tools/index.js";



const chain=  RunnableSequence.from([
  suggestMeetingPrompt,
  model.bindTools(scheduleTools),

])

const result = await chain.invoke({
  email_sent_date: "2024-12-08T10:12:03.409Z",
  location:"Budapest, Hungary",
  return_timezone:"IST",
  format_instructions: parser.getFormatInstructions(),
})


console.log(result)

// this has access to the calendly tools

// Can find the time in IST based on the timezone


// Can check all the available time slots on the booking calendar
