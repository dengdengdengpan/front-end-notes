# 理解 Vue 不同构建版本

从 Vue 文档的安装章节中，可以知道实际上 Vue 的构建版本可以划分为：**完整版**和**运行时版**。在结合例子理解这两个版本的不同之前，有以下术语解释：

> 完整版：同时包含编译器和运行时的版本。
>
> 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
>
> 运行时：用来创建 Vue 示例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

### 制作 +1 按钮

#### 使用完整版

在完整版中，使用模板语法得到视图，代码如下：

```html
<div id="app">
  {{ n }}
  <button @click="addOne">+1</button>
</div>
<!-- 引入完整版的 Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      n: 0
    },
    methods: {
      addOne() {
        this.n += 1
      }
    }
  })
</script>
```

此时，在页面中点击 `+1` 按钮时，初始值 0 会变为 1，实现了 `+1` 按钮的功能。

#### 使用运行时版

将上面代码中引入完整版 Vue 的链接更换为运行时版，如下代码：

```html
<!-- 引入运行时版的 Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.runtime.js"></script>
```

 但这时页面控制台中会出现如下报错信息：

![运行时版报错](./imgs/vue-runtime-error.jpg)

以上报错信息表示当前正在使用的是没有模板编译器的只包含运行时的 Vue 版本，解决办法：使用 `render` 函数或者使用完整版。那么接下来使用 `render` 函数解决报错：

```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.runtime.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      n: 0
    },
    methods: {
      addOne() {
        this.n += 1
      }
    },
    render(h) {
      return h('div', [this.n, h('button', { on:{ click: this.addOne } }, '+1')])
    }
  })
</script>
```

在运行时版本的 Vue 中，并没有使用模板语法来构建视图，同时 `render` 函数的写法也没有直接使用模板语法那么简洁明了，那为什么 Vue 还有运行时版呢？原因在于：

> 运行时版本相比完整版体积要小大约 30%

完整版体积大的部分就是编译器，编译器要把模板字符串编译称为 JS 渲染函数，那么它就比较复杂，从而导致体积较大。比如，构建完成后，假设完整版的体积 100kb，那么运行时版的体积大约是 70kb，相当于完整版比运行时版体积大了 40% 左右，所以应该尽可能地使用运行时版。

### 完整版 vs 运行时版

完整版和运行时版的区别在于**是否需要编译模板**。当需要编译模板时则必须使用完整版，如下：

- 使用 `template` 选项

  ```javascript
  new Vue({
    el: '#app',
    template: '<div>{{ n }}</div>'
  })
  ```

- 挂载到元素上并使用 DOM 内部的 HTML 作为模板

  ```html
  <div id="app">
    <h1>hellow Vue</h1>
  </div>
  ```

### 最佳实践

总是使用 `vue-loader` ，思路：

- 保证用户体验，用户下载的 JS 体积更小，但是只支持 `render` 函数

- 保证开发体验，开发者直接在 `*.vue` 单文件组件中进行开发，而不用写 `render` 函数

- 构建时，`vue-loader` 会将 `*.vue` 文件内部的模板预编译成 JS 的渲染函数

比如，在使用 @vue/cli 创建的项目中，有如下 `App.vue` 单文件组件：

```vue
<template>
  <div id="app">
    {{ n }}
    <button @click="addOne">+1</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      n: 0
    }
  },
  methods: {
    addOne () {
      this.n += 1
    }
  }
}
</script>

<style lang="scss">
#app {
  color: red
}
</style>
```

在 `main.js` 中执行 `console.log(App)` 会在控制台得到如下对象：

  ![App](./imgs/app-vue.png)

将该对象的 `render` 打印出来：

![render-function](./imgs/render-function.png)

这便是使用 `vue-loader` 将 `App.vue` 编译为 JS 渲染函数的过程