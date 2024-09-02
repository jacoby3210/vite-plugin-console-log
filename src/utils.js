// helpers
export function generateTime() {
  const date = new Date();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${hour}:${minutes}:${seconds}`;
}

// data
const generateStartLine= () => '"';
const generateLogTitle = () => `%c[${generateTime()}]`;
const generateFileLocation = (location) =>  ` vscode://file/${location}`;
const generateLine = (lineCount) =>  `:${lineCount}\\n`;
const generateEndLine= () => '",';

// style
const generateLogTitleStyle = () => `"color:#3A6F28;font-weight:700;",`;

// style
export function composeConsoleLog(components) {
  const { 
		prefix, 
		suffix, 
		fileAbsolutePath, 
		lineCount, 
		endColumn
	} = components;
  
	return prefix
		+ generateStartLine()
    + generateLogTitle()
    + generateFileLocation(fileAbsolutePath)
    + generateLine(lineCount, endColumn)
    + generateEndLine()
    + generateLogTitleStyle()
    + suffix;
}
