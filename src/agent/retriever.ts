import { model } from "../utils/model.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { input, packagemanReply } from "../lib/examples/reply.js";
import { packageman } from "../lib/examples/packageman.js";
import { prompt, parser } from "../prompts/retriever.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableConfig } from "@langchain/core/runnables";

// returs the relevant context for the email reply from the knowledge base

const chain = RunnableSequence.from([prompt, model, parser]);

export const retrieverNode = async (
  state: typeof StateAnnotation.State,
  _config: RunnableConfig,
) => {
  const { emailThread, knowledgeBase } = state;

  const result = await chain.invoke({
    email_thread: JSON.stringify(emailThread),
    knowledge_base: JSON.stringify(knowledgeBase),
    format_instructions: parser.getFormatInstructions(),
  });

  return {
    retrievedContext: result,
  };
};
