# 条件渲染

### v-if

**`v-if` 指令用于有条件地渲染元素**，元素是否会被渲染取决于 `v-if` 指令绑定的表达式值的真假。有如下代码：

```html
<div v-if="seen">can see ?</div>
```

如果一开始数据 property `seen` 的值为真，那么 `div` 元素会被渲染；反之，`div` 元素不会出现在页面中。

#### v-else-if & v-else

同 `v-if` 指令一起搭配使用的还有 `v-else-if`、`v-else`，有如下代码：

```html
<div v-if="animal === 'dog'">dog</div>
<div v-else-if="animal === 'cat'">cat</div>
<div v-else-if="animal === 'bird'">bird</div>
<div v-else>I don't know this animal</div>
```

其中，`v-else-if` 指令可以连续使用，它必须紧跟带 `v-if` 或者 `v-else-if` 元素后面。同样地，`v-else` 也必须紧跟在带 `v-if` 或者 `v-else-if` 元素后面，否则它不能被识别。

#### 在 `<template>` 元素上使用 `v-if` 渲染分组

`v-if` 指令必须添加到一个元素上才能起作用，而如果想通过 `v-if` 切换渲染多个元素，则可以把  `<template>` 元素当作不可见的包裹元素，并在上面使用 `v-if` ，最终的渲染结果将是 `<template>` 元素所包含的内容。有如下代码：

```html
<template v-if="ok">
  <h1>标题</h1>
  <p>段落</p>
</template>
```

如果数据 property `ok` 的值为真，那么渲染结果如下图：

![v-if-1](./imgs/v-if-1.png)

#### 用 key attribute 管理可复用元素

Vue 为了尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。比如，页面上有一个用户可以切换登录方式的模块，代码如下：

```vue
<template>
  <div id="app">
    <h3>不同的登录方式</h3>
    <template v-if="loginType === 'username'">
      <label>用户名：</label>
      <input placeholder="请输入用户名">
    </template>
    <template v-else>
      <label>手机：</label>
      <input placeholder="请输入手机号">
    </template>
    <div style="margin-top: 10px;">
      <button>切换登录方式</button>
    </div>
  </div>
</template>
```

当在 `input` 输入框中输入内容后，点击按钮切换登录方式并不会清除已经输入的内容，如下图：

![v-if-2]



