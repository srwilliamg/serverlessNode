# serverlessNode

> For autocompletion in serverless.yml : https://marketplace.visualstudio.com/items?itemName=ThreadHeap.serverless-ide-vscode

- To deploy the app: __sls deploy -v__
- To deploy a single function: __sls deploy -f [FunctionName] -v__
- To see logs of one function: __sls logs -f [FunctionName] -t__ | **--startTime #[m/h/s]** to see logs minutes/hours or seconds ago.
- To invoke manually a function: __sls invoke -f [FunctionName] -l__ 