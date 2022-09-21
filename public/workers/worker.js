class WorkerInitializer {
  constructor(sendResponse, onMessage) {
    onmessage = (e) => {
      sendResponse?.();
    };
  }
}
