# 模板语法

### 介绍

> Vue 使用了基于 HTML 的模板语法 ，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵守规范的浏览器和 HTML 解析器解析
>
> 在底层实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应式系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减少到最少
>
> 也可以不使用模板，直接写渲染（render）函数，使用可选的 JSX 语法
### 插值

- 文本

  - 文本插值使用**双大括号**语法进行数据绑定，双大括号语法会将数据解释成普通文本。如下代码

    ```html
    <div>{{ msg }}</div>
    ```

    双大括号处的内容会被替换成 data 对象中 `msg` 属性的值。无论何时，绑定在 data 对象上 `msg` 属性的值发生改变，插值处的内容都会更新

  - 也可使用 `v-once` 指令执行一次性插值，即只渲染元素和组件一次，后续的重新渲染，元素/组件及其所有子节点将被视为静态内容并跳过。如下代码

    ```html
    <div v-once>只渲染一次{{ msg }}</div>
    ```

- 原始 HTML

  - 要输出真正的 HTML 可使用 `v-html` 指令，它用于更新元素的 `innerHTML`。注意：内容按普通 HTML 插入，不会作为 Vue 模板进行编译

  - 如下示例，HTML 代码如下

    ```html
    <div id="app">
      <p v-html="rawHtml"></p>
    </div>
    ```

    `JavaScript`  代码如下

    ```javascript
    let app = new Vue({
    	el: '#app',
      data () {
        return {
          rawHtml: '<span style="color: red;">study Vue</span>'
        }
      }
    })
    ```

    此时，`raw` 属性中的值会作为普通 HTML 插入到 `p` 元素中，如下图所示

    ![v-html-1](./imgs/v-html-1.png)

  - 为了避免 XSS 攻击，只在可信内容上使用 `v-html`，永不用在用户提交的内容上

- 特性

  - 由于双大括号语法不能作用在 HTML 特性上，故可以使用 **`v-bind`** 指令来绑定 HTML 特性。如下代码
  
    ```html
    <div v-bind:title="dynamicMsg">Vue</div>
    ```
  
    在上面代码中，`v-bind` 指令将 HTML 特性 `title` 同数据对象上 `dynamicMsg` 属性绑定在一起。当 `dynamicMsg` 属性的值发生改变的时候，`title` 特性也会随之改变
  
  - 对于 HTML 特性是布尔特性的情况，如下代码
  
    ```html
    <button v-bind:disabled="isBtnDisabled">click me</button>
    ```
  
    如果 `isBtnDisabled` 属性的值为 `false`、`undefined`、`null` ，则 button 按钮处于可点击状态；如果 `isBtnDisabled` 属性的值为 `true`，则 button 按钮无法点击
  
- 使用 JavaScript 表达式

  - 对于所有的数据绑定，Vue.js 都支持使用 JavaScript 表达式。如下示例

    ```html
    {{ number + 1 }}
    {{ ok ? 'yes': 'no' }}
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id"></div>
    ```

    以上这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析

  - **每个数据绑定只能包含单个表达式**

### 指令

- 什么指令？指令的作用

  - 指令是带有 `v-` 前缀的特殊特性。指令特性的值预期是**单个 JavaScript 表达式**（v-for 除外）

  - 指令的作用在于，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。如下示例

    ```html
    <div v-if="seen">you can see me</div>
    ```

    `v-if` 指令将根据表达式 `seen` 的值的真假来插入或移除 `div` 元素

- 参数

  - 一些指令能接收一个参数，在指令名称后面以冒号表示

  - 例子1，`v-bind` 指令用于响应式地更新 HTML 特性。如下代码

    ```html
    <a v-bind:href="url">链接</a>
    ```

    此处 `href` 是参数，告知 `v-bind` 指令将 `a` 元素的 `href` 特性与表达式 `url` 的值绑定

  - 例子2，`v-on` 指令用于绑定事件监听器：

    ```html
    <a v-on:click="doSomething">click me</a>
    ```

    此处事件名 `click` 是参数

- 动态参数

  - 动态参数：可用方括号括起来的 JavaScript 表达式作为一个指令的参数。如下代码

    ```html
    <a v-bind:[attributename]="url">click me</a>
    ```

    这里的 `attributename` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。如果有下面代码情况

    ```javascript
    new Vue({
      data () {
        return {
          attributename: 'href',
          url: 'https://cn.vuejs.org/'
        }
      }
    })
    ```

    在该 Vue 示例的 `data` 对象中有 `attributename` 属性，其值为 `href`，那么这个绑定就等价于 `v-bind:href`

  - 对动态参数的值的约束

    >动态参数预期会求出一个**字符串**，异常情况下的值为 `null`，这个 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告

  - 对动态参数表达式的约束

    动态参数表达式有一些语法约束，某些字符，比如空格和引号，放在 HTML attribute 名里是无效的，如下代码

    ```html
    <!-- 这会触发编译警告 -->
    <!-- 变通的方法使用无空格和引号的表达式，或使用计算属性代替这中复杂表达式 -->
    <a v-bind:['foo' + bar]="value">xxx</a>
    ```

    在 HTML 文件里写模板时，避免使用大写字符命名键名，因为浏览器会把 attribute 名全部强制转为小写。如下代码

    ```html
    <!-- 
    在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`
    除非在实例的数据对象中有一个名为 someattr 的属性，否则代码不会工作
    -->
    <a v-bind:[someAttr]="value">xxx</a>
    ```

- 修饰符

  - 修饰符是以 `.` 指明的特殊后缀，用于指出一个指令应该以特殊的方式绑定。如下代码

    ```html
    <form v-on:submit.prevent="onSubmit">...</form>
    ```

    `.prevent` 修饰符告诉 `v-on` 指令对于该处 `submit` 事件应调用 `event.preventDefault()`

- 缩写

  - `v-bind` 缩写

    ```html
    <!-- 完整语法 -->
    <a v-bind:href="url">链接</a>
    
    <!-- 缩写语法 -->
    <a :href="url">链接</a>
    ```

  - `v-on` 缩写

    ```html
    <!-- 完整语法 -->
    <div v-on:click="doSomething">xxx</div>
    
    <!-- 缩写语法 -->
    <div @click="doSomething">xxx</div>
    ```

    

