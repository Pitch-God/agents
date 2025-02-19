import {
  categoriserParser,
  categoriserPrompt,
} from "../prompts/categoriser.js";
import { modelMini } from "../utils/model.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { RunnableConfig } from "@langchain/core/runnables";
import { packageman } from "../lib/examples/packageman.js";
import { input, input2 } from "../lib/examples/reply.js";

const chain = RunnableSequence.from([
  categoriserPrompt,
  modelMini,
  categoriserParser,
]);

export const categoriserNode = async (
  state: typeof StateAnnotation.State,
  config: RunnableConfig,
) => {
  const { emailThread } = state;

  const result = await chain.invoke(
    {
      email_thread: JSON.stringify(emailThread),
      format_instructions: categoriserParser.getFormatInstructions(),
    },
    config,
  );
  const { category } = result;

  return {
    emailCategory: category,
  };
};
