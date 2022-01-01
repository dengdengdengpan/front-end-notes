# 表单输入绑定

表单输入是**双向数据绑定**中比较常见的应用场景，“双向”意味着用户操作视图发生改变时，其绑定的数据也随之改变，反之数据的变化也会导致视图发生相应变化。因此在表单交互较多的场景下，使用双向数据绑定可以省去监听每个表单数据变化的事件代码，从而达到简化代码专注于业务逻辑的目的。而 Vue 提供了 `v-model` 指令用于在**表单控件**（`input`、`textarea`、 `select`）和**组件**上创建双向数据绑定。

### 表单控件

当 `v-model` 指令用在表单控件上时，它会根据控件类型自动选取正确的方法来更新元素。这是由于 `v-model` 会在内部为不同的输入元素绑定不同的 property 并抛出不同的事件：

- `<input type="text">` 和 `<textarea>` 使用 `value` property 和 `input` 事件。
- `<input type="checkbox">` 和 `<input type="radio">` 使用 `checked` property 和 `change` 事件。
- `<select>` 使用 `value` property 和 `change` 事件。

以下是 `v-model` 在表单控件上的用法示例。

##### 文本

```vue
<template>
  <div>
    <input v-model="message" >
    <button @click="message = '落霞与孤鹜齐飞'">修改 message</button>
    <p>message: {{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  }
}
</script>
```

视图发生变化自动更新数据；数据发生变化时也会自动更新视图：

![v-model-text](./imgs/v-model-text.gif)

##### 多行文本

```vue
<template>
  <div>
    <textarea v-model="comment"></textarea>
    <br>
    <button @click="comment = '秋水共长天一色'">修改 comment</button>
    <p>comment: {{ comment }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comment: ''
    }
  }
}
</script>
```

结果：

![v-model-textarea](./imgs/v-model-textarea.gif)

另外需要注意的是，在 `textarea` 元素中使用插值 `<textarea>{{ comment }}</textarea>` 不会生效。

##### 复选框

- 单个复选框，默认绑定到**布尔值**，不用添加 `value` property：

  ```vue
  <template>
    <div>
      <input v-model="checked" type="checkbox" id="single-checkbox">
      <label for="single-checkbox">{{ checked }}</label>
      <br>
      <button @click="checked = !checked">toggle</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        checked: false
      }
    }
  }
  </script>
  ```

  结果：

  ![v-model-checkbox-single](./imgs/v-model-checkbox-single.gif)

- 多个复选框，绑定到**同一个数组**，需要添加 `value` property：

  ```vue
  <template>
    <div>
      <input v-model="checkedFruits" type="checkbox" value="apple" id="apple">
      <label for="apple">苹果</label>
      <input v-model="checkedFruits" type="checkbox" value="banana" id="banana">
      <label for="banana">香蕉</label>
      <input v-model="checkedFruits" type="checkbox" value="watermelon" id="watermelon">
      <label for="watermelon">西瓜</label>
      <input v-model="checkedFruits" type="checkbox" value="grape" id="grape">
      <label for="grape">葡萄</label>
      <p>checkedFruits: {{ checkedFruits }}</p>                         
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        checkedFruits: []
      }
    }
  }
  </script>
  ```

  结果：

  ![v-model-checkbox-multiple](./imgs/v-model-checkbox-multiple.gif)

  如果复选框没有 `value` property，那么在 Vue 2 中选择复选框时会得到 `null` 值。比如，将苹果复选框的 `value` 去掉后再选择它：

  ![v-model-checkbox-no-value](./imgs/v-model-checkbox-no-value.png)
  
##### 单选按钮

需要在单选按钮中添加 `value` property：

  ```vue
  <template>
    <div>
      <input v-model="favouriteFruit" type="radio" value="apple" id="apple">
      <label for="apple">苹果</label>
      <input v-model="favouriteFruit" type="radio" value="banana" id="banana">
      <label for="banana">香蕉</label>
      <input v-model="favouriteFruit" type="radio" value="watermelon" id="watermelon">
      <label for="watermelon">西瓜</label>
      <input v-model="favouriteFruit" type="radio" value="grape" id="grape">
      <label for="grape">葡萄</label>
      <p>favouriteFruit: {{ favouriteFruit }}</p>
      <button @click="favouriteFruit = 'watermelon'">我最爱吃</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        favouriteFruit: ''
      }
    }
  }
  </script>
  ```

  结果：

  ![v-model-radio](./imgs/v-model-radio.gif)

##### 选择框

- 单选时：

  ```vue
  <template>
    <div>
      <label for="favouriteFruit">最爱吃的水果：</label>
      <select v-model="favouriteFruit" id="favouriteFruit">
        <option value="apple">苹果</option>
        <option value="banana">香蕉</option>
        <option value="watermelon">西瓜</option>
        <option value="grape">葡萄</option>
      </select>
      <p>favouriteFruit: {{ favouriteFruit }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        favouriteFruit: ''
      }
    }
  }
  </script>
  ```

  结果：

  ![v-model-select-single](./imgs/v-model-select-single.gif)

- 多选时，绑定到一个数组：

  ```vue
  <template>
    <div>
      <label for="fruits">爱吃的水果：</label>
      <select v-model="fruitList" multiple id="fruits">
        <option value="apple">苹果</option>
        <option value="banana">香蕉</option>
        <option value="watermelon">西瓜</option>
        <option value="grape">葡萄</option>
      </select>
      <p>fruitList: {{ fruitList }}</p>
      <button @click="fruitList = ['apple', 'watermelon']">我爱吃</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        fruitList: []
      }
    }
  }
  </script>
  ```
  
  结果：
  
  ![v-model-select-multiple](./imgs/v-model-select-multiple.gif)
  

另外还可以使用 `v-for` 指令渲染动态 `<option>`：

```vue
<template>
  <div>
    <label for="favouriteFruit">最爱吃的水果：</label>
    <select v-model="favouriteFruit" id="favouriteFruit">
      <option v-for="fruit in fruits" :key="fruit.value" :value="fruit.value">{{ fruit.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fruits: [
        { name: '苹果', value: 'apple' },
        { name: '香蕉', value: 'banana' },
        { name: '西瓜', value: 'watermelon' },
        { name: '葡萄', value: 'grape' }
      ]
    }
  }
}
</script>
```

##### 注意项

1.  `v-model` 指令会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值，而总是将 Vue 实例的数据作为数据来源。

   ```vue
   <template>
     <div>
       <label for="text">文本</label>
       <input v-model="message" value="yyy" id="text">
       <br>
       <input v-model="toggle" type="checkbox" checked id="checkbox">
       <label for="checkbox">复选框</label>
       <br>
       <input v-model="status" type="radio" value="on" checked id="on">
       <label for="on">开</label>
       <input v-model="status" type="radio" value="off" id="off">
       <label for="off">关</label>
       <br>
       <select v-model="selectedItem">
         <option value="a" selected>A</option>
         <option value="b">B</option>
       </select>
     </div>
   </template>
   
   <script>
   export default {
     data () {
       return {
         message: 'xxx',
         toggle: false,
         status: 'off',
         selectedItem: 'b'
       }
     }
   }
   </script>
   ```

   结果：

   ![v-model-initial](./imgs/v-model-initial.png)

2. 对于需要使用输入法（中文等）的语言，`v-model` 不会在输入法组合过程中得到更新。

   ```vue
   <input v-model="message" type="text">
   <p>message: {{ message }}</p>
   ```

   结果：

   ![v-model-type](./imgs/v-model-type.gif)

   可以看到在输入法组合文字的过程中，通过 `v-model` 绑定的 `message` property 不会自动更新。如果想处理这一过程，需要使用 `input` 事件。

   ```vue
   <input v-model="message" type="text" @input="handleInput">
   
   <script>
   export default {
     // ...
     methods: {
       handleInput (event) {
         this.message = event.target.value
       }
     }
   }
   </script>
   ```

   结果：

   ![v-model-type-2](./imgs/v-model-type-2.gif)

### value 绑定

对于复选框、单选按钮和选择框的选项，`v-model` 绑定的值一般是静态字符串（单个复选框是布尔值）。而要想将值绑定到 data 中动态的 property 上，可以通过 `v-bind` 实现，并且该 property 的值可以不是字符串。

##### 复选框

- 单选时，如果不想绑定到布尔值，可以使用 `true-value` property 和 `false-value` property：

  ```vue
  <input v-model="toggle" type="checkbox" true-value="yes" false-value="no">
  <p>toggle: {{ toggle }}</p>
  ```

  结果：

  ![v-model-checkbox-single-2](./imgs/v-model-checkbox-single-2.gif)

  此时，当复选框被选中时 `toggle === 'yes'`；当没有选中时 `toggle === 'no'`。

- 多选时，可以使用 `v-bind` 将 `value` 绑定到一个动态的 property 上：

  ```vue
  <template>
    <div>
      <!-- value 绑定到 option 上 -->
      <input v-model="choose" type="checkbox" :value="option" id="one">
      <label for="one">选项一</label>
      <!-- value 绑定到一个对象上 -->
      <input v-model="choose" type="checkbox" :value="{ number: 10 }" id="two">
      <label for="two">选项二</label>
      <p>choose: {{ choose }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        option: 'aaa',
        choose: []
      }
    }
  }
  </script>
  ```

  当都被选中时：

  ![v-model-checkbox-multiple](./imgs/v-model-checkbox-multiple.png)

##### 单选按钮

```vue
<!-- value 绑定到一个对象的属性上 -->
<input v-model="picked" type="radio" :value="role.name">
```

当被选中时 `picked === role.name`。

##### 选择框的选项

```vue
<select v-model="selected">
  <option :value="{ role1: 'lf', role2: 'sl' }">海贼王</option>
  <option :value="{ role1: 'mr', role2: 'zz' }">火影</option>
</select>
```

当选中”火影“项时 `selected === { role1: 'mr', role2: 'zz' }`。

### 修饰符

##### `.lazy`

使用 `.lazy` 修饰符会将输入框中 `v-model` 绑定的值的更新从的 `input` 事件转换为 `change` 事件：

```vue
<!-- change 事件会在输入框失去焦点后才触发 -->
<input v-model.lazy="user1.username">
<p>使用 .lazy: {{ user1 }}</p>
<!-- input 事件会在输入框中的值发生变化时触发 -->
<input v-model="user2.username">
<p>未使用 .lazy: {{ user2 }}</p>
```

结果：

![v-model-lazy](./imgs/v-model-lazy.gif)

##### `.number`

使用 `.number` 修饰符通过 `parseFloat()` 函数可以自动将用户的输入值转为数值类型，如果无法被解析则返回输入的值：

```vue
<input v-model.number="user.password">
<p>使用 .number: {{ user }}</p>
```

结果：

![v-model-number](./imgs/v-model-number.gif)

##### `.trim`

使用 `.trim` 修饰符可以自动过滤用户输入的首尾空白字符：

```vue
<input v-model.trim="user1.username">
<p>使用 .trim: {{ user1 }}</p>
<input v-model="user2.username">
<p>未使用 .trim: {{ user2 }}</p>
```

结果：

![v-model-trim](./imgs/v-model-trim.gif)

### `v-model` 原理

当在文本输入框上使用 `v-model` 指令时：

```vue
<input v-model="message">
```

以上代码等价于：

```vue
<input
  v-bind:value="message"
  v-on:input="message = $event.target.value"
>
```

`v-model` 本质上是 `v-bind:value` 和 `v-on:input` 结合的语法糖：

- 通过 `v-bind` 绑定 `value` attribute 实现数据变化时输入框内容也随之变化。
- 通过 `v-on` 监听 `input` 事件实现输入内容改变时绑定的数据也随之改变。

### 在组件上使用 `v-model`

##### 自定义组件的 `v-model`

当在一个自定义的文本组件上使用 `v-model` 时：

```vue
<my-input v-model="message"></my-input>
```

以上代码等价于：

```vue
<my-input
  v-bind:value="message"
  v-on:input="message = $event"
>
</my-input>
```

要想让这个组件上的 `v-model` 指令起作用，根据 `v-model` 原理需要对该组件内的 `<input>` 做以下操作：

1. 将 `value` attribute 通过 `v-bind` 绑定到一个名为 `value` 的 prop 上。
2. 在 `input` 事件被触发时通过自定义的 `input` 事件将新的值抛出。

MyInput 组件：

```vue
<template>
  <input v-bind:value="value" v-on:input="onInput" class="my-input">
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    value: {
      type: String
    }
  },
  methods: {
    onInput (event) {
      const { target: { value } } = event 
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.my-input {
  caret-color: red;
}
</style>
```

引入并使用 MyInput 组件：

```vue
<template>
  <div>
    <my-input v-model="message" />
    <p>message: {{ message }}</p>
    <button type="button" @click="message = '落霞与孤鹜齐飞'">修改 message</button>
  </div>
</template>
```

这里 `message` 的值将会传给 `value` prop；同时当 MyInput 组件触发 `input` 事件时会将新的值抛出，此时 `message` property 会被更新：

![v-model-my-input](./imgs/v-model-my-input.gif)

##### `model`

默认情况下，一个组件上的 `v-model` 会把 `value` 用作 `prop` 并且会把 `input` 用作 event。但对于复选框、单选框这些表单控件，`value` 有其它作用——在提交表单时  `value` 和 `name` 会一起被提交到服务器。而使用 `model` 选项可以避免这些冲突，**`model` 选项允许自定义组件在使用 `v-model` 时定制 prop 和 event**。例如，创建一个 MyCheckbox 组件：

```vue
<template>
  <input :checked="checked" @change="onChange" type="checkbox" class="my-checkbox">
</template>

<script>
export default {
  name: 'MyCheckbox',
  // 定制 prop 和 event
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (event) {
      const { target: { checked } } = event
      this.$emit('change', checked)
    }
  }
}
</script>

<style scoped>
.my-checkbox {
  height: 16px;
  width: 16px;
  margin: 0;
  background-color: lightgray;
  color: white;
  cursor: pointer;
  appearance: none;
}

.my-checkbox:checked {
  background-color: #42b983;
}

.my-checkbox::after {
  content: "";
  display: none;
  position: relative;
  left: 32%;
  top: 10%;
  width: 25%;
  height: 50%;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.my-checkbox:checked::after {
  display: block;
}
</style>
```

引入 MyCheckbox 组件：

```vue
<template>
  <div>
    <my-checkbox v-model="choosed" />
    <p>choosed: {{ choosed }}</p>
    <button type="button" @click="choosed = !choosed">toggle</button>
  </div>
</template>
```

这里 `choosed` 的值将会传给名为 `checked` 的 prop；同时当 MyCheckbox 触发 `change` 事件时会抛出新的值，此时 `choosed` property 会被更新：

![v-model-my-checbox](./imgs/v-model-my-checbox.gif)

##### xxx
