function invokerResponder(message) {
  const {
    data: { invokerId, params },
  } = message;
  console.log("inside worker---");
  postMessage({ data: businessLogic(...params), invokerId });
}
function businessLogic(n) {
  return new Array(n)
    .fill(0)
    .map((el, idx) => el + idx)
    .reduce((sum, el) => sum + el, 0);
}
onmessage = invokerResponder;
