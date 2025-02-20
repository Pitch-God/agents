import { BaseMessage, BaseMessageLike } from "@langchain/core/messages";
import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { EmailHistory, EmailCategory } from "../types/types.js";

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

  emailCategory: Annotation<EmailCategory>({
    reducer: (x, y) => y ?? x ?? "INTERESTED",
  }),

  knowledgeBase: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),

  emailThread: Annotation<Array<Record<string, any>>>({
    reducer: (x, y) => y ?? x ?? [],
  }),

  emailThreadSummary: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),

  isTranslationRequired: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  schedule: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  isRetrievalRequired: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),

  userLocation: Annotation<string>({
    reducer: (x, y) => y ?? x,
  }),

  userTimeZone: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  isFollowUp: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),

  isReply: Annotation<boolean>({
    reducer: (x, y) => y ?? x ?? false,
    default: () => false,
  }),

  retrievedContext: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  finalReply: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  emailSentDate: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),

  slots: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  companyResearch: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  individualResearch: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),

  keywords: Annotation<Record<string, any>>({
    reducer: (x, y) => y ?? x ?? {},
  }),
});

// Create a manager node for the graph
