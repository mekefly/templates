const shelljs = require("shelljs");
const { useLoading, loading, stopLoading } = require("./loading");
const { simpleGit } = require("simple-git");
const { repo } = require("../templates.config");

const name = "branchList.js";

async function createBranchListFile() {
  console.log("正在请求BranchList");
  // loading();
  try {
    const branchList = await getBranchList();

    // stopLoading();
    shelljs.echo(`准备将生成的列表存入 ${name}`);

    const state = shelljs.exec(
      `echo exports.branchList =  ${JSON.stringify(branchList)} > ${name}`
    );

    if (state.code !== 0) {
      throw new Error("存入文件失败");
    }
  } catch (error) {
    console.log(error);
  }
}
async function list() {
  console.log("Loading...");
  const data = await getBranchList();
  console.log("");
  data.forEach((name) => console.log(name));
  console.log("");
  console.log("");
  console.log("You may need:");
  console.log("----------------------------------------");
  console.log("");
  console.log(`mekefly-templates fetch -T ${data[0] ?? "main"} -N packageName`);
  console.log("");
  console.log("----------------------------------------");
  console.log("");
}
async function getBranchList() {
  const v = await simpleGit().listRemote(["--heads", repo]);
  const branchList = v
    .split("\n")
    .map((item) => {
      // 获取到远程仓库分支列表
      const itemList = item.split("/");
      return itemList[itemList.length - 1];
    })
    .filter(Boolean);
  return branchList;
}
module.exports = { getBranchList, list };
