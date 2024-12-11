import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import "dotenv/config";
import { suggestMeetingPrompt, parser } from "../prompts/scheduler.js";
import { scheduleTools } from "../tools/index.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";
import { AIMessage } from "@langchain/core/messages";


export const schedulerNode = async (state: typeof StateAnnotation.State, _config: RunnableConfig) => {

const chain=  RunnableSequence.from([
  suggestMeetingPrompt,
  model.bindTools(scheduleTools),

])
const {emailThread,userLocation,emailSentDate}= state;




if(emailSentDate===null){
  return state
}


    // If we have a previous API response, parse it and select two slots
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage?.content) {
        try {
            const apiResponse = JSON.parse(lastMessage.content as string);
            if (apiResponse.suggested_days) {
                // Select two suitable slots from different days if possible
                const selectedSlots = [];
                for (const day of apiResponse.suggested_days) {
                    if (selectedSlots.length >= 2) break;
                    
                    if (day.available_slots.length > 0) {
                        // Take the first available slot from this day
                        const slot = day.available_slots[0];
                        selectedSlots.push({
                            date: day.date,
                            time: slot.local_time,
                            start_time: slot.start_time,
                            end_time: slot.end_time
                        });
                    }
                }

                if (selectedSlots.length === 2) {


                  console.log({selectedSlots})

                    return {
                        messages: [new AIMessage({ 
                            content: JSON.stringify({ slots: selectedSlots })
                        })],

                        slots: selectedSlots
                    };
                }
            }
        } catch (e) {
            console.error("Error parsing API response:", e);
        }
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
