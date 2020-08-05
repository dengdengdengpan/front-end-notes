# Class 与 Style 绑定

### 前言

在使用 Vue 开发组件的过程中，经常会有切换 class 来改变元素样式的需求，对此我们可以使用 `v-bind` 绑定 class 来实现。同时，Vue 在 `v-bind` 用于 class 和 style 时做了专门的增强，`v-bind` 表达式结果的类型除了字符串，还可以是对象或数组。

### 绑定 HTML Class

##### 对象语法

- 可以把一个对象传给  `v-bind:class`，用以动态地切换 class：

  ```vue
  <template>
     <div v-bind:class="{ active: isActive }"></div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        isActive: true
      }
    }
  }
  </script>
  ```

  上面 `active` 这个 class 是否存在取决于数据属性 `isActive` 的真值（在 JS 中，真值指的是在布尔值上下文中，转换后的值为真的值）

- 也可以在对象中传入更多的字段来动态切换多个 class。同时，`v-bind:class` 也可以和普通 class attribute 共存。比如有如下模板：

  ```vue
  <temlpate>
    <div 
      class="test" 
      :class="{ active: isActive, 'is-disabled': isDisabled }"
    >
    </div>
  </temlpate>
  
  <script>
  export default {
    data () {
      return {
        isActive: true,
        isDisabled: true
      }
    }
  }
  </script>
  ```

  最终渲染结果如下：

  ```html
  <div class="test active is-disabled"></div>
  ```

- class 绑定的对象可以放在 `data` 中：

  ```vue
  <template>
    <div class="test" :class="classObject"></div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        classObject: {
  				active: true,
          'is-disabled': true
        }
      }
    }
  }
  </script>
  ```

  这种方式的 class 绑定渲染结果和上面的一样

- class 绑定可以是一个返回对象的计算属性：

  ```vue
  <template>
    <button
      class="w-button"
      :class="classes"
    >  
    </button>
  </template>
  
  <script>
  const prefixClass = 'w-button-'
  export default {
    props: {
  		loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return {
          [`${prefixClass}loading`]: this.loading
        }
      }
    }
  }
  </script>
  ```


##### 数组语法

- 可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

  ```vue
  <template>
    <div class="test" :class="[ 'active', 'is-disabled' ]"></div>
  </template>
  ```

  渲染为：

  ```html
  <div class="test active is-disabled"></div>
  ```

- 可以根据条件切换数组中的 class：

  ```vue
  <template>
    <button :class="[ type && `w-button-${type}`, isActive ? 'active' : '' ]"></button>
  </template>
  ```

  在上述代码中，只有在 `type` 为真值的情况下才添加 `w-button-${type}` 这个类名；同理，`active` 这个类名也是要在 `isActive` 为真值时才添加

- 可以在数组中使用对象语法：

  ```vue
  <template>
    <button :class="[{ 'is-loading': loading }]"></button>
  </template>
  ```

##### 用在组件上

- 当在自定义组件上使用 class 绑定时，这些 class 会被添加到该组件的根元素上面，而这个根元素上已经存在的 class 不会被覆盖。比如，声明如下组件：

  ```vue
  <template>
    <div class="aaa bbb">
      <p>vue bind class</p>
    </div>
  </template>
  
  <script>
  export default {
  	name: 'myComponent'
  }
  </script>
  ```

  在使用这个自定义组件时添加一些 class：

  ```vue
  <my-component class="active"></my-component>
  ```

  HTML 最终渲染为：

  ```html
  <div class="aaa bbb active">
    <p>vue bind class</p>
  </div>
  ```

  对于自定义组件带数据绑定的 class 也同样适用：

  ```vue
  <my-component :class="[ isActive ? 'active': '' ]"></my-component>
  ```

  当 `isActive` 为真值的情况下，HTML渲染为：

  ```html
  <div class="aaa bbb active">
    <p>vue bind class</p>
  </div>
  ```

  



