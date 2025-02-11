import { replyPrompt, parser, followUpPrompt } from "../prompts/compiler.js";
import { StateAnnotation } from "../utils/state.js";
import { RunnableSequence } from "@langchain/core/runnables";
import { model } from "../utils/model.js";
import { RunnableConfig } from "@langchain/core/runnables";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const replyStyles = JSON.parse(
  readFileSync(join(__dirname, "../utils/replyStyles.json"), "utf-8"),
);

export const compilerNode = async (
  state: typeof StateAnnotation.State,
  _config: RunnableConfig,
) => {
  const { emailThread, slots, isTranslationRequired } = state;
  let language = "English";

  if (isTranslationRequired.isTranslationRequired) {
    language = isTranslationRequired.language;
  }

  const replyDetails: Record<string, string> = {};

  if (state.isReply) {
    replyDetails.type = "reply";
  } else {
    replyDetails.type = "followup";
  }

  const chain = RunnableSequence.from([
    replyDetails.type === "reply" ? replyPrompt : followUpPrompt,
    model,
    parser,
  ]);

  if (state.isRetrievalRequired) {
    replyDetails.knowledge_base = JSON.stringify(state.retrievedContext);
  }

  const emailCategory = state.emailCategory;

  const replyStyle = replyStyles[emailCategory];

  const result = await chain.invoke({
    email_thread: JSON.stringify(emailThread),
    reply_details: JSON.stringify(replyDetails),
    format_instructions: parser.getFormatInstructions(),
    reply_style: JSON.stringify(replyStyle),
    slots: JSON.stringify(slots),
    language: language,
    email_category: emailCategory,
  });

  return {
    finalReply: result,
    emailCategory: emailCategory,
  };
};
