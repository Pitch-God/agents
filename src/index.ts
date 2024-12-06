
import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./utils/state.js";
import { managerNode } from "./agent/manager.js";
import { START,END } from "@langchain/langgraph";

// Finally, create the graph itself.
const builder = new StateGraph(StateAnnotation)
  .addNode("manager", managerNode)
  .addEdge(START, "manager")
  .addEdge("manager", END);


const checkPoint= new MemorySaver()

export const graph = builder.compile({checkpointer:checkPoint});





