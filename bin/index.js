const minimist = require("minimist");
const argv = minimist(process.argv);
const { _: paramsAll } = argv;
const { youMayNeed } = require("./help");

const commandName = paramsAll[2];
if (!commandName) {
  console.error(`Please enter the command`);

  youMayNeed();
  return;
}

const handleMap = require("./handleMap");

const handle = handleMap[commandName];
if (!handle) {
  console.error(`Command ${commandName} not found`);

  youMayNeed();
  return;
}

const rest = paramsAll.slice(3);
handle(argv, ...rest);
