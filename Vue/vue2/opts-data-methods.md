# data & methods

### data

##### 是什么？

**`data` 是 Vue 实例的数据对象**。当把一个普通的 JS 对象传给 Vue 实例作为 `data` 对象时，Vue 会遍历该对象所有的 property，并使用 `Object.defineProperty` 把这些 property 全部转为 `getter/setter`，从而让 `data` 的 property 能够响应数据变化。

```javascript
const person = {
  name: 'dp',
  age: 18
}
const vm = new Vue({
  data: person
})
```

例如，当把 `person` 对象作为数据对象传递给 Vue 实例后，`name` 和 `age` property 便会被加入到 Vue 的响应式系统中。当它们的值发生改变时，视图也会随之产生“响应”，即重新渲染并匹配更新为最新的值。

##### 怎么使用？

`data` 根据使用场景的不同有两种使用方式，但它的值始终应该是一个对象。

1. 当在 `new Vue` 创建的根 Vue 实例中使用时，`data` 可以是对象或函数。

   ```javascript
   new Vue({
     // 对象
     data: {
       count: 0,
       visible: false
     }
     // 或函数
     data () {
       return {
         message: 'data object'
       }
     }
   })
   ```

2. 当在组件或 `Vue.extend()` 中使用时，`data` 必须是一个返回初始数据对象的函数。

   ```javascript
   // 组件中
   export default {
     data () {
       return {
         total: 0,
         list: []
       }
     }
   }
   Vue.component('demo-component', {
     data () {
       return {
         total: 0,
         list: []
       }
     }
   })
   
   // Vue.extend()
   const demoComponent = Vue.extend({
     data () {
       return {
         visible: true
       }
     }
   })
   ```

这就引申出一个问题：为什么在 Vue 组件中的 `data` 必须是函数，而在根实例中 `data` 可以是对象呢？原因在于：

1. Vue 组件可能会被复用，用来创建多个实例。每个实例都会对传入的数据对象进行初始化，并对其是否为函数进行判断：

   ```typescript
   // src/core/instance/state.ts
   function initData(vm: Component) {
     let data: any = vm.$options.data
     data = vm._data = isFunction(data) ? getData(data, vm) : data || {}
     // ...
   }
   ```

   - 如果是函数，会调用 `getData` 函数返回一个全新副本数据对象，这样每个实例的数据对象都是互相独立的，从而避免产生数据污染。
   - 如果是对象，则直接使用传入的数据对象，那多个实例之间将会共享引用该数据对象。当某个实例的属性的值发生变化时，其它实例的该属性的值也会随之改变，这样会产生数据污染。

2. 在 Vue 应用中由 `new Vue` 创建的根实例只能有一个，因此 `data` 是一个对象也不会产生数据污染。

##### 探究 data 初始化过程

Vue 实例在被创建时会经历一些初始化过程。其中，Vue 会在 `initState` 函数中对数据对象进行初始化：

```typescript
// src/core/instance/state.ts
export function initState(vm: Component) {
  // ...
  // 对 data 进行初始化
  if (opts.data) {
    initData(vm)
  } else {
    const ob = observe((vm._data = {}))
    ob && ob.vmCount++
  }
  // ...
}
```

`initData` 函数：

```typescript
// src/core/instance/state.ts
function initData(vm: Component) {
  // 判断传入的数据对象是否为函数，并生成相应的返回值
  let data: any = vm.$options.data
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {}
  const keys = Object.keys(data)
  // 判断是否是纯粹的对象
  if (!isPlainObject(data)) {
    data = {}
    __DEV__ &&
      warn(
        'data functions should return an object:\n' +
          'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      )
  }
  // 遍历 data 中的 property
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (__DEV__) {
      // 判断是否和 methods 中的方法名重名
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm)
      }
    }
    // 判断是否和 props 中的属性名重复
    if (props && hasOwn(props, key)) {
      __DEV__ &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        )
      // 过滤掉以 _ 和 $ 开头的 key
    } else if (!isReserved(key)) {
      // 将 data 中的 property 代理到实例上
      proxy(vm, `_data`, key)
    }
  }
  // 将 data 变成可观察的
  const ob = observe(data)
  ob && ob.vmCount++
}
```

`initData` 函数主要完成了以下事项：

1. 根据传入的 `data` 选项是否为函数生成对应的值——一个对象，并将该对象赋值给 `vm._data` 和变量 `data`。

2. 遍历变量 `data` 的所有 property，调用 `proxy` 函数将不以 `_` 或 `$` 开头的属性代理到实例 `vm` 上。

   ```typescript
   // src/core/instance/state.ts
   export function proxy(target: Object, sourceKey: string, key: string) {
     sharedPropertyDefinition.get = function proxyGetter() {
       return this[sourceKey][key]
     }
     sharedPropertyDefinition.set = function proxySetter(val) {
       this[sourceKey][key] = val
     }
     Object.defineProperty(target, key, sharedPropertyDefinition)
   }
   ```

   `proxy` 函数通过 `Object.defineProperty` 把对 `vm.age` 的读写转为对 `vm._data.age` 的读写。因此访问 `vm.age` 等价于访问 `vm_data.age`。

3. 调用 `observe` 函数给变量 `data` 创建一个 `Observe` 实例。这能让 Vue 能够追踪依赖，并在 property 被访问和修改时通知变更。

   ```typescript
   // src/core/observer/index.ts
   export function observe(
     value: any,
     shallow?: boolean,
     ssrMockReactivity?: boolean
   ): Observer | void {
     // ...
     let ob: Observer | void
     // ...
     return ob
   }
   ```

   `Observe` 类：
   
   ```typescript
   export class Observer {
     dep: Dep
     vmCount: number // number of vms that have this object as root $data
   
     constructor(public value: any, public shallow = false, public mock = false) {
       // this.value = value
       this.dep = mock ? mockDep : new Dep()
       this.vmCount = 0
       def(value, '__ob__', this)
       if (isArray(value)) {
         if (!mock) {
           if (hasProto) {
             /* eslint-disable no-proto */
             ;(value as any).__proto__ = arrayMethods
             /* eslint-enable no-proto */
           } else {
             for (let i = 0, l = arrayKeys.length; i < l; i++) {
               const key = arrayKeys[i]
               def(value, key, arrayMethods[key])
             }
           }
         }
         if (!shallow) {
           this.observeArray(value)
         }
       } else {
         /**
          * Walk through all properties and convert them into
          * getter/setters. This method should only be called when
          * value type is Object.
          */
         const keys = Object.keys(value)
         for (let i = 0; i < keys.length; i++) {
           const key = keys[i]
           defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock)
         }
       }
     }
   
     /**
      * Observe a list of Array items.
      */
     observeArray(value: any[]) {
       for (let i = 0, l = value.length; i < l; i++) {
         observe(value[i], false, this.mock)
       }
     }
   }
   ```
   
   判断传入的数据对象是否为数组：
   
   - 如果是数组，则调用 `def` 函数为每一项都绑定数组方法。
   
   - 如果是对象，则调用 `defineReactive` 函数通过 `Object.defineProperty` 为每个属性添加 `getter/setter`。这就要求必须预先知道要拦截的对象属性是什么，否则便无法拦截。因此在实例创建后添加的 property 便不是响应式的。
   
     ```javascript
     const vm = new Vue({
       el: '#app',
       data: {
         a: 1
       }
     })
     // 给实例添加 b property
     vm.b = 2
     
     // 更改 b
     vm.b = 100 // 视图不会更新
     ```
   
     如果在晚些时候需要一个 property，但一开始它为空或不存在，那么可以为它设置初始值。例如：
   
     ```javascript
     new Vue({
       el: '#app',
       data: {
         title: '',
         visible: false,
         total: 0,
         list: [],
         selectedItem: null
       }
     })
     ```

### methods

##### 是什么？

`methods` 是一个包含了 Vue 实例所有方法的对象，其作用是用于声明要混入到组件实例中的方法。这些方法可以是事件处理函数、请求数据的函数或其它的功能性函数。

##### 怎么使用？

`methods` 的类型为 `{ [key: string]: Function }`。例如，声明一个 `plusOne` 方法：

```javascript
const	vm = new Vue({
  template: '<button @click="plusOne">click</button>',
  data: { n: 1 },
  methods: {
    plusOne () {
      this.n++
    }
  }
})
```

这样
