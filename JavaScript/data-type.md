# 数据类型

### 分类

在 JavaScript 中，每一个值都有其对应的数据类型。目前 JavaScript 中共有 8 种数据类型，它们分为两个大类：**原始类型**、**复杂类型**。

- 原始类型：

  1. `Undefined` 只有一个特殊值 `undefined`，表示未定义或不存在。
  2. `Null` 只有一个特殊值 `null` ，表示对一个不存在 `object` 的引用，即空值。
  3. `Boolean` 布尔类型，表示布尔值，它有两个值：`true`、`false`。
  4. `String` 字符串类型，表示字符串，一个字符串可以包含 0 个或多个字符，比如  `a`、`'JavaScript'`。
  5. `Number` 数字类型，使用 64 位双精度浮点型来表示整数或浮点数，比如 `25`、`3.14`。
  6. `BigInt` 数字类型，表示任意长度的整数。
  7. `Symbol` 表示唯一的标识符。
- 复杂类型：

  8. `Object` 表示一组无序键值对的集合，用于储存复杂的数据结构。

### typeof 运算符

要确定 JavaScript 中变量的值的是什么类型，可以使用 `typeof` 运算符，它返回一个字符串来表示未经计算的操作数的数据类型，用法如下：

```javascript
typeof operand
typeof (operand)
```

`typeof` 可能的返回值如下表：

|    类型     |    结果     |
| :---------: | :---------: |
| `Undefined` | 'undefined' |
|   `Null`    |  'object'   |
|  `Boolean`  |  'boolean'  |
|  `String`   |  'string'   |
|  `Number`   |  'number'   |
|  `BigInt`   |  'bigint'   |
|  `Symbol`   |  'symbol'   |
|  `Object`   |  'object'   |
|    函数     | 'function'  |
|    数组     |  'object'   |
|  其它对象   |  'object'   |

示例：

```javascript
// Undefined
let a;
typeof a; // 'undefined'

// Null
let b = null;
typeof b; // 'object'

// Boolean
let c1 = true;
typeof c1; // 'boolean'

let c2 = false;
typeof c2; // 'boolean'

// String
let e1 = 'JavaScript';
typeof e1; // 'string'

let e2 = '';
typeof e2; // 'string'

let e3 = '123';
typeof e3; // 'string'

// Number
let f1 = 987;
typeof f1; // 'number'

let f2 = 3.14159;
typeof f2; // 'number'

// BigInt
let g = 24n;
typeof g; // 'bigint'

// Symbol
let h = Symbol('foo');
typeof h; // 'symbol'

// Object
let person = {
  name: 'lufei',
  age: 18
};
typeof person; // 'object'

let array = [1, 3, '5'];
typeof array; // 'object'

let date = new Date();
typeof date; // 'object'

let regex = /\d/;
typeof regex; // 'object'

let str = new String('JavaScript');
typeof str; // object

let num = new Number(100);
typeof num; // 'object'

typeof Math; // 'object'

// 函数
function fn1() {}
typeof fn1; // 'function'

const fn2 = function xxx() {};
typeof fn2; // 'function'
```
