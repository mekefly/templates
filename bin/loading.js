const shelljs = require("shelljs");
let interval;
function stopLoading() {
  clearInterval(interval);
}
let loadingNum = 1;
function loading() {
  interval = setInterval(() => {
    if (loadingNum > 3) {
      loadingNum = 1;
    }
    const arr = Array(loadingNum++).fill(".");
    const dao = arr.join("");
    const message = `Loading${dao}`;
    shelljs.echo(message);
    console.log(message);
  }, 500);
}
function useLoading(callback) {
  loading();
  return new Promise((resolve, reject) => {
    return callback();
  }).then((v) => {
    console.log(v);
    stopLoading();
    return v;
  });
}
module.exports = { loading, stopLoading, useLoading };
