# 计算属性和侦听器

### computed

**`computed` 是计算属性，它会基于所依赖的响应式 property 动态显示最新的计算结果；计算属性的结果会被缓存，只有其依赖的响应式 property 有变化才会重新计算**。尽管计算属性形式上是方法，但它最终会被混入到 Vue 实例中作为 property 使用，所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例，用法示例如下：

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
        this.n = value - 1
      }
    }
  }
})
vm.nDouble // 2
vm.nPlus // 3
vm.nPlus = 5
vm.n = 4
```

`computed` 常用的使用场景——要使用的属性会受到数据对象中某些 property 的变化的影响：

#### 展示用户信息

某个页面需要按照昵称、手机、邮件的顺序展示用户信息。如果昵称不存在就展示手机；如果昵称和手机都不存在就展示邮件。同时，有很多地方都需要像这样展示用户信息：

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

通过上面代码就可以实现按照既定顺序展示用户信息的需求，但是如果业务变更，用户信息的展示顺序变为手机、昵称、邮件，那么很多地方都需要修改代码来满足需求变更。这种场景下，可以使用 `computed`：

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
      const { user } = this
      return user.phone || user.nickname || user.email
    }
  }
})
</script>
```

这里声明了一个计算属性 `displayUser`，可以像使用普通 property 一样在模板中使用该计算属性。在使用它时，Vue 知道计算属性 `displayUser` 依赖于 `user` property，当 `user` property 发生改变时（比如，用户信息改变、用户信息的展示顺序改变），所有在模板中使用计算属性 `displayUser` 的地方都会自动更新。

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
    <li v-for="u in users" :key="u.id">
      {{ u.nickname }} - {{ u.gender }}
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

要实现的需求是，当点击全部按钮时，展示所有的用户昵称及其性别；当点击男按钮时，展示性别为男的用户昵称；当点击女按钮时，展示性别为女的用户昵称。

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
      if (this.gender === 'all') {
        return this.users
      } else {
        return this.users.filter(user => user.gender === genderHash[this.gender])
      }
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

通过上面两个场景示例对计算属性地使用有了更多认识——**计算属性可以让模板更简洁、逻辑更清晰、代码更易于维护**。