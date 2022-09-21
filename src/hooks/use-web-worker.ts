import { useEffect, useRef, useState } from "react";
import { WorkerTypes } from "../utils";
/**
 * Why hook instead of a simple helper function ?
 * worker use event listeners to handle event listeners lifecycle will be different inside a helper function
 * for that we'll use a hook will be remove event listener of a hook during unmount of a component thus
 */
/**
 * Hook response will be returned by this hook excute (example on button click) function can be called any time that will return a promise i.e synchronously executing heavy function in worker thread
 */
type HookResponse = [
  execute: (...params: any[]) => Promise<any> | null,
  workerActive: boolean
];
/**
 * workerType is a enum type i.e how many functions(computations) are supported by that worker instance, for more info please visit file ./worker/index.worker.ts
 * @param props WorkerType
 * @returns [execute, workerActive]
 */
export default function useWebWorker<P>(props: {
  workerType: WorkerTypes;
  onWorkerFailedToLoad?: (error: string) => void;
}): HookResponse {
  const [worker, setWorker] = useState<Worker>();
  const finishedWorker = useRef<{
    resolved: (p: P) => void;
    reject: (e: any) => void;
  }>();
  useEffect(() => {
    //@ts-ignore
    import(`../workers/index.worker.ts`)
      .then((Response) => {
        const worker = new Response.default();
        worker.onerror = ({ message }: { message: string }) => {
          props?.onWorkerFailedToLoad?.(message);
        };
        setWorker(worker);
      })
      .catch(() => {
        props?.onWorkerFailedToLoad?.("Failed to load worker file");
      });
  }, []);
  useEffect(() => {
    if (!worker) return;
    worker?.addEventListener("message", onWorkerMessage);
    return () => {
      worker?.removeEventListener("message", onWorkerMessage);
      worker?.terminate?.();
    };
  }, [worker]);

  function onWorkerMessage(message: any) {
    const {
      data: { error, data },
    } = message;
    if (error) {
      return finishedWorker?.current?.reject?.(error);
    }
    return finishedWorker?.current?.resolved?.(data);
  }

  function execute(...params: any[]) {
    if (!worker) return null;
    const pendingPromise = new Promise((resolved, reject) => {
      finishedWorker.current = { resolved, reject };
    });
    worker?.postMessage({ params, workerType: props.workerType });
    return pendingPromise;
  }
  return [execute, !!worker];
}
