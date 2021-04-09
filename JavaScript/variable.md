# 变量

### 认识变量

在 JavaScript 中，变量是指**用来保存任意值的命名占位符，变量不是值本身，它仅仅是一个用于存储任意值的容器**。比如，可以把变量想象成一个个装东西的盒子，盒子外边有一个唯一标注盒子名称的贴纸，有如下代码：

```javascript
let a = 'Bob';
let b = true;
let c = 35;
```

想象变量 `a` 是一个贴着“a“贴纸的盒子，盒子里面放着字符串值 `Bob`；变量 `b` 是一个贴着“b“贴纸的盒子，盒子里面放着布尔值 `ture`；变量 `c` 是一个贴着“c“贴纸的盒子，盒子里面放着数值 `35`，如下图：

![容器](./imgs/variable-box.png)

我们可以往盒子里面放入任何值。同时，由于 JavaScript 中的变量具有**松散类型**的特点（即变量的值和值的数据类型在脚本的生命周期内都可以改变），所以可以多次更改盒子里面的值及其类型。比如：

```javascript
var a = 10;
a = 25; // 变量 a 的值从数值 10 改变为数值 25
a = true; // 变量 a 的数据类型从 Number 改变为 Boolean
```

### 变量命名

变量作为标识符，其命名需要遵守一定的规则：

- 变量名只能包含字母、数字、下划线（_）或美元符号（$），且不能以数字开头。
- 关键字、保留字、`true`、`false`、`null` 不能用作变量名。
- 由于 JavaScript 使用了 **Unicode** 字符集，所以可以使用 Unicode 中的字母字符。比如，中文也是合法的变量名。

下面是一些变量命名的示例：

```javascript
// 合法的变量命名
let name;
let _this;
let $attr;
let 临时变量; // 合法，但不推荐
let имя；// 合法，但不推荐

// 不合法的变量命名
let 9age; // 不能以数字开头
let age*; // 不包含 *
let new; // 不能使用关键字
let enum; //不能使用保留字
let null; // 不能使用 null
```

如果变量命名中包含多个单词，通常采用**驼峰式**命名法，即第一个单词首字母小写，后面每个单词首字母大写：

```javascript
let carType;
let userName;
let deviceStatusList;
```

### 声明变量

要想使用变量，第一步要做的就是创建它——更准确地说，是声明一个变量。在 JavaScript 中，**声明变量的方式有三种：分别是使用 `var`、`let`、`const` 后接变量名的方式**。

#### var

##### 使用方式

使用 `var` 关键字可以声明一个变量，并可选地将其初始化为一个值（及可选地初始化）：

```javascript
var name = 'lufei';
```

上面代码声明了一个名为 `name` 的变量，并且初始化赋值了字符串值 `lufei`，它的实际步骤是下面这样的：

```javascript
var name; // var 关键字告诉 JS 引擎，要声明一个变量 name
name = 'lufei'; // 通过赋值操作符 = ，变量 name 就保存了将字符串值 lufei
```

如果只是声明变量而没有赋值，则变量会保存一个特殊值 `undefined`。

```javascript
var message;
console.log(message); // undefined
```

使用 `var` 可以多次声明同一个变量，变量的值会取排在后面的：

```javascript
var a = 10;
var b = 20;
var a = 50;
console.log(a); // 50
```

如果需要定义多个变量，可以在一条语句中用逗号分隔每个变量：

```javascript
var a,
    b = 10,
    c = false,
    d = [1, 2, 3];
```

##### 变量作用域

**用 `var` 声明的变量的作用域是它当前的执行上下文**：

- 在函数外声明的变量会成为全局变量（会成为全局对象的一个属性），全局变量在当前执行环境下都能被访问。

  ```javascript
  var b = 2;
  console.log(window.b); // 2
  function test() {
    console.log(b);
  }
  test(); // 2
  ```

- 在函数内声明的变量会成为包含它的函数的局部变量，该变量只在该函数内部能够被访问。

  ```javascript
  function test() {
    var a = 1; // 局部变量
    console.log(a); // 1
  }
  test();
  console.log(a); // Uncaught ReferenceError: a is not defined
  ```

  不过，如果在函数内声明变量时省略 `var` 关键字，在执行赋值操作后，该变量会被隐式地创建为全局变量。

  ```javascript
  function test() {
    c = 3;
  }
  test();
  console.log(c); // 3
  console.log(window.c); // 3
  ```

##### 变量提升

使用 `var` 声明的变量可以在其被声明之前使用而不报错，就像是把它移动到了当前作用域的顶部一样，这种行为叫变量提升。比如：

```javascript
console.log(name); // undefined
var name = 'lufei';
```

以上代码之所以不会报错，是因为它们被执行时等价成下面代码：

```javascript
// 这里是当前作用域顶部
var name; // 把 var 声明的变量提到当前作用域顶部
console.log(name); // 此时还未赋值，所以保存了特殊值 undefined
name = 'lufei';
```

这样就产生了“变量提升”，但实际上变量在代码中的位置是不会移动的，所以这里的“提升”并非字面意思。“提升”的原因在于 JavaScript 作为即时编译型的编程语言，为了使代码运行速度更快。在源代码被执行时，它会被编译成二进制的格式。就在这个编译阶段，由 `var` 声明的变量会被放入到内存中，从而能够在使用该变量时不报错，产生“变量提升”的效果。

在函数产生的作用域中，使用 `var` 声明的变量也会有“提升”到该函数作用域顶部的效果：

```javascript
function fn() {
  name = 'lufei';
  console.log(name); // lufei
  var name;
}
fn();
```

同时，值得注意的是，**提升只影响变量声明，而不会影响其值的初始化**，比如：

```javascript
console.log(number); // undefined，如果提升影响到了值的初始化，那么这里应该是 100
var number = 100;
console.log(number); // 100
```

#### let

xx