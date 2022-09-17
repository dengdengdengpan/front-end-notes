# Undefined & Null

### Undefined 类型

`Undefined` 类型只有一个值 `undefined`，表示**未定义**的值。以下是产生 `undefined` 的场景：

- 声明变量但未初始化。

  ```javascript
  let name;
  console.log(name); // undefined
  ```

  还可以显式地将 `undefined` 赋值给变量：

  ```javascript
  let a = undefined;
  a === undefined; // true
  ```

  但这是不必要且不合理的，因为默认情况下任何未经初始化的变量的值都是 `undefined`。一般来说，永远不要显式地给变量赋值 `undefined`。

- 对象没有被赋值的属性。

  ```javascript
  let person = {};
  console.log(person.age); // undefined
  ```

- 函数没有返回值时，默认返回 `undefined`。

  ```javascript
  function fn() {}
  fn(); // undfined
  ```

- 调用函数时，有参数但未提供，则该参数的值是 `undefined`。

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

另外，`undefined` 还是全局对象的一个属性。

```javascript
console.log(window.undefined);
```

### Null 类型

`Null` 类型也只有一个值 `null`，表示**“空”、“无”或“值未知”**的特殊值。例如，声明变量时可以用 `null` 初始化，这表示该变量的值现在为空，但后面可能会赋值为真正的值。

```javascript
let error = null;
```

### undefined vs null

##### 相同点

1. 在进行布尔转换时，二者都会被转换成 `false`。

   ```javascript
   if (!undefined) {
     console.log('undefined is false');
   }
   
   if (!null) {
     console.log('null is false')
   }
   ```

2. 使用相等运算符 `==` 比较 `undefined` 和 `null` 时会返回 `true`。

   ```javascript
   undefined == null; // true
   ```

##### 不同点

1. 定义不同

   - `undefined` 表示一个未定义的值——即该值根本不存在。
   - `null` 表示一个值为空的值——即该值被定义了，但值为空。

   可以这样理解：

   ![undefined-null](./imgs/undefined-null.png)

2. 数值转换时不同

   - `undefined` 转为数值时为 `NaN`。
   - `null` 转为数值时为 `0`。

3. 是否为全局对象的属性

   - `undefined` 是全局对象的一个属性。
   - `null` 是一个字面量，并不是全局对象的属性。

4. `typeof` 运算符检验的结果不同

   - `typeof undefiend === 'undefined'`
   - `typeof null === 'object'`
