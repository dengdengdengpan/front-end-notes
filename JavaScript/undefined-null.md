# Undefined & Null

### Undefined 类型

`Undefined` 类型只有一个值，即特殊值 `undefined`，它表示未定义。以下场景可以得到 `undefined`：

- 变量声明了，但未初始化。

  ```javascript
  let name;
  name; // undefined
  ```

- 对象没有被赋值的属性。

  ```javascript
  let person = {};
  person.age; // undefined
  ```

- 函数没有返回值时，默认返回 `undefined`。

  ```javascript
  function fn() {}
  fn(); // undfined
  ```

- 调用函数时，应该提供的参数没有提供，那么该参数就是 `undefined`。

  ```javascript
  function fn(a) {
    console.log(a); // undefined
  }
  fn();
  ```

- 对未定义的变量使用 `typeof` 运算符也会得到 `undefined`。

  ```javascript
  // 变量 foo 未定义
  typeof foo; // undefined
  ```

另外也可以显式地给变量赋值 `undefined`：

```javascript
let a = undefined;
a === undefined; // true
```

但这是不必要且不合理的，因为默认情况下任何未经初始化的变量的值都是 `undefined`。一般来说，永远不要显式地给变量赋值 `undefined`。

### Null 类型

`Null` 类型也只有一个特殊值 `null`，**它表示一个空对象指针，即已经定义了，但值为空值**。比如，只要变量要保存对象，而当时又没有那个对象可保存，就可以用 `null` 来填充该变量：

```javascript
let person = null;
```

### undefined vs null

使用相等运算符 `==` 比较 `undefined` 和 `null` 时会返回 `true`：

```javascript
undefined == null; // true
```

在 `if` 条件语句中二者也都会被转换为 `false`：

```javascript
if (!undefined) {
  console.log('undefined is false');
}

if (!null) {
  console.log('null is false')
}
```

这都表明二者具有一定的相似性，探究其原因，这跟 JS 的历史有关。在 1995 年 JS 诞生时，只设置了 `null` 表示“无”的值，但 JS 的设计者 Brendan Eich 觉得这不够，原因如下：

1. JS 的数据类型分为原始类型和复杂类型两大类，Brendan Eich觉得表示"无"的值最好不是对象。
2. JS 的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果 `null` 自动转为 0，很不容易发现错误。

因此，Brendan Eich又设计了一个`undefined` 来表示“无”的值。这样就有了两个表示“无”的值：

- `null` 表示一个“无”的对象，转换为数值为 0。

  ```javascript
  Number(null); // 0
  2 + null; // 2
  ```

- `undefined` 表示一个“无”的原始值，转换为数值为 `NaN`。

  ```javascript
  Number(undefined); // NaN
  2 + undefined; // NaN
  ```

对于 `null` 和 `undefined`，可以这样理解：

- `null` 表示一个空对象指针，它被定义了，但值为空值。
- `undefined` 表示根本未定义。

![undefined-null](./imgs/undefined-null.png)

