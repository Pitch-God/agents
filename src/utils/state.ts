import { BaseMessage, BaseMessageLike } from "@langchain/core/messages";
import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { EmailHistory } from "../types/types.js";

/**
 * A graph's StateAnnotation defines three main things:
 * 1. The structure of the data to be passed between nodes (which "channels" to read from/write to and their types)
 * 2. Default values for each field
 * 3. Reducers for the state's. Reducers are functions that determine how to apply updates to the state.
 * See [Reducers](https://langchain-ai.github.io/langgraphjs/concepts/low_level/#reducers) for more information.
 */

// This is the primary state of your agent, where you can store any information
export const StateAnnotation = Annotation.Root({
  
  messages: Annotation<BaseMessage[], BaseMessageLike[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),


  emailThread: Annotation<Array<Record<string, any>>>({
    reducer: (x,y) => y??x??[],
  }),

  emailThreadSummary: Annotation<string>({
    reducer: (x,y) => y??x??'',
  }),

  isTranslationRequired: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false
  }),

  isSchedulingRequired: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false
  }),



  isRetrievalRequired: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false
  }),






  })




  // Create a manager node for the graph