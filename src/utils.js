const BaseURL = 'http://localhost:';
const middlewareName = '__open-in-editor';

// helpers
export function generateTime() {
  const date = new Date();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${hour}:${minutes}:${seconds}`;
}

// data
export function generateLogTitle() {return `"%c[${generateTime()}]`;}
export function generateFileLocation(location) {return `%c${location} `;}
export function generateLine(lineCount) {return `%cLine: ${lineCount}\\n`;}
export function generateAddress(port, filePath) {
	return `%cJump to: ${BaseURL + port}/${middlewareName}?file=${filePath}\\n`
}
export function generateNewLine() {return '"'}

// style
function generateLogTitleStyle() 			{return `"color:#3A6F28;padding:2px 5px;font-weight:700;"`}
function generateFileLocationStyle() 	{return `"color: #00A29B;"`;}
function generateLineStyle() 					{return `"color: #9E6BB5;"`;}
function generateAddressStyle() 			{return `"color: #6664C2;"`;}

// style
export function composeConsoleLog(components) {
  const { prefix, suffix, fileRelativePath, fileAbsolutePath, lineCount, endColumn, port, jump } = components;
  return `${prefix
    + generateLogTitle()
    + generateFileLocation(fileRelativePath)
    + generateLine(lineCount)
    + (jump ? generateAddress(port, encodeURIComponent(`${fileAbsolutePath}:${lineCount}:${endColumn}`)) : '')
    + `${generateNewLine()},`
    + `${generateLogTitleStyle()},`
    + `${generateFileLocationStyle()},`
    + `${generateLineStyle()},`
    + (jump ? `${generateAddressStyle()},` : '')
    + suffix}`;
}
