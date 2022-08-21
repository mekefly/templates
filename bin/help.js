const { readFileSync } = require("fs");
const { resolve } = require("path");
const { repo } = require("../templates.config");
const replaceFile = require("./replaceFile");
function youMayNeed() {
  console.log("");
  console.log("");
  console.error(`You may need:`);
  console.log("----------------------------------------");
  console.log("");
  console.log(`mekefly-templates help`);
  console.log(`mekefly-templates list`);
  console.log(`mekefly-templates fetch -T main -N packageName`);
  console.log("");
  console.log("----------------------------------------");
  console.log("");
}
function help() {
  const helpStr = readFileSync(resolve("README.md"), { encoding: "utf-8" });
  console.log(helpStr);
  console.log();
  console.log("----------------------------------------");
  console.log();
  console.log(`请访问 ${repo} 来获得更多信息`);
  console.log();
}
module.exports = {
  youMayNeed,
  help,
};
