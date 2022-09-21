import {
  bigTaskReducer,
  getWorkerPayload,
  runBigtaskAsyncReducer,
  WorkerTypes,
} from "../utils";
/**
 * this instance will be running a separate working thread
 * to add more worker type please update WorkerTypes enum in utils class & later append a switch case for that newly added function
 */
onmessage = async (e) => {
  let func = null;
  switch (e?.data?.workerType) {
    case WorkerTypes.asyncTaskReducer:
      func = runBigtaskAsyncReducer;
      break;
    case WorkerTypes.bigTaskReducer:
      func = bigTaskReducer;
      break;
  }
  if (!func) return postMessage({ error: "Worker type not found" });
  postMessage(await getWorkerPayload(func, e));
};
export default WorkerTypes;
