import { model } from "../utils/model.js"
import { RunnableSequence } from "@langchain/core/runnables";
import { input } from "../examples/reply.js";
import { packageman } from "../examples/packageman.js";
import { prompt, parser } from "../prompts/retriever.js";
import { tool } from "@langchain/core/tools";
import axios from "axios";




// this has access to the calendly tools

// Can find the time in IST based on the timezone


// Can check all the available time slots on the booking calendar


const scheduleTool= tool(async({})=>{

const availableTimeSlots= await axios.get("https://api.calendly.com/scheduler/available_time_slots",{
    headers: {
        "Authorization": "Bearer YOUR_TOKEN"
      }
})


},

{
name:"scheduleTool",
description:"Call to get the available time slots from the Calendly calendar",




})



