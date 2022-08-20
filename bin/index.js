const minimist = require("minimist");
const argv = minimist(process.argv);
const { _: paramsAll } = argv;

const commandName = paramsAll[2];
if (!commandName) {
  console.error(`Please enter the command`);
  return;
}

const handleMap = require("./handleMap");

const handle = handleMap[commandName];
if (!handle) {
  console.error(`Command ${commandName} not found`);
  return;
}

const rest = paramsAll.slice(3);
handle(argv, ...rest);
