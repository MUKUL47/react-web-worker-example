## Starter Code

- Step 01: Download/Clone the repository and install the packages
- Step 02: `npm start` to start the application

## Problem Statement

In the following problem statement a function named `runBigTaskReducer` is executed by buttons 
`Sync on Main thread` and `Async on Main thread`.

Click on the `Sync on Main thread` button, and then immediately try clicking on the `Print Button` or `Alerts Button`. You can observe that the UI is blocking,
`Print Button` and `Alerts Button` will not work until the function executed by `Sync on Main thread` gives the output.

Task: Implement the concept of `web workers` in react. The function `runBigTaskReducer` should be executed using the `web workers`.
The function should work on clicking `Web Worker` button. For testing, please use the `Buttons for testing UI blocking` section.

Note: When the web-workers are running in the background, you can observe that there is no UI blocking and `Print/Alerts Button` will still run.
          
# ---------------------------------
## Solution
Have ejected create-react-app webpack to integrate a web-worker loader 

Have exposed a useWebWorker hook will be used for a specific webworkertype(synchronous util), this hook will receive a workerType, onFailcallback and will return 
execute function, workerActive & inProgress flag

You can initialize as many useWebWorker(s) hooks for a component these hooks will be removed/terminated on unmount


### usage
```js
const [executeMyTask, workerActive, threadInProgress] =
    useWebWorker<number>({
      workerType: WorkerTypes.MY_TASK,
      onWorkerFailedToLoad: (e) => {
        console.log("worker failed to load ", e);
      },
    });

<div onClick={() => {
          if (threadInProgress) {
                    console.log("thread is busy please wait");
          } else {
                    executeMyTask('someparamdata',123)?.then((response) => {
                              console.log(`executed thread ${response}`);
                    });
          }
          }}
        >Click Me</div>
```
