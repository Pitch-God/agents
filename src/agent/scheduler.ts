import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import "dotenv/config";
import { suggestMeetingPrompt, parser } from "../prompts/scheduler.js";
import { scheduleTools } from "../tools/index.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";



export const schedulerNode = async (state: typeof StateAnnotation.State, _config: RunnableConfig) => {

const chain=  RunnableSequence.from([
  suggestMeetingPrompt,
  model.bindTools(scheduleTools),

])
const {emailThread,userLocation,emailSentDate}= state;




if(emailSentDate===null){
  return state
}

console.log({emailSentDate})

const result = await chain.invoke({
  email_sent_date: emailSentDate,
  location:userLocation,
  return_timezone:"Asia/Kolkata",
  format_instructions: parser.getFormatInstructions(),
  email_thread: JSON.stringify(emailThread)
})



return {
  messages: [result]
}


// console.log(result)

}

// this has access to the calendly tools

// Can find the time in IST based on the timezone


// Can check all the available time slots on the booking calendar
