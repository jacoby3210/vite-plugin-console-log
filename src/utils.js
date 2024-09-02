const BaseURL = 'http://localhost:';
const port = 9528;
const middlewareName = 'browser';

// helpers
export function generateTime() {
  const date = new Date();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${hour}:${minutes}:${seconds}`;
}

// data
function generateLogTitle() {return `"%c[${generateTime()}]`;}
function generateFileLocation(location) {return `%c vscode://file/${location}`;}
function generateLine(lineCount) {return `%c :${lineCount}\\n`;}
function generateNewLine() {return '"'}

// style
function generateLogTitleStyle() 			{return `"color:#3A6F28;padding:2px 5px;font-weight:700;"`}
function generateFileLocationStyle() 	{return `"color: #00A29B;"`;}
function generateLineStyle() 					{return `"color: #9E6BB5;"`;}

// style
export function composeConsoleLog(components) {
  const { prefix, suffix, fileRelativePath, fileAbsolutePath, lineCount, endColumn, jump } = components;
  return `${prefix
    + generateLogTitle()
    + generateFileLocation(fileAbsolutePath)
    + generateLine(lineCount)
    + `${generateNewLine()},`
    + `${generateLogTitleStyle()},`
    + `${generateFileLocationStyle()},`
    + `${generateLineStyle()},`
    + suffix}`;
}
