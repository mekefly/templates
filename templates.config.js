module.exports = {
  include: ["package.json"],
  variableNameMapping: {
    projectName: [
      "__projectName__",
      "__packageName__",
      "projectName",
      "template",
    ],
  },
  repo: `https://github.com/mekefly/templates.git`,
  defaultPath: "template",
};
