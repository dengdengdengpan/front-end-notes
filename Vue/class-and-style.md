# Class 与 Style 绑定

在使用 Vue 开发项目时，经常会有操作元素 `class` 和 `style` 的需求。比如，在开发组件时，经常使用计算属性来根据组件不同的 props 添加相应的 class，从而应用不同的样式。

> 因为 `class` 和 `style` 都是 HTML attribute，所以可以通过 `v-bind` 进行处理：只需要绑定的表达式计算出字符串结果即可。不过，字符串拼接麻烦且容易出错。因此，`v-bind` 在用于 `class` 和 `style` 时，Vue 做了专门的增强，表达式结果的类型除了字符串，还可以是对象和数组。

### 绑定 Class

#### 字符串语法

`v-bind:class` 绑定的表达式计算结果可以是字符串，比如：

```vue
<template>
  <div :class="activeClass">绑定 HTML Class</div>
</template>

<script>
export default {
  data () {
    return {
      activeClass: 'active'
    }
  }
}
</script>
```

结果渲染如下图：

![vue-class-1](./imgs/class-1.png)

同时，使用字符串语法也可以绑定多个 class，代码如下：

```vue
<template>
  <div :class="classes">绑定多个 class</div>
</template>

<script>
export default {
  data () {
    return {
      classes: 'xxx yyy zzz'
    }
  }
}
</script>
```

结果渲染如下图：

![vue-class-2](./imgs/class-2.png)

此外，绑定的表达式也可以复杂一点，只要表达式计算结果是字符串即可：

```vue
<template>
  <button :class="type && `button-${type}`">按钮</button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
```

在页面中使用按钮组件后结果渲染如下图：

![vue-class-3](./imgs/class-3.png)

**`v-bind:class` 指令可以与普通的 class attribute 共存**，有如下模板：

```vue
<template>
  <button class="button" :class="type && `button-${type}`">按钮</button>
</template>
```

结果渲染如下图：

![vue-class-4](./imgs/class-4.png)

### 对象语法

绑定 class 时，也可以**传给 `v-bind:class` 一个对象，以动态地切换 class**：

```vue
<template>
  <div :class="{ active: isActive }" />
</template>
```

在上述代码中，`active` class 是否存在取决于数据 property `isActive` 值的真假。比如，当 `isActive` 值为真时，结果渲染如下图：

![vue-class-5](./imgs/class-5.png)

同时，也可以在对象中传入更多的字段来**动态**切换多个 class。而且，绑定 class 的对象语法也可以和普通的 class attribute 共存。比如，有如下模板：

```vue
<template>
  <div class="demo" :class="{ active: isActive, disabled: isDisabled, loading: isLoading }" />
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      isDisabled: false,
      isLoading: true
    }
  }
}
</script>
```

最终渲染结果如下图：

![vue-class-object-6](./imgs/class-6.png)

当数据对象中 `isActive`、`isDisabled`、`isLoading` 有变化时，class 列表会动态更新，当有如下修改时：

```vue
<script>
export default {
  data () {
    return {
      isActive: false,
      isDisabled: true,
      isLoading: false
    }
  }
}
</script>
```

class 列表将变成下图：

![vue-class-object-2](./imgs/class-7.png)

在使用对象语法时，也可不必将对象内联在模板里：

```vue
<template>
  <div class="demo" :class="classObject" />
</template>

<script>
export default {
  data () {
    return {
      classObject: {
        active: true,
        disabled: false,
        loading: true
      }
    }
  }
}
</script>
```

在页面上渲染结果如下图：

![vue-class-object-6](./imgs/class-6.png)

在 `v-bind:class` 中也可以绑定一个返回对象的计算属性，这是一种更常用且强大的模式：

```vue
<template>
  <div class="demo" :class="classObject" />
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      isDisabled: false,
      isLoading: true
    }
  },
  computed: {
    classObject () {
      const { isActive, isDisabled, isLoading } = this
      return {
        active: isActive,
        disabled: isDisabled,
        loading: isLoading
      }
    }
  }
}
</script>
```

#### 数组语法

在绑定 class 时，也可以**传一个数组给 `v-bind:class`，以应用一个 class 列表**：

```vue
<template>
  <div class="demo" :class="[activeClass, loadingClass]" />
</template>

<script>
export default {
  data () {
    return {
      activeClass: 'active',
      loadingClass: 'loading'
    }
  }
}
</script>
```

最终结果渲染如下图：

![vue-class-8](./imgs/class-8.png)

如果要在数组语法中根据条件切换不同的 class，可以使用三元表达式：

```vue
<template>
  <div class="demo" :class="[isActive ? 'active' : '']" />
</template>
```

此时，`active` class 是否存在取决于数据 property `isActive` 值的真假。此外，也可以在数组语法中使用字符串语法、对象语法，而且配合返回一个数组的计算属性使用是更强大的模式：

```vue
<template>
  <button class="demo" :class="classList">按钮</button>
</template>

<script>
const prefixClass = 'w-button-'

export default {
  name: 'WButton',
  props: {
    iconPosition: {
      type: String,
      validator (value) {
        return oneof(value, ['left', 'right'])
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { iconPosition, loading } = this
      return [
        iconPosition && `${prefixClass}icon-${iconPosition}`,
        { [`${prefixClass}loading`]: loading }
      ]
    }
  }
}
</script>
```

#### 用在组件上

**当在自定义组件上使用 class 时（不管是否使用 `v-bind` 绑定），这些 class 会被添加到组件的根元素上。同时，这个根元素上已经存在的 class 不会被覆盖**。比如，有如下自定义组件：

```vue
<template>
  <div class="xxx">自定义组件</div>
</template>

<script>
export default {
  name: 'MyComponent'
  // ...
}
</script>
```

在使用组件时，添加 class：

```vue
<my-component class="xxx" :class="[{active: isActive}, 'yyy']" />
```

如果 `isActive` 的值为真，那么结果渲染如下图：

![vue-class-9](./imgs/class-9.png)

### 绑定 Style

#### 字符串语法

`v-bind:style` 绑定的表达式计算结果可以是字符串，用以在元素上添加内联样式。同时，`v-bind:style` 可以和普通的 style attribute 共存，有如下模板：

```vue
<template>
  <div style="background: yellowgreen" :style="styleString">绑定 Style</div>
</template>

<script>
export default {
  data () {
    return {
      // 字符串语法拼接麻烦且容易出错
      styleString: 'color: red; font-size: 20px;'
    }
  }
}
</script>
```

结果渲染如下图：

![vue-style-1](./imgs/style-1.png)

#### 对象语法

绑定 style 时，可以传给 `v-bind:style` 一个对象，用以添加内联样式。在这个对象中，CSS property 名可以使用驼峰式或者短横线分隔（用引号括起来）来命名，有如下模板：

```vue
<template>
  <div style="color: red;" :style="{ fontSize: fontSize }">绑定 Style</div>
  <!-- <div style="color: red;" :style="{ 'font-size': fontSize }">绑定 Style</div> -->
</template>

<script>
export default {
  data () {
    return {
      fontSize: '22px'
    }
  }
}
</script>
```

结果渲染如下图：

![vue-style-2](./imgs/style-2.png)

此外，对象不必内联到模板中，直接绑定一个样式对象是更好的选择，这会让模板更清晰：

```vue
<template>
  <div style="color: red;" :style="styleObject">绑定 Style</div>
</template>

<script>
export default {
  data () {
    return {
      styleObject: {
        fontSize: '22px'
      }
    }
  }
}
</script>
```

同样的，配合使用一个返回对象的计算属性是更常用且强大的模式。

#### 数组语法

绑定 style 时，也可以传一个数组，**数组中可以包含多个样式对象**：

```vue
<template>
  <div style="color: red;" :style="[baseStyle, spcialStyle]">绑定 Style</div>
</template>

<script>
export default {
  data () {
    return {
      baseStyle: {
        fontSize: '24px'
      },
      spcialStyle: {
        background: 'skyblue'
      }
    }
  }
}
</script>
```

结果渲染如下图：

![vue-style-3](./imgs/style-3.png)
