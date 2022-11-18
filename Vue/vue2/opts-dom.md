### el 选项

`el` 选项会提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂在目标，它的值可以是：

- CSS 选择器

  ```html
  <div id="app"></div>
  <scipt>
    new Vue({
      el: '#app'
    })
  </scipt>
  ```

- HTMLElement 实例

  ```html
  <div id="app"></div>
  <scipt>
    const appElement = document.getElementById('app')
    new Vue({
      el: appElement
    })
  </scipt>
  ```

在实例挂载后，可以通过 `vm.$el` 访问该元素：

```javascript
console.log(vm.$el) // <div id="app"></div>
```

如果在实例化时 `el` 选项存在，那么实例将立即进入编译过程，否则，需要显式调用 `vm.$mount()` 手动开启编译：

```javascript
new Vue({
  template: '<h1>Vue.js</h1>'
}).$mount('#app')
```

此外，还有两个注意点：

- 提供的元素只能作为挂载点，并且挂载元素会被 Vue 生成的 DOM 替换，所以不推荐将实例挂载到 `<html>` 或 `<body>` 元素上。
- 如果 `template` 和 `render` 这两个属性都不存在，那么挂载元素的 HTML 会被提取出来作为模板。此时，就必须使用完整版构建的 Vue。