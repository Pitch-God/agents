
import { MemorySaver, StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./utils/state.js";
import { managerNode } from "./agent/manager.js";
import { retrieverNode } from "./agent/retriever.js";
import { START,END } from "@langchain/langgraph";
import { decideToRetrieve } from "./router.js";
import { compilerNode } from "./agent/compiler.js";
import { input, input2 } from "./examples/reply.js";


// Finally, create the graph itself.
const builder = new StateGraph(StateAnnotation)
  .addNode("manager", managerNode)
  .addNode("retriever", retrieverNode)
  .addNode("compiler", compilerNode)
  .addEdge(START, "manager")
  .addConditionalEdges("manager",decideToRetrieve)
  .addEdge("retriever", "compiler")
  .addEdge("compiler",END)


const checkPoint= new MemorySaver()

export const graph = builder.compile({checkpointer:checkPoint});
const checkpointConfig = { configurable: { thread_id: "1" } };

// const result = await graph.invoke({ emailThread:JSON.stringify(input2) ,userLocation:"Budapest, Hungary"},checkpointConfig);
// console.log(result);





