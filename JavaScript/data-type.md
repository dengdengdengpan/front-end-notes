# 数据类型

### 数据类型分类

在 JavaScript 中，每一个值都有其对应的数据类型。目前 JavaScript 中共有 8 种数据类型，它们可以分为两个大类：**原始类型**、**复杂类型**：

- 原始类型：
  1. **`Undefined`** 只有一个特殊值 `undefined`，表示未定义或不存在。
  2. **`Null`** 只有一个特殊值 `null` ，表示空值。
  3. **`Boolean`** 布尔类型，表示布尔值，它有两个值分别是：`true`、`false`。
  4. **`String`** 字符串类型，表示文本数据，比如 `'JavaScript'`。
  5. **`Number`** 数字类型，使用 64 位双精度浮点型来表示整数或浮点数，比如 `25`、`3.14`。
  6. **`BigInt`** 数字类型，可以表示任意精度格式的整数。
  7. **`Symbol`** 表示唯一的标识符。
- 复杂类型：
  8. **`Object`** 表示一组无序键值对的集合。

### typeof 操作符

要确定 JavaScript 中变量的值的是什么类型，可以使用 `typeof` 操作符，它返回一个字符串来表示操作数（未经计算）的数据类型，使用方法如下：

```
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

`typeof` 使用示例如下：

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

// 对象
let personObject = {
  name: 'lufei',
  age: 18
};
typeof personObject; // 'object'
let array = [1, 3, '5'];
typeof array; // 'object'
let date = new Date();
typeof date; // 'object'
let regex = /\d/;
typeof regex; // 'object'
typeof Math; // 'object'

// 函数
function fn1() {}
typeof fn1; // 'function'
const fn2 = function xxx() {};
typeof fn2; // 'function'
```

### `Undefined` 类型

在 `Undefined` 类型中只有一个值——特殊值 `undefined`，**它表示未定义，就是此处应该有一个值，但是没有定义**。在以下场景中可以得到 `undefined` 值：

- 变量声明了，但未被赋值。

  ```javascript
  let a;
  a; // undefined
  ```

- 对象没有被赋值的属性。

  ```javascript
  let obj = new Object();
  obj.name; // undefined
  ```

- 函数没有返回值时，默认返回 `undefined`。

  ```javascript
  function fn() {}
  fn(); // undfined
  ```

- 调用函数时，应该提供的参数没有提供，那么该参数就是 `undefined`。

  ```javascript
  function fn(a) {
    console.log(a)
  }
  fn(); // undefined
  ```

- 对未定义的变量使用 `typeof` 操作符也会得到 `undefined`。

  ```javascript
  // 变量 foo 未定义
  typeof foo; // undefined
  ```

当然，也可以显示地给变量赋值 `undefined`：

```javascript
let a = undefined;
a === undefined; // true
```

但是这是不必要且不合理的，因为默认情况下，任何未经初始化的变量都会取得特殊值 `undefined`。一般来说，永远不要显示地给变量赋值 `undefined`。

### `Null` 类型

`Null` 类型也只有一个值——特殊值 `null`，**它表示一个空对象指针，即已经定义了，只是为空值**。比如，在声明一个将来要保存对象值的变量时，可以用 `null` 来进行初始化：

```javascript
let query = null;
```

在使用相等操作符时，JavaScript 认为 `undefined` 和 `null` 在表面上是相等的：

```javascript
undefined == null; // true
```

但二者还是有一些不同之处：

- `undefined` 表示根本未定义；而 `null` 表示定义了只是为空值。所以判断一个值是否存在就应该使用 `undefined` 而不是 `null`：

  ```javascript
  name === undefined;
  ```

- 在转换成数值时，`Number(undefined)` 是 `NaN`；而 `Number(null)` 是 0。

- 给变量赋值 `undefined` 是不合理的；而给变量赋值 `null` 是合理的。

- 在严格相等操作符下二者并不相等。

### `Boolean` 类型

布尔值是一种取值只能是真或假的数据类型，它赋予了编程语言在逻辑上表达真或假的能力。有了这种能力，`if` 语句、`for` 循环等才能实现。

在 JavaScript 中，`Boolean` 类型的真假值分别用 `true` 和 `false` 来表示，二者都区分大小写。下面是给变量赋值布尔值的示例：

```javascript
let visible = false;
let loading = true;
```

虽然 `Boolean` 类型只有两个布尔值，但其它数据类型的值都有相应的布尔值的等价形式。要将其它类型的值转换成一个布尔值，需要使用 `Boolean()` 函数，使用方法如下：

```javascript
let stringAsBoolean = Boolean('foo');
stringAsBoolean; // true

let numberAsBoolean = Boolean(0);
numberAsBoolean; // false
```

在上面代码中，字符串 `foo` 和数值 `0` 都会被 `Boolean()` 函数转换为相应的布尔值：分别是 `true` 和 `false`。那么哪些值会被转换为 `true`，哪些值又会被转换为 `false` 呢？这取决于以下规则：

**`undefined`、`null`、`''`（空字符串）、`0`、`NaN`、`false` 这 6 个值会被转换成 `false`，其余的值都会被转换成 `true`。**请看如下示例：

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

同时，在 JavaScript 中，凡是预期为布尔值的位置，都会将该位置上的值自动转换为相应的布尔值，转换规则还是上面那条。比如，在 `if` 流程控制语句中：

```javascript
let a = 'foo';
if (a) {
  console.log('a 被自动转换为了 true')；
}
```

运行上面代码，控制台上会输出 `a 被自动转换为了 true` 。这是因为 `if` 后面的判断条件，预期是一个布尔值，所以字符串 `a` 会被自动转换成布尔值 `true`，从而执行了代码块内的代码。



