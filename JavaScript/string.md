# String

### 定义

`String` 类型是字符串——由 0 个或多个 16 位的 [Unicode](./unicode.md) 字符序列组成。

### 使用字符串

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

### 转义字符

反斜杠（`\`）在字符串中有特殊的含义，可以用来表示一些具有特殊功能的字符。

| 字符           | 描述                                                  |
| :------------- | :---------------------------------------------------- |
| \0             | 空白符（`\u0000`）                                    |
| \\'            | 单引号（`\u0027`）                                    |
| \\"            | 双引号（`\u0022`）                                    |
| \\`            | 反引号（`\u0060`）                                    |
| \\\            | 反斜杠（`\u005C`）                                    |
| \n             | 换行符（`\u000A`）                                    |
| \r             | 回车键（`\u000D`）                                    |
| \v             | 垂直制表符（`\u000B`）                                |
| \t             | 制表符（`\u0009`）                                    |
| \b             | 退格键（`\u0008`）                                    |
| \f             | 换页符（`\u000C`）                                    |
| \uXXXX         | `\u` 后面紧跟 4 个十六进制数，范围为 0000 到 FFFF     |
| \u{X...XXXXXX} | `\u` 后面紧跟 1 到 6 个十六进制数，范围为 0 到 10FFFF |
| \xXX           | `\x` 后面紧跟 2 个十六进制数，范围 00 到 FF           |

示例：

```javascript
console.log('a\'c'); // a'c
console.log('a\"c'); // a"c
console.log(`a\`d`); // a`d
console.log('\\'); // \
console.log('line1\nline2');
// line1
// line2
console.log('\u00A9'); // ©
console.log('\u007A'); // z
console.log('\u{1F60D}'); // 😍
console.log('\xA9'); // ©
```

### length 属性

`length` 属性是一个只读属性，用于表示字符串的长度。

```javascript
'abc'.length; // 3
'ab c'.length; // 4
'落霞与孤鹜齐飞'.length; // 7
'line1\nline2'.length; // 11，\n 是一个特殊字符
```

但有些字符串使用 `length` 属性得到的长度不等于字符数，例如：

```javascript
'😄'.length; // 2
'𝌆'.length; // 2
```

这是因为 `length` 属性实际上**返回的是字符串中代码单元的个数**。其中，代码单元（Code Unit）是指字符编码系统编码时使用的最小尺寸的比特。由于历史原因，在 1995 年 JS 被创建时还没有 UTF-16，所以 JS 使用的是 UCS-2 编码方式——使用两个字节来存储每个字符，这意味着 JS 将每 16 比特作为一个代码单元。因此对于 4 个字节的字符，JS 会将其当作两个双字节的字符处理——即两个代码单元，所以 `length` 属性返回的值是 2。

在 ES6 中，可以使用以下方式得到字符串的正确长度：

```javascript
Array.from('😄').length; // 1
Array.from('𝌆').length; // 1
```

### 访问字符

在 JS 中，有两种方式可以访问字符串中的单个字符：

1. `str[index]`（`index` 从 0 开始）。
2. `str.charAt(index)` 方法。

示例：

```javascript
const a = 'JavaScript';
a[0]; // J
a[5]; // c
a[20]; // undefined

a.charAt(0); // J
a.charAt(4); // S
a.charAt(20); // ''
```

### 不可变的特点

**JS 中的字符串是不可变的**，这表示字符串一旦创建，其值就不能改变了。要想修改某个变量中的字符串值，必须先销毁原始的字符串，然后将新的字符串保存到该变量。

```javascript
let str = 'abc';
str = str + 'de';
```

过程如下：

1. 变量 `str` 重新赋值后会被分配一个可以容纳 5 个字符的空间，并填充上 `abc` 和 `de`。
2. 销毁原始的字符串 `abc` 和字符串 `de`。

### 字符串比较

在 JS 中，可以使用 `>` 或 `<` 运算符比较两个字符串的大小。

```javascript
const str1 = 'abc';
const str2 = 'ABC';
console.log(str1 > str2); // true
```

在比较字符串的大小时，是**按字符逐个进行比较的**，而**每个字符是根据在 Unicode 中的码点的大小进行判断的**。比较过程如下：

1.  首先比较两个字符串的首位字符大小。
2. 如果有一方字符较大（或较小），则比较结束。
3. 如果两个字符串的首位字符相等，则取两个字符串中的第二位继续进行比较。
4. 重复上述步骤，直到某个字符串的所有字符比较完为止。
5. 如果两个字符串的字符同时比较完，则它们相等；否则还有未比较字符的字符串更大。

示例：

```javascript
'a' < 'b' // true
'X' < 'Y' // true
'A' < 'a' // true，'A'.codePointAt(0) 65，'a'.codePointAt(0) 97
'abcd' > 'abbd' // true，在比较到第三位时：'c' > 'b'
'ac ' > 'ac' // true，'ac ' 还有未比较的字符
```

如果以不区分大小写的方式进行比较，常采用 `toUpperCase()` 方法或 `toLowerCase()` 方法将字符串转换成大写或小写后进行比较。

```javascript
const str1 = 'abd';
const str2 = 'ABC';
str1.toUpperCase() === str2.toUpperCase(); // false
```

但上述方式对超出拉丁字母表外的语言进行大小写转换就可能出问题。例如：

```javascript
// 德语的 ß 和 ss 转换成大写后都是 SS
'ß'.toUpperCase() === 'ss'.toUpperCase() // true
```

要想在同一种语言下进行比较，可以使用 `localeCompare()` 方法或 `Intl.Collator` API。

```javascript
'ß'.localeCompare('ss', 'de', { sensitivity: 'accent' }) === 0; // false，为 0 表示二者相等
new Intl.Collator('de', { sensitivity: 'accent' }).compare('ß', 'ss') === 0 // false
```

