# Vue 实例

### 创建一个 Vue 实例

- 每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 Vue 实例开始，如下

  ```javascript
  const vm = new Vue({
    // 选项
  })
  ```

- 一个 Vue 应用由一个通过 `new Vue` 创建的根实例，以及可选的可嵌套的、可复用的组件树组成

### 数据和方法

- 数据

  - 当一个 Vue 实例被创建时，它将 `data` 对象中**在实例被创建时就存在的属性**都加入到 Vue 的**响应式系统**中；当这些属性的值发生改变时，视图将产生’响应‘，即匹配更新为新的值。如下：

    ```javascript
    // 数据对象
    let user = {
    	name: 'xxx',
      age: 20
    }
    
    // 将数据对象加入到一个 Vue 实例中
    let app = new Vue({
    	el: '#app',
      data: user
    })
    
    // Vue 实例属性的值 === 数据对象对应字段的值
    app.name === user.name // true
    
    // 修改实例的属性会影响到原始数据
    app.name = 'yyy'
    user.name // yyy
    
    // 修改原始数据也会影响到实例的属性
    user.name = 'ccc'
    app.name // ccc
    ```
    
  - 例子1，有如下代码，其中`HTML` 如下

    ```html
    <div id="app">
      <span class="span-a">{{ obj.a }}</span>
      <span class="span-b">{{ obj.b }}</span>
    </div>
    ```

    `JavaScript` 如下

    ```javascript
    let app = new Vue({
      el: '#app',
      data: {
        obj: {
          a: 'a1'
        }
      }
    })
    app.obj.a = 'a2'
    ```

    最终 span-a 和 span-b 中分别展示什么？由于属性 `a` 是在该实例被创建时 `data` 中就存在的属性，则其会被 Vue 加入到响应式系统中从而被监听；故当属性 a 的值有变化时，span-a 中的视图也会更新，最终展示 a2。而 span-b 中不显示则是因为 `obj.b` 根本不存在

  - 例子2，`HTML` 同例子1，`JavaScript` 如下

    ```javascript
    let app = new Vue({
    	el: '#app',
      data: {
        obj: {
          a: 'a1'
        }
      }
    })
    app.obj.b = 'b'
    ```

    最终 span-a 和 span-b 中分别展示什么？span-a 中最终展示 a1。span-b 中仍然不显示，这是因为属性 b 并不是在该实例被创建时 `data` 中就存在的属性，因此 Vue 并没有对其进行监听，那么对 b 的改动不会触发任何视图更新

  - 例子3，`HTML` 同例子1，`JavaScript` 如下

    ```javascript
    let app = new Vue({
    	el: '#app',
      data: {
        obj: {
          a: 'a1'
        }
      }
    })
    app.obj.a = 'a2'
    app.obj.b = 'b'
    ```

    最终 span-a 和 span-b 中分别展示什么？span-a 中最终展示 a2，span-b 中最终展示 b，重点在于**Vue 在更新视图时是异步执行的**，理由如下：

    - 当属性 a 的值从 a1 变成 a2 时，Vue 会监听到该变化（并不会马上更新视图），同时 Vue 会创建一个视图更新任务到任务队列中
    - 所以在 Vue 进行视图更新前，会运行完余下代码，即 b = 'b'
    - 当视图更新时，由于 Vue 会去做 diff，于是 Vue 就会发现 a 和 b 的值都变了，则会更新 span-a 和 span-b

- 方法

  - Vue 实例还有一些有用的示例属性和方法，它们都带有前缀 `$`
  
    ```javascript
    let xxx = {
    	a: 1
    }
    let app = new Vue({
      el: '#app',
      data: xxx
    })
    // 实例属性，app.$data => Vue 实例观察的数据对象
    app.$data === xxx // => true
    // 实例属性，app.$el => Vue 实例使用的根 DOM 元素
    app.$el === document.querySelector('#app') // => true
    // 实例方法
    app.$watch('a', function(newValue, oldValue) {
      // 这个回调将在 `vm.a` 改变后调用
    })
    ```
### 实例生命周期钩子
  - 每个 Vue 实例在被创建时都要经过一系列的初始化过程--例如，设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等

  - 在这个初始化过程中会运行一些叫做**生命周期钩子**的函数，它的作用是让用户在不同阶段添加代码进行操作。比如，`created` 钩子用来在一个实例被创建后执行

  - **生命周期钩子的 `this` 上下文指向调用它的 Vue 实例**

  - 注意，**不要在选项属性或回调上使用箭头函数**，比如如下代码

    ```javascript
    let vm = new Vue({
    	created: () =>{
        console.log(this)
      }
    })
    vm.$watch('a', newValue => this.myMethod)
    ```

    由于箭头函数没有 `this`，则上面代码将会有 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误

### 生命周期图示

- 下图为 Vue 实例的生命周期

  ![生命周期图示](./imgs/lifecycle.png)