# JavaScript 语言基础

### 1.基本语法

- **区分大小写**

  在 JavaScript 中是区分大小写的，无论是变量、函数名、操作符都区分大小写。比如，变量 `test` 和 变量 `Test` 是两个不同的变量

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

- **语句**

  xxx

- **注释**

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

  - 关键字在 JavaScript 中有特殊的用途，比如表示控制语句的开始和结束，或者执行特定的操作。比如常用的关键字有：`import`、`export`、`if`、`else`、`switch`、`catch`、`this`、`new`、`delete`、`var`、`const`、`class`
  - 保留字目前在 JavaScript 中还没有特殊用途，但它们是保留给将来做关键字用的。比如有：`package`、`public`、`interface`
  - 保留字和关键字都不能用作标识符

### 2.变量

xxx

