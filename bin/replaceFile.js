const { readFile, writeFile } = require("fs");
const options = { encoding: "utf-8" };
//读取文件，并且替换文件中指定的字符串
async function replaceFile(filePath, sourceRegx, targetStr) {
  const data = await readFileAsync(filePath, options);
  let str = data.replace(sourceRegx, targetStr);
  if (str === data) {
    return;
  }
  await writeFileAsync(filePath, str);
}

function writeFileAsync(filePath, content) {
  return new Promise((resolve, reject) => {
    writeFile(filePath, content, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function readFileAsync(filePath, options) {
  return new Promise((resolve, reject) => {
    const data = readFile(filePath, options, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
module.exports = replaceFile;
