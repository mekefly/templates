const shelljs = require("shelljs");
const { useLoading, loading, stopLoading } = require("./loading");
const { simpleGit } = require("simple-git");
const minimist = require("minimist");

const { resolve } = require("path");
const replaceFile = require("./replaceFile");
const { getCurrentShellPath, $ } = require("./utils");

const {
  repo,
  defaultPath,
  include,
  variableNameMapping,
} = require("../templates.config.js");
const { get } = require("https");

function fetchTemplate(options, templateName, path) {
  //项目名
  let projectName;
  let projectRootPath;

  ({ projectName, templateName, path, projectRootPath } = initOps(
    options,
    templateName,
    path
  ));

  const argv = assembleArgv(projectRootPath, templateName);

  console.log("开始请求模板");
  console.log(`正在向${projectRootPath}路径下载模板`);

  const sg = simpleGit();
  $(argv)
    .catch((e) => {
      console.log("下载失败");
      console.error(e);
      //空回调将中断执行链
      return new Promise();
    })
    .then(() => {
      console.log("下载成功");
      //进入目录
      return templateProcessing(projectRootPath, sg, projectName);
    })
    .then(() => {
      lastHelp(projectRootPath, path);
    })
    .catch((e) => {
      console.error(e);
      console.log("操作失败了");
      console.log("目标仓库可以已经下载，但某些操作可能没有完成");
      console.log(`at:${path}`);
      console.log(`fullPath:${projectRootPath}`);
    });
}

async function templateProcessing(projectRootPath, sg, projectName) {
  console.log("准备对模板进行初始化操作");
  enterTemplate(projectRootPath);

  branchRename(sg);

  removeRemote(sg);

  await replaceProjectName(projectName, projectRootPath);
}

function initOps(options, templateName, path) {
  const projectName = options["project-name"] ?? options["N"] ?? templateName;
  //模板名
  templateName = templateName ?? options["template-name"] ?? options["T"];

  //项目路径
  path =
    path ??
    options["path"] ??
    options["P"] ??
    projectName ??
    templateName ??
    defaultPath;

  const projectRootPath = resolve(getCurrentShellPath(), path);

  return { projectName, templateName, path, projectRootPath };
}

function assembleArgv(path, templateName) {
  const argv = ["git", "clone", repo];

  if (path) {
    argv.push(path);
  }

  //模板必须输入
  if (templateName) {
    argv.push("-b", templateName);
  }
  return argv;
}

function removeRemote(sg) {
  console.log("删除模板存储库");
  sg.remote(["remove", "origin"]);
}

function branchRename(sg) {
  console.log("正在对分支重命名");
  sg.branch(["-m", "main"]);
}

function enterTemplate(path) {
  shelljs.cd(path);
}

async function replaceProjectName(projectName, rootPath) {
  if (projectName) {
    console.log("替换packageName");
    const fileFullPathList = include.map((filePath) =>
      resolve(rootPath, filePath)
    );
    await replaces(fileFullPathList, { projectName });
  }
}

async function replaces(fileFullPathList, options) {
  //并行
  const promList = fileFullPathList.map(async (fileFullPath) => {
    for (const variableName in options) {
      const variableValue = options[variableName];
      const replaceKeys = variableNameMapping[variableName];

      await replaceMapping(replaceKeys, fileFullPath, variableValue);
    }
  });

  await Promise.all(promList);
}

async function replaceMapping(replaceKeys, fileFullPath, variableValue) {
  if (!replaceKeys) {
    return;
  }
  for (const item of replaceKeys) {
    const reg = typeof item === "string" ? new RegExp(item, "g") : item;
    await replaceFile(fileFullPath, reg, variableValue).catch(() => {
      console.warn(
        "替换失败",
        reg,
        "=>",
        variableValue,
        "\nfileFullPath:",
        fileFullPath
      );
    });
  }
}

function lastHelp(rootPath, path) {
  console.log("");
  console.log("");
  console.log("项目已生成到|Project generated：");
  console.log(rootPath);
  console.log("");
  console.log("");
  console.log("----------------------------------------------------");
  console.log("");
  console.log("$ I guess you need");
  console.log(`$ cd ${path}`);
  console.log(`$ pnpm install`);
  console.log("");
  console.log("----------------------------------------------------");
}

module.exports = {
  fetchTemplate,
};
