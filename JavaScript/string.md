# String

### 定义

`String` 类型是字符串——由 0 个或多个 16 位的 Unicode 字符序列组成。

### 使用

在 JavaScript 中，字符串必须被括在引号里，目前有三种包含字符串的方式：

1. **单引号**
2. **双引号**
3. **反引号**

示例：

```javascript
const singleQuote = 'JavaScript';
const doubleQuote = "JavaScript";
const backquote = `JavaScript`;
```

使用反引号的字符串又称为模板字符串，与使用单引号、双引号的字符串相比有以下特点：

- 模板字符串支持多行字符串，所有的空格和缩进都会被保留在输出之中。

  ```javascript
  const longString = `落霞
    与孤鹜齐飞，
    秋水
    共长天一色
  `;
  console.log(longString); // '落霞\n  与孤鹜齐飞，\n  秋水\n  共长天一色\n'
  ```

  单引号和双引号要表示多行字符串则更加复杂。

  ```javascript
  // 1.在每行末尾使用反斜杠(\)
  // 确保反斜杠后面只有换行符，而不能有其它字符，例如空格
  const longString1 = '落霞\
  与孤鹜齐飞，\
  秋水\
  共长天一色\
  ';
  
  // 2.使用 + 运算符
  const longString2 = '落霞' +
  '与孤鹜齐飞，' +
  '秋水' +
  '共长天一色';
  ```

- 模板字符串支持字符串插值——允许使用 `${expression}` 占位符将任何表达式嵌入到字符串中；单引号和双引号则需要通过使用 `+` 运算符实现。

  ```javascript
  // 反引号
  const title = '滕王阁序';
  const author = '王勃';
  const article = `文章名：${title}，作者：${author}`;
  
  // 单引号、双引号
  const article2 = '文章名：' + title + '作者：' + author;
  ```
  
  从技术上讲，反引号表示的模板字面量不是字符串，而是一种特殊的 JavaScript 表达式，只不过求值后得到的是字符串。占位符 `${}` 的大括号内可以放入任意合法的表达式，比如算数表达式、调用函数等。

  ```javascript
  const a = 1;
  const b = 3;
  const c = `求和：${a + b}`; // '求和：4'
  
  const role = {
    name: 'lufei',
    age: 18
  };
  const roleName = `角色名称：${role.name}`; // '角色名称：lufei'
  
  function fn(str) {
    return str.toUpperCase()
  }
  const d = `大写：${fn('js')}`; // '大写：JS'
  ```
  
  模板字面量在定义时会立即求值并转换为字符串实例。转换时，所有插入的值都会按照一定的规则转为字符串。例如，数组和对象都会调用对应的 `toString()` 方法进行转换。

  ```javascript
  const list = [1, 2, 3];
  const str1 = `list: ${list}`; // 'list: 1,2,3'
  
  const data = { total: 0, visible: false };
  const str2 = `data: ${data}`; // 'data: [object Object]'
  ```
  
- 模板字符串支持标签模板（tagged template）——一种更高级的模板字符串使用方式，模板字符串紧跟在一个函数后面，该函数将被调用来处理这个模板字符串，用法如下：

  ```javascript
  function tag() {}
  const a = 5;
  const b = 7;
  tag`sum: ${a + b}; multiply: ${a * b}`;
  ```

  其中，`tag` 函数是标签模板中的”标签“部分，`` `sum: ${a + b}; multiply: ${a * b}` `` 是标签模板中”模板“部分。标签函数的参数与”模板“部分有关。

  ```javascript
  function tag(strings, expression1, expression2, ...) {}
  ```

  参数说明如下：

  - 第一个参数 `strings` 是一个数组，它包含模板字符串中被 `${}` 占位符分隔开的字符串。
  - 剩下的参数 `expression1, expression2, ...` 分别表示第一个 `${}` 占位符中表达式的值，第二个 `${}` 占位符中表达式的值，以此类推。

  示例：

  ```javascript
  function tag(strings, expression1, expression2) {
    console.log('第一个参数：', strings);
    console.log('第二个参数：', expression1);
    console.log('第三个参数：', expression2);
  }
  const a = 5;
  const b = 7;
  tag`sum: ${a + b}; multiply: ${a * b}`;
  
  // 第一个参数： (3) ['sum: ', '; multiply: ', '', raw: Array(3)]
  // 第二个参数： 12
  // 第三个参数： 35
  ```

  模板函数还可以采用 rest 参数的写法：

  ```javascript
  function tag(strings, ...expressions) {
    console.log('strings：', strings);
    console.log('expressions：', expressions);
  }
  const a = 5;
  const b = 7;
  tag`sum: ${a + b}; multiply: ${a * b}`;
  
  // strings： (3) ['sum: ', '; multiply: ', '', raw: Array(3)]
  // expressions： (2) [12, 35]
  ```

  第一个参数还有一个特殊的 `raw` 属性，用于获取字符串的原始内容，即未转义的原字符串。它也是一个数组，由模板字符串中被 `${}` 占位符分隔开的字符串组成。

  ```javascript
  function tag(strings) {
    console.log('strings：', strings);
    console.log('raw: ', strings.raw);
  }
  tag`copyright: \u00A9`;
  
  // \u00A9 转义后展示成 ©
  // strings： ['copyright: ©', raw: Array(1)]
  
  // 获取的是字符串的原始内容
  // raw:  ['copyright: \\u00A9']
  ```

最后需要注意的是，以某种引号作为字符串的开头，就必须以该种引号作为字符串的结尾，否则会导致语法错误。

```javascript
// 错误示例
const name = 'lufei"; // Uncaught SyntaxError: Invalid or unexpected token
```