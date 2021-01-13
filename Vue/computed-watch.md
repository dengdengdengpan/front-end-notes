# 计算属性和侦听器

### computed

**`computed` 是计算属性，它会基于所依赖的响应式 property 动态显示最新的计算结果；计算属性的结果会被缓存，只有其依赖的响应式 property 有变化才会重新计算**。尽管计算属性的写法在形式上是方法，但它最终会被混入到 Vue 实例中当作 property 使用，所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例，用法示例如下：

```javascript
const vm = new Vue({
  data: {
    n: 1
  },
  computed: {
    // 用法一：仅读取，计算属性的 getter
    nDouble () {
      // this 指向当前实例 vm
      return this.n * 2
    },
    // 用法二：读取和设置，计算属性的 getter 和 setter
    nPlus: {
      // getter
      get () {
        return this.n + 1
      },
      // setter
      set (value) {
        // this 指向当前实例 vm
        this.n = value - 1
      }
    }
  }
})
console.log(vm.nDouble) // 2
vm.nPlus = 5 
console.log(vm.n) // n => 4
console.log(vm.nPlus) // 5
console.log(vm.nDouble) // 8
```

`computed` 常用的使用场景——要使用的属性会受到数据对象中某些 property 的变化的影响：

#### 展示用户信息

页面某个地方需要按照昵称、手机、邮件的顺序展示用户信息，如果昵称不存在就展示手机；如果昵称和手机都不存在就展示邮件。同时，有很多地方都需要像这样展示用户信息：

```html
<div id="app">
  <!-- 很多地方都需要这样展示用户信息 -->
  <p>用户信息：{{ user.nickname || user.phone || user.email }}</p>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    user: {
      nickname: '路飞',
      phone: '13389896666',
      email: 'lufei@qq.com'
    }
  }
})
</script>
```

通过上面代码就可以实现按照既定顺序展示用户信息的需求，但是有天如果业务变更，用户信息的展示顺序变为手机、昵称、邮件，那么很多地方都需要修改代码来满足需求变更。这种场景下，可以使用 `computed`：

```html
<div id="app">
  <!-- 使用计算属性展示用户信息 -->
  <p>用户信息：{{ displayUser }}</p>
</div>
<script>
new Vue({
  // ...
  computed: {
    displayUser () {
      const { user: { phone, nickname, email } } = this
      return phone || nickname || email
    }
  }
})
</script>
```

这里声明了一个计算属性 `displayUser`，可以像使用普通 property 一样在模板中使用该计算属性。在使用它时，Vue 知道计算属性 `displayUser` 依赖于 `user` property，当 `user` property 发生改变时（比如，用户信息改变、用户信息的展示顺序改变），所有在模板中使用计算属性 `displayUser` 的地方都会自动更新。

如果页面还有一个修改手机号的按钮，当点击它时就重新设置用户手机号，可以将上面的计算属性改写为：

```javascript
new Vue({
  // ...
  computed: {
    displayUser: {
      get () {
        const { user: { phone, nickname, email } } = this
        return phone || nickname || email
      },
      set (value) {
        this.user.phone = value
      } 
    }
  },
  methods: {
    setPhone () {
      this.displayUser = '15133339999'
    }
  }
})
```

这样在点击修改手机按钮时，计算属性 `displayUser` 的 `setter` 会被调用，进而更新 `user.phone` property 的值。           

#### 根据性别切换用户列表

在页面中有一个展示用户昵称和性别的列表，代码如下：

```html
<div id="app">
  <div>
    <button>全部</button>
    <button>男</button>
    <button>女</button>
  </div>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.nickname }} - {{ user.gender }}
    </li>
  </ul>
</div>
<script>
// 创建用户
let id = 0
const createUser = (nickname, gender) => {
  id += 1
  return { id, nickname: nickname, gender: gender }
}

new Vue({
  el: '#app',
  data: {
    users: [
      createUser('路飞', '男'),
      createUser('娜美', '女'),
      createUser('索隆', '男'),
      createUser('山治', '男'),
      createUser('罗宾', '女')
    ]
  }
})
</script>
```

效果如下图所示：

![用户列表](./imgs/computed-1.png)

要实现的需求是，当点击全部按钮时，展示所有的用户；当点击男按钮时，展示性别为男的用户；当点击女按钮时，展示性别为女的用户。

实现思路，页面用户列表的数据源更改为计算属性 `displayUsers`，它根据 `gender` property 的变化展示不同性别的用户：

```html
<div id="app">
  <div>
    <!-- 给切换按钮添加事件 -->
    <button @click="setGender('all')">全部</button>
    <button @click="setGender('male')">男</button>
    <button @click="setGender('female')">女</button>
  </div>
  <ul>
    <!-- 页面用户列表的数据源改为计算属性 displayUsers -->
    <li v-for="u in displayUsers" :key="u.id">
      {{ u.nickname }} - {{ u.gender }}
    </li>
  </ul>
</div>
<script>
// ...
new Vue({
  el: '#app',
  data: {
    // ...
    gender: 'all'
  },
  computed: {
    displayUsers () {
      const genderHash = {
        male: '男',
        female: '女'
      }
      const { users, gender } = this
      return gender === 'all' ? users : users.filter(user => user.gender === genderHash[gender])
    }
  },
  methods: {
    setGender (genderString) {
      this.gender = genderString
    }
  }
})
</script>
```

最终实现效果：

![使用计算属性实现切换用户列表](./imgs/computed-2.gif)

通过上面两个场景示例对计算属性的使用有了更多认识——**计算属性可以让模板更简洁、逻辑更清晰、代码更易于维护**。

#### 计算属性 vs 方法

在根据性别切换用户列表这个场景示例中，也可以使用方法来达到相同效果。实现思路，首先用户列表的数据源 `users` property 不能被修改，所以新增一个 `displayUsers` property，并在 `created` 钩子中将 `users` 赋值给 `displayUsers`，同时添加一个根据性别展示不同用户的方法 `showUsers`：

```javascript
// ...
new Vue({
  // ...
  data: {
    // 新增 displayUsers
    displayUsers: []
  },
  created () {
    // 在 created 钩子赋值
    this.displayUsers = this.users
  },
  methods: {
    // 新增 showUsers 方法
    showUsers (gender) {
      const genderHash = {
        male: '男',
        female: '女'
      }
      const { users } = this
      this.displayUsers = gender === 'all' ? users : users.filter(user => user.gender === genderHash[gender])
    },
    setGender (gender) {
      this.showUsers(gender)
    }
  }
})
```

使用方法和计算属性都能实现需求，但不同的是**计算属性可以基于它们的响应式依赖进行缓存，只有在相关依赖发生改变时才会重新计算；而调用方法则总是会重新执行函数**。

- 通过方法实现时，在 `showUsers` 方法中添加一个 log：

  ```javascript
  new Vue({
    methods: {
      showUsers (gender) {
        console.log('showUsers 方法被调用了')
        // ...
      }
    }
  })
  ```

  当点击按钮时：

  ![methods-log](./imgs/methods-log.gif)

  **方法总是会重新执行，没有缓存结果**。无论是点击不同按钮还是连续点击相同按钮，`showUsers` 方法都会被重新调用。

- 通过计算属性实现时，在计算属性 `displayUsers` 中添加一个 log：

  ```javascript
  new Vue({
    // ...
    computed: {
      displayUsers () {
        const genderHash = {
          all: '全部',
          male: '男',
          female: '女'
        }
        // ...
        console.log(`displayUsers 计算了 ${genderHash[gender]} 一次`)
        // ...
      }
    }
  })
  ```

  当点击按钮时：

  ![computed-log](./imgs/computed-log.gif)

  **计算属性 `displayUsers` 会根据依赖的 `gender` property 进行计算，并且会缓存计算结果**。当点击不同按钮时，`gender` 发生了改变，`displayUsers` 会马上重新求值；当连续点击相同按钮时，`gender` 没有发生改变，`displayUsers` 会立即返回之前的计算结果，而不会重新求值。

  需要缓存的好处在于，如果有一个场景需要进行大量计算，页面开销性能较大，使用计算属性则可以利用缓存减少页面开销；使用方法会每次都重新计算，可能会影响用户体验。

### watch

**`watch` 是侦听器，可以通过 `watch` 观察数据对象中 property 值的变化进而执行一些操作，`watch` 是一个异步的过程**。`watch` 的使用方法有以下几种：

```javascript
new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    user: {
      nickname: '路飞',
      age: 18
    }
  },
  // 需被观察的 data 中的 property 作为 watch 的 key
  // value 是对应的回调函数，表现形式可以是函数、方法名、包含选项的对象、包含回调的数组
  watch: {
    //第一种，值为函数
    a (newValue, oldValue) {
      console.log(`from: ${oldValue}, to: ${newValue}`)
    },
    // 第二种，值为方法名
    b: 'methodName',
    // 第三种，值为包含选项的对象，选项有：deep和immediate，回调函数是 handler
    c: {
      handler (newValue, oldValue) {},
      // deep: true 表示被 watch 的 property 发生改变时都会调用 handler 回调，不论其被嵌套多深
      deep: true 
    },
    d: {
      handler: 'methodName',
      // watch 中一开始时 handler 回调并不会执行，只有在 d property 改变时才会调用回调
      // 设置 immediate: true 则 handler 回调会在一开始就被调用
      immediate: true
    },
    // 第四种，值为一个包含回调数组，它们会被逐一调用
    e: [
      function handler1(newValue, oldValue) {},
      'handler2',
      {
        hanlder (newValue, oldValue) {},
        // 选项
      }
    ],
    // key 还可以是嵌套在对象中的某个 property
    'user.nickname' (newValue, oldValue) {}
  }
})
```

值得注意的是，**不应在 `watch` 使用箭头函数**。

#### 何谓数据变化

`watch` 会在观察的 property 的值发生变化时作出响应，接下来了解一下 property 值的变化：

```html
<div id="app">
  <button @click="n += 1">按钮1（n + 1）</button>
  <button @click="visible = !visible">按钮2（!visible）</button>
  <button @click="user = { nickname: '路飞' }">按钮3（user = 新对象）</button>
  <button @click="user.nickname = '娜美'">按钮4（nickname = '娜美'）</button>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    n: 1,
    visible: false,
    user: {
      nickname: '路飞'
    }
  },
  watch: {
    n () {
      console.log('n 变了')
    },
    visible () {
      console.log('visible 变了')
    },
    user () {
      console.log('user 变了')
    },
    'user.nickname' () {
      console.log('user.nickname 变了')
    }
  }
})
</script>
```

点击上面代码中不同按钮时会修改数据对象中某些 property 的值，而 `watch` 会在监听到这些 property 值的变化时在控制台打印出以下内容：

![watch-1](./imgs/watch-1.png)

嘻嘻嘻

对于像 `n`、`visible` 这种属于基本类型的 property，只要它们的值改变，就会被 `watch` 监听。

对于 `user` 这种属于复杂类型的 property，只有当其引用值的地址发生改变才会被 `watch` 监听。所以点击第三个按钮执行 `user = { nickname: '路飞' }` 时，`user` 引用值的地址发生了改变，

