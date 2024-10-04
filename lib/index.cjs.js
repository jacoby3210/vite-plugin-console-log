"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("path-browserify");
function generateTime() {
  const date = /* @__PURE__ */ new Date();
  const hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  return `${hour}:${minutes}:${seconds}`;
}
const generateStartLine = () => '"';
const generateLogTitle = () => `%c[${generateTime()}]`;
const generateFileLocation = (location) => ` vscode://file/${location}`;
const generateLine = (lineCount) => `:${lineCount}\\n`;
const generateEndLine = () => '",';
const generateLogTitleStyle = () => `"color:#3A6F28;font-weight:700;",`;
function composeConsoleLog(components) {
  const {
    prefix,
    suffix,
    fileAbsolutePath,
    lineCount,
    endColumn
  } = components;
  return prefix + generateStartLine() + generateLogTitle() + generateFileLocation(fileAbsolutePath) + generateLine(lineCount) + generateEndLine() + generateLogTitleStyle() + suffix;
}
function viteConsolePro(options) {
  return {
    name: "vite-plugin-console-line",
    transform(code, id) {
      const { exclude, port } = options;
      const projectDir = path.join(process.cwd());
      if (exclude.length) {
        for (let i = 0; i < exclude.length; i += 1) {
          const fileDir = path.join(projectDir, exclude[i]).replace(/\\/g, "/");
          if (id.startsWith(fileDir)) {
            return { code };
          }
        }
      }
      const fileSuffixReg = /.*\.(js|jsx|ts|tsx|vue)$/;
      if (fileSuffixReg.test(id)) {
        const codeList = code.split(/\r?\n/);
        const consoleReg = /console\.log\(/;
        let lineCount = 1;
        let resultCode = "";
        codeList.forEach((token) => {
          if (token.search(consoleReg) >= 0) {
            const fileRelativePath = id.replace(projectDir.replace(/\\/g, "/"), "");
            const prefix = token.slice(
              token.search(consoleReg),
              12 + token.search(consoleReg)
            );
            const suffix = token.slice(12 + token.search(consoleReg));
            const ret = composeConsoleLog({
              prefix,
              suffix,
              fileRelativePath,
              fileAbsolutePath: id,
              lineCount,
              endCloumn: token.length + 1,
              port,
              jump: !!port
            });
            resultCode += `${ret}
`;
          } else {
            resultCode += `${token}
`;
          }
          lineCount += 1;
        });
        return { code: resultCode };
      }
      return { code };
    }
  };
}
exports.viteConsolePro = viteConsolePro;
