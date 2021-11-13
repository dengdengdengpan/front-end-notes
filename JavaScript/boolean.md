# Boolean

布尔值是一种取值只能是真或假的数据类型，它赋予了编程语言在逻辑上表达真或假的能力。有了这种能力，`if` 语句、`for` 循环等才能实现。在 JavaScript 中，`Boolean` 类型的真假值分别用 `true` 和 `false` 来表示：

```javascript
const loading = false;
const dialogVisible = true;
```

需要注意的是，布尔值 `true` 和 `false` 是区分大小的，所以以下都不是布尔值：

```javascript
const a = True;
const b = False;
const c = tRue;
const d = faLse;
```

另外，尽管 `Boolean` 类型只有两个布尔值，但其它数据类型的值都有相应的布尔值的等价形式。要将其它类型的值转换成一个布尔值，可以使用 `Boolean()` 函数：

```javascript
const stringAsBoolean = Boolean('foo');
stringAsBoolean; // true

const numberAsBoolean = Boolean(0);
numberAsBoolean; // false
```

上面代码中，字符串 `foo` 和数值 `0` 都会被 `Boolean()` 函数转换为相应的布尔值，分别是 `true` 和 `false`。什么值会被转换为 `true` 或者什么值会被转换为 `false` 取决于以下规则：

**`undefined`、`null`、`''`（空字符串）、`0`、`NaN`、`false` 这 6 个值会被转换成 `false`，其余的值都会被转换成 `true`**，如下示例：

```javascript
Boolean(undefined); // false
Boolean(null); // false
Boolean(''); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(false); // false

Boolean('aaa'); // true
Boolean(' '); // true，这是包含了空格的字符串，并不是空字符串，注意区分
Boolean(123); // true
let obj = {};
Boolean(obj); // true
let array = [];
Boolean(array); // true
function fn() {}
Boolean(fn); // true
```

还有在 JavaScript 中，凡是预期为布尔值的地方都会被自动转换为相应的布尔值，转换规则同上。比如，在 `if` 流程控制语句中：

```javascript
const a = 'foo';
if (a) {
  console.log('a 被自动转换为了 true')；
}
```

此时控制台上会打印出 `a 被自动转换为了 true` ，这是因为 `if` 语句的判断条件预期是一个布尔值，所以字符串 `a` 会被自动转换成布尔值 `true`，从而代码块内的代码被执行。