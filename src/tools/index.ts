import {tool} from "@langchain/core/tools";
import axios from "axios";
import z from "zod"



const scheduleTool= tool(async({email_sent_date, location, return_timezone})=>{
    if (!process.env.PITCHGOD_API_ENDPOINT || !process.env.PITCHGOD_API_KEY) {
        throw new Error('Missing required environment variables: PITCHGOD_API_ENDPOINT or PITCHGOD_API_KEY');
    }

    try {
        console.log('Making API call with params:', { email_sent_date, location, return_timezone });
        const availableTimeSlots = await axios.get(`${process.env.PITCHGOD_API_ENDPOINT}/calendly/suggest_meeting_time`, {
            headers: {
                "Authorization": process.env.PITCHGOD_API_KEY
            },
            params: {
                email_sent_date,
                location,
                return_timezone
            }
        });
        
        console.log('API Response:', availableTimeSlots.data);
        if (!availableTimeSlots.data) {
            throw new Error('No data received from API');
        }
        
        return availableTimeSlots.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
        }
        throw error;
    }
},
    
    {
    name:"scheduleTool",
    description:"Call to get the available time slots from the Calendly calendar",
    schema:z.object({
      email_sent_date: z.string(),
      location: z.string(),
      return_timezone: z.string()
    })
    })
    
    
    export const scheduleTools= [scheduleTool]
