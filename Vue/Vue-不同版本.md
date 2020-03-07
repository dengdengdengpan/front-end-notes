# 理解 Vue 不同版本

### 背景

在学习 Vue 文档安装这块时，了解到 Vue 大体上分为完整版和只包含运行时版，而且 Vue.js 可以通过 CDN 引入。在下面代码中将会引入完整版的 CDN，代码如下

```html
<div id="app">
 {{ message }}
</div>
<script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
<script>
	new Vue({
    el: '#app',
    data: {
      message: 'hello Vue.js'
    }
  })
</script>
```

这个时候页面上会显示 `message` 属性所对应的值，即 `hello Vue.js`。然后在上述代码中引入只包含运行时版本，代码如下

```html
<!-- 注释代码 -->
<!-- <script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script> -->

<!-- 新增代码 -->
<script src="https://cdn.bootcss.com/vue/2.6.11/vue.runtime.js"></script>
```

这个时候会发现页面上显示的内容不见了，同时在控制台中发现如下图所示的报错信息

![报错信息](/Users/dengpan0513/Desktop/github/front-end-notes/Vue/imgs/vue-version-error.jpg)

以上报错信息表示当前正在使用的是没有模板编译器的仅包含运行时的 Vue 版本，解决办法要不使用 `render` 函数，要不使用包含编译器的 Vue 版本。那下面将会对 Vue 的两个版本进行深入理解

### 两个 Vue 版本

查看 Vue 文档可以知道有很多不同的 Vue.js 构建版本，但大体上可分为**完整版**、**只包含运行时版本**。其中有几个术语的解释如下：

- **完整版：同时包含编译器和运行时的版本**
- **编译器：将模板字符串编译成为 JavaScript 渲染函数的代码**
- **运行时：基本是完整版中除去编译器后的一切**

而在使用完整版的情况下，使用 `template` 也能在页面中显示 `message` 属性中的内容，如下代码

```html
<script>
	new Vue({
    el: '#app',
    template: '<div>{{ message }}</div>',
    data: {
      message: 'hello Vue.js'
    }
  })
</script>
```

如果将引入的 Vue 版本更换为只包含运行时版会发现页面上没有内容，并且控制台出现了之前同样的报错。通过分析上述现象发现，**只要是从 HTML 里面展示数据属性来得到视图的（无论是直接在HTML 里还是使用 template）完整版都支持，只包含运行时版则都不支持**。在下面两种情况下都需要编译器：

- **挂载到一个元素上并以其 DOM 内部的 HTML 作为模板**，代码如下

  ```html
  <!-- 需要编译器 -->
  <div id="app">
    {{ message }}
  </div>
  ```

- **使用 `template` 选项**，代码如下

  ```javascript
  // 需要编译器
  new Vue({
  	el: '#app',
    template: '<div>{{ message }}</div>',
    data: {
      message: 'hello Vue.js'
    }
  })
  ```

而如果想要在只包含运行时版下显示出 `message` 属性对应的值，其写法如下代码

```javascript
// 只包含运行时版
new Vue({
  el: '#app',
  render (h) {
    return h('div', this.message)
  },
  data: {
    message: 'hello Vue.js'
  }
})
```

从上面代码可以看出在只包含运行时版中这种写法并不是很方便，但实际上这才是对的。同时 Vue 文档也提倡尽可能地使用这个版本，原因在如下：

> 只包含运行时版相比完整版体积要小大约30%

而只包含运行时版体积小的部分就是在于它没有了编译器，所以它无法把 HTML 中诸如 `<div>{{ message }}</div>`、`<div v-if="visible"></div>`、`<div v-on:click="add"></div>` 等等这些模板字符串编译为 JavaScript 渲染函数的代码，因此之前的 `message` 属性自然就不会在页面中显示

从上述内容中了解到完整版在写代码上更加方便，但是其体积大；只包含运行时版书写不方便，但是体积小，有什么方法能使这两个版本的优点都存在而摒弃其缺点呢？答案就是可以使用 webpack 之类的打包工具：

- 在写代码的时候按照完整版的方式来写
- 在构建工具中添加`vue-loader`，当需要打包（即 `npm run build`）时将项目中的模板字符（`.vue` 页面）预编译成 JavaScript
- 最终打好的包里就不需要编译器，所以只用运行时版即可。这样用户得到就是一个体积更小的版本



