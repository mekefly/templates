const shelljs = require("shelljs");
/**
 *
 * @param {Array} arr
 * @returns
 */
function lastOne(arr) {
  return arr[arr.length - 1];
}
function getCurrentShellPath() {
  const shellString = shelljs.pwd();
  const path = shellString.stdout;
  return path;
}
function getName(path) {
  return lastOne(path.split("\\"));
}
function getCurrentShellFolderName(params) {
  const path = getCurrentShellPath();
  return getName(path);
}
/**
 * @param {Array<string>|string} argv
 */
function $(argv) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(argv)) {
      argv = argv.join(" ");
    }
    if (!typeof argv === "string") {
      reject("你传入的内容不是string或Array");
      return;
    }
    const result = shelljs.exec(argv);
    const { code, stderr, stdout } = result;

    if (result.code === 0) {
      resolve(result);
    } else {
      reject(stderr);
    }
  });
}
module.exports = {
  lastOne,
  getCurrentShellPath,
  getName,
  getCurrentShellFolderName,
  $,
};
