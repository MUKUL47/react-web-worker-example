let reducedValue;
const bigTaskReducer = (int: number = 10) => {
  const sum = new Array(int)
    .fill(0)
    .map((el, idx) => el + idx)
    .reduce((sum, el) => sum + el, 0);
  return sum;
};

export function runBigtaskReducer(int: number) {
  reducedValue = bigTaskReducer(int);
  console.log(reducedValue);
  return reducedValue;
}

export async function runBigtaskAsyncReducer(int: number) {
  reducedValue = bigTaskReducer(int);
  console.log(reducedValue);
  return reducedValue;
}
export async function getWorkerPayload(
  workerFunction: (...params: any) => any,
  message: any
) {
  const {
    data: { params },
  } = message;
  try {
    return { data: await workerFunction(...params) };
  } catch (e) {
    return { error: e };
  }
}
enum WorkerTypes {
  bigTaskReducer,
  asyncTaskReducer,
}
export { bigTaskReducer, WorkerTypes };
