/** @type {import('prettier').Config} */
export default {
  semi: false, // 行尾不使用分号
  singleQuote: true, // 使用单引号而不是双引号
  trailingComma: 'es5', // 尾随逗号
  printWidth: 80, // 每行的最大长度
  useTabs: false, // 不使用缩进
  tabWidth: 2, // 缩进使用2个空格
  arrowParens: 'avoid', // 箭头函数参数只有一个时省略括号
  endOfLine: 'lf', // 使用LF作为换行符
  singleAttributePerLine: true, // 每个属性单独占一行
  jsxSingleQuote: true, // 在JSX中使用单引号
}
