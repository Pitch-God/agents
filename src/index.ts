import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./utils/state.js";
import { managerNode } from "./agent/manager.js";
import { retrieverNode } from "./agent/retriever.js";
import { START, END } from "@langchain/langgraph";
import { shouldSchedule, managerRoute } from "./router.js";
import { compilerNode } from "./agent/compiler.js";
import {
  input,
  input2,
  input3,
  packagemanReply,
} from "./lib/examples/reply.js";
import { toolNode } from "./agent/toolNode.js";
import { schedulerNode } from "./agent/scheduler.js";
import { categoriserNode } from "./agent/categoriser.js";
import { companyResearch, individualResearch } from "./lib/research.js";
// Finally, create the graph itself.
const builder = new StateGraph(StateAnnotation)
  .addNode("manager", managerNode)
  .addNode("retriever", retrieverNode)
  .addNode("scheduler", schedulerNode)
  .addNode("scheduleTool", toolNode)
  .addNode("compiler", compilerNode)
  .addNode("categoriser", categoriserNode)
  .addEdge(START, "manager")
  .addConditionalEdges("manager", managerRoute, [
    "retriever",
    "scheduler",
    "categoriser",
  ])
  .addConditionalEdges("scheduler", shouldSchedule)
  .addEdge("retriever", "categoriser")
  .addEdge("categoriser", "compiler")
  .addEdge("scheduleTool", "scheduler")
  .addEdge("compiler", END);

const checkPoint = new MemorySaver();

export const graph = builder.compile({ checkpointer: checkPoint });
const checkpointConfig = { configurable: { thread_id: "1" } };

// const result = await graph.invoke(
//   {
//     emailThread: input3,
//     userLocation: "New Jersey",
//     emailSentDate: "2024-12-09T14:43:06.599Z",
//     companyResearch: companyResearch,
//     individualResearch: individualResearch,
//   },
//   checkpointConfig,
// );
// console.log(result);
