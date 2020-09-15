# BOM - URL相关

### Location 对象

- `Location` 对象是浏览器提供的原生对象，它提供了 URL 相关的信息和操作方法。`Window`  和 `Document` 接口可以分别通过  `window.location` 和   `document.location` 来访问

 ##### Location 属性

- `Location.href`：整个 URL

  - 若 `Location.href` 写入新的 URL 地址，浏览器会立刻跳转到这个新地址

    ```javascript
    // 跳转新地址
    document.href = 'http://www.new.com'
    ```

  - 直接改写 `document.location` 相当于写入 `href` 属性

    ```javascript
    document.location = 'http://www.new.com'
    // 相当于
    document.href = 'http://www.new.com'
    ```

- `Location.protocol`：当前 URL 的协议，包括 `:`

- `Location.host`：域名 +  `:`  + 端口号（默认的80端口和443端口会省略）

- `Location.hostname`：域名

- `Location.port`：端口号

- `Location.pathname`：URL 路径部分，从根路径 `/` 开始

- `Location.search`：URL 查询部分，从 `?` 开始

- `Location.hash`：片段字符串部分，从 `# ` 开始

- `Location.username`：域名前面的用户名

- `Location.password`：域名前面的密码

- `Location.origin`：协议 + 域名 + 端口，该属性只读

`Location` 属性示例如下

```javascript
// 当前网址为
// https://user:pass123@www.example.com:8089/path/test.html?xxx=1$&yyy=2#part111

document.location.href // https://user:password@www.example.com:8089/path/test.html?xxx=1$&yyy=2#part111

document.location.protocol // https:

document.location.host // www.example.com:8089

document.location.hostname // www.example.com

document.location.port // 8089

document.location.pathname // /path/test.html

document.location.search // ?xxx=1&yyy=2

document.location.hash // #part111

document.location.username // user

document.location.password // pass123

document.location.origin // https://www.example.com:8089
```

##### Location 方法

- `location.assign()` --- 接受一个 URL 字符串为参数，使得浏览器立刻跳转到新的 URL

  - 若传入无效的 URL ，则会抛出 `SYNTAX_ERROR` 类型的错误

  - 若因为安全原因无法跳转，则会抛出 `SECURITY_ERROR` 类型的错误。比如，当调用此方法的脚本来源和页面的 `Location` 对象中定义的来源隶属于不同域的时候，就会抛出上述错误

  - 示例

    ```javascript
    // 跳转到新网址
    document.location.assign('http://www.new.com')
    ```

- `location.replace()` --- 接受一个 URL 字符串为参数，使得浏览器立刻跳转到新的 URL

  - 若传入无效的 URL ，则会抛出 `SYNTAX_ERROR` 类型的错误

  - 若因为安全原因无法跳转，则会抛出 `SECURITY_ERROR` 类型的错误

  - 该方法同  `assign`  不同之处在于  `replace` 会在浏览器的浏览历史 `history` 中删除当前 URL。一旦使用该方法，后退按钮就无法回到当前页面，相当于在 `history` 中用新的 URL 替换了老的 URL。`replace` 方法的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页

    ```javascript
    // 跳转到移动版页面
    document.location.replace('http://www.mobile.com')
    ```

- `location.reload()` --- 接受一个布尔值为可选参数，是的浏览器刷新当前页面

  - 若参数为 `false` 和 空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置

  - 若参数为 `true`，将强制浏览器从服务器重新获取当前页面资源，并且重新加载后，网页将滚动到头部

  - 示例

    ```javascript
    // 向服务器重新请求当前网址
    document.location.reload(true)
    
    // 从本地缓存加载当前页面
    document.location.reload()
    ```

    