# 模板语法

### 背景

在 Vue 中，关于模板的写法有以下三种：

- Vue 完整版，直接写在 HTML 里：

  ```html
  <div id="app">
    <p>{{ n }}</p>
    <button @click="addOne">+1</button>
  </div>
  <script>
  new Vue({
    el: '#app',
    data: { 
      n: 0 
    },
    methods: { 
      addOne () {} 
     }
  })
  </script>
  ```

- Vue 完整版，写在 `template` 选项里：

  ```html
  <div id="app"></div>
  <script>
  new Vue({
    template: `
      <div>
        <p>{{ n }}</p>
        <button @click="addOne">+1</button>
      </div>
    `,
    data: {
      n: 0
    },
    methods: {
      addOne () {}
    }
  }).$mount('#app') // div#app 会被替换为 template 里的内容
  </script>
  ```

- Vue 运行时版，配合 `*.vue` 单文件组件使用：

  ```vue
  <template>
    <div>
      <p>{{ n }}</p>
      <button @click="addOne">+1</button>
    </div>
  </template>
  
  <script>
  export default {
    data () { // data 必须是函数
      return {
        n: 0
      }
    },
    methods: {
      addOne () {}
    }
  }
  </script>
  ```

在上面的三种模板写法中，都使用了 Vue 特有的**模板语法**，Vue 文档对于模板语法有如下介绍：

> Vue 使用了基于 HTML 的模板语法 ，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵守规范的浏览器和 HTML 解析器解析。
>
> 在底层实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应式系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减少到最少。
>
> 也可以不使用模板，直接写渲染（render）函数，使用可选的 JSX 语法。

接下来就了解一下 Vue 有哪些模板语法？

### 插值

#### 文本插值

要在页面中展示 `data` 中的 property，一般使用**双大括号**语法进行文本插值，比如：

```html
<div>姓名：{{ name }}</div>
<script>
new Vue({
  data: {
    name: '路飞'
  }
})
</script>
```

上面代码中双大括号里的内容会被替换成数据对象上 `name` property 的值。同时，只要数据对象上 `name` property 发生改变，双大括号里的内容都会更新。

#### 输出 HTML

双大括号语法只会将数据解释为普通文本，而非 HTML 代码。要输出真正的 HTML 可使用 `v-html` 指令，它用于更新元素的 `innerHTML`。比如：

```html
<div id="app">
  <p v-html="testHtml"></p>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    testHtml: '<span style="color: red;">study Vue</span>'
  }
})
</script>
```

`testHtml` property 的值会作为 `<p>` 元素的子元素插入，如下图所示：

![v-html-1](./imgs/v-html-1.png)



如果 `testHtml` 的值含有其它 property，那么 Vue 只会将其按**普通 HTML** 插入——会忽略解析 property 值中的数据绑定。比如：

```html
<div id="app">
  <p v-html="testHtml"></p>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    age: 18,
    testHtml: '<span style="color: red;">年龄：{{ age }}</span>'
  }
})
</script>
```

此时 `testHtml` 中的 `age` property 便不会被解析，如下图：

![v-html-2](./imgs/v-html-2.png)

另外，为了避免 **XSS 攻击**，只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值

#### 绑定 HTML attribute

在开发中，经常需要对 HTML attribute 进行数据绑定。比如，`<a>` 元素的 `title` attribute 需要绑定数据，但是双大括号语法不能作用在 HTML attribute 上，这种情况下需要使用 **`v-bind`** 指令，如下代码：

```html
<div id="#app">
  <a href="www.xxx.com" v-bind:title="linkTitle">路飞</a>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    linkTitle: '路飞是海贼王里的角色'
  }
})
</script>
```

通过 `v-bind` 指令将 `title` attribute 和数据对象中的 `linkTitle` property 绑定在一起，当 `linkTitle` property 发生改变时，`title` attribute 也会随之改变。

对于 HTML attribute 是布尔值的情况，比如：

```html
<button v-bind:disabled="isDisabled">按钮</button>
```

如果 `isDisabled` property 的值为真，那么 `disabled` attribute 会出现在 `<button>` 元素中，并且按钮会处于禁用状态，如下图：

![v-bind-1](./imgs/v-bind-1.png)

如果 `isDisabled` property 的值为假，比如为 `null`、`undefined`、`false` 时，`disabled` attribute 不会出现在 `<button>` 元素中：

![v-bind-2](./imgs/v-bind-2.png)

#### 使用 JavaScript 表达式

在模板的数据绑定中，除了绑定简单的 property 键值，**Vue 还提供了完全的 JavaScript 表达式支持，但每个绑定只能包含单个表达式**。比如：

```html
<div>{{ n + 10 }}</div>
<div>{{ isDisabled ? 'yes' : 'ok' }}</div>
<div>{{ message.split('').reverse().join('') }}</div>
<div v-bind:id="'list-' + id"></div>
```

上面这些表达式会在其所属 Vue 实例数据作用域下作为 JavaScript 被解析。

### 指令

**指令是带有 `v-` 前缀的特殊 attribute，指令 attribute 的值预期是单个 JavaScript 表达式**（`v-for` 除外），语法一般为：

```
v-指令名:参数.修饰符=值
```

**指令的作用是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM**。比如：

```html
<div v-if="isSeen">你可以看见了</div>
```

上面代码中，`v-if` 指令将根据表达式 `isSeen` 的值的真假来插入或移除 `<div>` 元素。

#### 参数

一些 Vue 指令能够接收一个**参数**，它跟在指令名后以冒号表示。比如使用 `v-bind` 指令绑定 HTML attribute：

```html
<img v-bind:src="logoUrl" alt="logo">
```

这里 `src` 便是参数，其作用是告知 `v-bind` 指令将 `<img>` 元素的 `src` attribute 和表达式 `logoUrl` 的值绑定在一起。

还可以使用 `v-on` 指令绑定事件监听器，比如监听 `<input>` 元素的 `focus` 事件：

```html
<input v-on:focus="handleInput" type="text">
```

在上面代码中，这个 `focus` 事件名便是参数。 

除了上面那种最开始就定义好的参数，Vue 还提供了**动态参数**——可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<img v-bind:[name]="logoUrl" alt="logo">
```

这里的 `name` 便是动态参数，它会被作为一个 JavaScript 表达式进行动态求值，求得的值将作为最终的参数来使用。比如，如果 `name` property 的值为 `href`，那么这个绑定等价于 `v-bind:href`。在使用动态参数时，有以下约束：

- 对动态参数的值的约束，动态参数的值正常情况下**应求出一个字符串**，异常情况下的值为 `null`（可显性地用于移除绑定）。

- 对动态参数表达式的语法约束：

  - 动态参数表达式里面不能包含空格、引号，它们放在 HTML attribute 里是无效的，并且会触发编译警告：

    ```html
    <!-- 这会触发一个编译警告 -->
    <!-- 解决办法是表达式中不要使用空格、引号；或者使用计算属性来代替这种复杂表达式 -->
    <img v-bind:['a' + b]="logoUrl" alt="logo">
    ```

  - 直接在 HTML 模板中写的动态参数应该避免使用大写字符来命名，因为浏览器会把 HTML attribute 全部强制转为小写：

    ```html
    <img v-bind:[attributeName]="logoUrl" alt="logo">
    ```

    在上面代码中，浏览器会把动态参数强制转换为小写：`v-bind:[attributename]`，如果当前的 Vue 实例中没有一个名为 `attributename` 的 property，则 Vue 会有如下报错：`[Vue warn]: Property or method "attributename" is not defined on the instance but referenced during render...`。

#### 修饰符

**修饰符是以 `.` 跟在参数后面的特殊后缀，它的作用是用于指出一个指令应该以特殊的方式绑定**。如下代码：

```html
<a v-on:click.prevent="onSubmit">导航</a>
```

这里 `.prevent` 便是修饰符，它告诉 `v-on` 指令对于触发的 click 事件应该调用 `event.preventDefault()`。

#### 缩写

Vue 为 `v-bind` 和 `v-on` 这两个常用的指令提供了特定的简写：

- `v-bind` 缩写

  ```html
  <!-- 完整语法 -->
  <img v-bind:src="logoUrl" alt="logo">
  
  <!-- 缩写语法 -->
  <img :src="logoUrl" alt="logo">
  
  <!-- 动态参数缩写语法 -->
  <img :[key]="logoUrl" alt="logo">
  ```

- `v-on` 缩写

  ```html
  <!-- 完整语法 -->
  <button v-on:click="doSomething">按钮</button>
  
  <!-- 缩写语法 -->
  <button @click="doSomething">按钮</button>
  
  <!-- 动态参数缩写语法 -->
  <button @[event]="doSomething">按钮</button>
  ```