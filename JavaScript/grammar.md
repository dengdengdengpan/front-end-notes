# JavaScript 语言基础

### 1.基本语法

- **区分大小写**

  在 JavaScript 中是区分大小写的，无论是变量、函数名、操作符都区分大小写。比如，变量 `obj` 和 变量 `Obj` 是两个不同的变量

- **标识符**

  - 标识符指的是变量、函数、函数参数、属性的名称

  - JavaScript 标识符必须以字母、下划线、美元符号开头，剩下的字符可以是字母、下划线、美元符号、数字；关键字、保留字、`true`、`false`、`null` 不能用作标识符

    ```javascript
    // 合法的标识符
    obj
    arg0
    _test
    $element
    临时变量 // 中文也是合法的标识符
    π
    
    // 不合法的标识符
    23ab // 第一个字符不能是数字
    a+b // 标识符不包含加号
    a*b2 // 标识符不包含星号ß
    ```

  - 在书写上，标识符一般使用驼峰大小写形式，即第一个单词首字母小写，后面每个单词首字母大写

    ```javascript
    let mayCar = '卡丁车';
    function sayHello() {
      console.log('hello')
    }
    ```

- **表达式**

  **表达式是一组代码的集合，它是为了返回一个值**。每个合法的表达式都能计算成某个值，凡是在 JavaScript 中预期为值的地方，都可以使用表达式，有以下表达式类型

  - 基本表达式：关键字和一般表达式

    ```javascript
    // 比如 this 关键字
    this.name
    
    // 比如分组操作符()，它控制了表达式中计算的优先级
    let a = 1;
    let b = 2;
    let c = 3;
    // 默认优先级
    a + b * c // 7，相当于 a+ (b * c)
    // 通过 () 使加法优先
    (a + b) * c // 9
    ```

  - 左值表达式：分配给左值

    ```javascript
    // 比如拓展语句可以将表达式原地展开
    let array = [1, 4, 2, 9];
    [3, ...array, 10]
    ```

  - 计算数：得出一个数字

  - 字符串：得出一个字符串

  - 逻辑值：得出 `true` 或者 `false`

- **语句**

  JavaScript 中的语句是**为了完成某种任务而进行的操作**。语句以分号结尾，一个分号就表示一个语句结束；如果省略分号则表示由解析器确定在哪里结尾；多个语句可以写在一行内，分号前面也可以没有内容，此时会被 JavaScript 引擎视为空语句

  ```javascript
  let a = 1;
  const obj = {}; const carColor = 'black'; // 多个语句写在一行
  ;; // 空余句
  ```

  **语句和表达式的区别在于**：语句是为了进行某种操作，一般情况下不需要返回一个值；表达式则是为了返回一个值。同时表达式也不需要分号结尾，一旦在表达式后面添加分号，则 JavaScript 引擎就将该表达视作语句，但是这样会产生一些没有任何意义的语句

  ```javascript
  // 表达式添加分号，成为无意义的语句
  2 * 5;
  'JavaScript';
  ```

  比如 可以通过`if` 流程语句来判断，因为它的控制条件预期是为得到一个逻辑值

  ```javascript
  if (a = 1) {}
  if (var b = 1) {} // var b = 1 是语句，会报错Uncaught SyntaxError: Unexpected token 'var'
  ```

- 注释

  JavaScript 注释和 C 语言或其它语言类似，包括单行注释和多行注释

  ```javascript
  // 单行注释
  /* 
  这是
  多行
  注释
  */
  ```

- 关键字和保留字

  - 关键字在 JavaScript 中有特殊的用途，比如表示控制语句的开始和结束，或者执行特定的操作。比如有：`import`、`export`、`if`、`else`、`switch`、`catch`、`this`、`new`、`delete`、`var`、`const`、`class`
  - 保留字目前在 JavaScript 中还没有特殊用途，但它们是保留给将来做关键字用的。比如有：`package`、`public`、`interface`
  - 保留字和关键字都不能用作标识符

### 2.变量

- 认识变量

  在 JavaScript 中变量是用来保存任意**值**的命名占位符，变量和**值**之间建立了一种引用关系，使用变量，就等于引用了这个值

  ```javascript
  var fruit = 'apple';
  ```

  上面代码声明先声明了变量 `fruit`，然后在变量 `fruit` 和字符串 `apple` 之间建立了引用关系。在后续使用中，使用变量 `fruit` 就会得到字符串 `apple`。而关键字 `var` 是变量声明命令，它会通知 JavaScript 引擎将要创建一个变量 `fruit`

  同时，JavaScript 作为动态语言，其变量是**松散类型**的，表示变量可以用来保存任意类型的数据，并且在使用中也可以改变数据类型

  ```javascript
  var a = 'fish';
  a = 1;
  ```

  上面代码中，变量 `a` 先被赋值为一个字符串，后又被赋值为数值

- **声明变量**

  如果直接使用一个未声明的变量，JavaScript 会报错，告诉你该变量未定义，如下代码：

  ```javascript
  a; // Uncaught ReferenceError: a is not defined
  ```

  **在 JavaScript 中声明变量的方式有：使用形如 `variable = 3` 的语法、`var`、`let`、`const`**

  - **`var` 声明一个全局或局部变量，可选是否初始化一个值（未初始化则保存特殊值 `undefined`）**

    - 使用方式：`var` 后跟变量名；声明多个变量，在一条语句中使用逗号分隔。如果选择初始化值则等于进行了变量的声明和赋值这两个操作

      ```javascript
      var a; // 未初始化，变量 a 的值为 undefined
      
      var b = 'test'; // 有初始化，b 被定义为一个保存字符串值 test 的变量
      // 上面语句等同于
      var b; // 声明变量
      b = 'test'; // 变量赋值
      
      var c = 2, d = 'test', e; //声明多个变量
      var f = 10,
          g,
          h = 'test'; // 声明多个变量，缩进和换行不是必需的，只是有利于阅读
      ```

    - **变量名可重复声明**。如果后续只是声明相同的变量名，那么该变量的值不变；如果后续声明相同的变量名并赋值，那么会覆盖掉前面的值

      ```javascript
      // 只声明相同的变量名不赋值
      var a = 100;
      var a;
      console.log(a); // 100
      
      // 声明相同的变量名并赋值，变量 b 的值为改变后的值
      var b = ‘test’;
      var b = 20;
      console.log(b); // 20
      ```

    - **作用域**

      - 全局作用域：`var` 在**函数外部**声明变量的作用域是全局环境，该变量叫全局变量。同时，全局变量会成为全局对象的属性。比如在浏览器中，全局对象是 `window`，可以用形如 `window.variable` 的语法来设置和访问全局变量

        ```javascript
        var a = 1; //全局变量
        if (true) {
          console.log(a); // 1
        }
        function fn() {
          console.log(a);
        }
        window.a = 3; // 浏览器环境下，全局对象是 window
        console.log(window.a); // 3
        fn(); // 3
        ```

      - 局部作用域，`var` 在**函数内部**声明变量是局部变量，该变量的作用域只在当前函数内部，表示该变量只能在当前函数内部访问

        ```javascript
        function fn() {
          var a = 1; // 局部变量
          console.log(a); // 1
        }
        fn();
        console.log(a); // 报错 Uncaught ReferenceError: a is not defined
        ```

        上面代码中，变量 `a` 定义在 `fn` 函数内部。当调用 `fn` 函数时会创建变量 `a` 并赋值；调用完后变量 `a` 随即被销毁，所以在函数外部访问变量 `a` 时显示它未定义的报错

  - **`let` 声明一个拥有块作用域的变量，可选是否初始化一个值（未初始化则保存特殊值 `undefined`）**

    - 使用方式：

- **变量类型**

- **变量提升**

