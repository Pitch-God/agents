
import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./utils/state.js";
import { managerNode } from "./agent/manager.js";
import { retrieverNode } from "./agent/retriever.js";
import { START,END } from "@langchain/langgraph";
import { decideToRetrieve } from "./router.js";


// Finally, create the graph itself.
const builder = new StateGraph(StateAnnotation)
  .addNode("manager", managerNode)
  .addNode("retriever", retrieverNode)
  .addEdge(START, "manager")
  .addConditionalEdges("manager",decideToRetrieve)
  .addEdge("retriever", END);


const checkPoint= new MemorySaver()

export const graph = builder.compile({checkpointer:checkPoint});





