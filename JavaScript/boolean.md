# Boolean

`Boolean` 类型只有两个字面量值：`true` 和 `false`，分别用于表示”真“和”假“这两种状态。例如：

```javascript
const visible = false;
const loading = true;
```

需要注意的是，布尔值 `true` 和 `false` 是区分大小的，以下示例都不是布尔值：

```javascript
const a = True;
const b = False;
const c = tRue;
const d = faLse;
```

虽然 `Boolean` 类型只有两个值，但 JS 其它数据类型的值都有相应布尔值的等价形式。转换的方式有两种：

1. 通过调用 `Boolean()` 函数显示转换。

   ```javascript
   Boolean(100); // true
   ```

2. 在逻辑运算中转换，例如 `if` 条件判断语句。

   ```javascript
   const a = 'foo';
   if (a) {
     console.log('对变量 a 的判断为真')；
   }
   ```

转换规则：

- **`undefined`、`null`、`''`（空字符串）、`0`、`NaN`、`false` 这 6 个值会被转换成 `false`**。
- 其它的值会被转成 `true`。

示例：

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