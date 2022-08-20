const shelljs = require("shelljs");
const { useLoading, loading, stopLoading } = require("./loading");
const { simpleGit } = require("simple-git");

const name = "branchList.js";
genBranchList();

function genBranchList() {
  console.log("正在请求BranchList");
  loading();
  getBranchList().then(
    (branchList) => {
      stopLoading();
      shelljs.echo(`准备将生成的列表存入 ${name}`);

      const state = shelljs.exec(
        `echo export.branchList =  ${JSON.stringify(branchList)} > ${name}`
      );

      if (state.code !== 0) {
        throw new Error("存入文件失败");
      }
    },
    (e) => {
      //error信息
      console.error(e);
    }
  );
}
function getBranchList(params) {
  return new Promise((resolve, reject) => {
    console.log("getBranchList");
    return simpleGit().listRemote(["--heads", "origin"]);
  }).then((v) => {
    console.log("获取到数据");
    const branchList = v.split("\n").map((item) => {
      // 获取到远程仓库分支列表
      const itemList = item.split("/");
      return itemList[itemList.length - 1];
    });
    return branchList;
  });
}
module.exports = { getBranchList };
