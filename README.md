# Templates

各种类型的template将通过分支的方式添加进来

## Includes

- [ ] ex TypeScript
- [x] templates

## Get started

### 1. 全局安装这个脚本|Install

> pnpm install @mekefly/templates -g

### 2. 执行|Run

> mekefly-templates fetch `<this-branch-name>` `<project-path-you-want>`

### 3. 做你爱做的事|Start your work

## API

- mekefly-templates
  - fetch
    - <你需要的模板名(分支名|branch)|Template name you need>
      - <项目的路径|projectRoot>
    - 可选参数|Optional parameters:
      - --project-name(-N) 项目的名字，将会替换package.json
      - --template-name(-T) 模板名,优先级低与上面的模板名
      - --path(-P) 项目的路径，可以是相对路径也可以是绝对路径
  - list 获取模板列表
  - help 简单帮助

### ForExample

> mekefly-templates fetch main ./ --project-name=xxx

> mekefly-templates fetch xxx --project-name=xxx -T main

> mekefly-templates fetch --project-name=xxx -T main -P R:\path

> mekefly-templates fetch --project-name=xxx -T main --path=R:\path

## pull requests 建议

像下方的，你的模板package.json中的__packageName__将会被替换为用户设定的名称

package.json

```json
{
 "name": "__packageName__",
 "shortName": "__packageName__",
 "version": "0.0.0-bate.0",
  "main": "index.js",
  "types": "dist/index.d.ts",
  "module": "dist/__packageName__.esm.js",
  "unpkg": "dist/__packageName__.iife.js",
  "jsdelivr": "dist/__packageName__.iife.js",
}
```
