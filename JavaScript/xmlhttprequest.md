# XMLHttpRequest

`XMLHttpRequest` 对象是 AJAX 的主要接口，用于浏览器和服务器之间的通信。

### 构造函数

在使用 `XMLHttpRequest` 对象实例的属性、方法、事件之前都需要先初始化它：

```javascript
const request = new XMLHttpRequest();
```

### 属性

##### readyState(只读)

`readyState` 属性返回一个整数，表示当前实例所处的状态，它可能返回以下值：

- 0 - UNSET：已创建 `XMLHttpRequest` 实例，但还未调用 `open()` 方法。
- 1 - OPENED：`open()` 方法已经调用，但还未调用 `send()` 方法。在这个状态下，可以通过 `setRequestHeader()` 方法设置请求头信息。
- 2 - HEADERS_RECEIVED：`send()` 方法已经被调用，并且已经接收到响应头信息。
- 3 - LOADING：正在接收服务器响应中的 body 部分。此时，如果 `responseType` 属性是 `text` 或空字符串，那么 `responseText` 属性会包含已经收到的部分信息。
- 4 - DONE：本次请求已经完成，这意味着服务器返回的数据已经完全接收或者完成失败。

每当实例的状态发生变化，`readyState` 属性的值都会改变，并会触发 `readyStateChange` 事件。

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com');
request.onreadystatechange = () => {
  console.log(request.readyState);
};
request.send();
```

##### response(只读)

`response` 属性返回服务器响应的 body 部分，它可以是任何类型的数据类型，比如二进制对象、字符串、对象等，具体的数据类型由 `responseType` 决定。

如果请求尚未完成或未成功，则 `response` 属性的值为 `null`。但如果 `responseType` 属性是 `text` 或空字符串，在 `readyState` 等于 3 的状态下——即请求尚未结束前，`response` 属性会包含服务器已经返回的部分数据。

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com');
request.onload = () => {
  const { readyState, status } = request;
  if (readyState === 4 && status === 200) {
    console.log(request.response);
  }
};
request.send();
```

##### responseText(只读)

`responseText` 属性返回从服务器接收到的文本数据，它只有在请求成功接收完数据后才会包含完整的数据。

##### responseXML(只读)

`responseXML` 属性返回从服务器接收到的 HTML 或 XML 文档对象。如果请求没有成功，或尚未发送，或接收到的数据不能被解析成 HTML 或 XML，则为 `null`。

要想获取正常的 `responseXML` 需要将服务器响应头中的 `Content-Type` 属性设置为 `text/xml` 或者`aplication/xml`，并在发送请求前，需要将 `responseType` 属性设置为 `document`。如果服务器未指明 `Content-Type` 为 `text/xml` 或 `application/xml`， 可以使用 `overrideMimeType()` 方法强制解析为 XML。

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com');
request.responseType = 'document';
// 服务器未指明 Content-Type 为 text/xml 或 application/xml
request.overrideMimeType('text/xml');
request.onload = () => {
  const { readyState, status } = request;
  if (readyState === 4 && status === 200) {
    console.log(request.responseXML);
  }
};
request.send();
```

##### responseURL(只读)

`responseURL` 属性返回发送数据的服务器的网址。如果网址中包含锚点，则该属性会将锚点移除；如果服务器端发生跳转，则该属性返回的是最后实际返回数据的网址。

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com/api/xxx#stpe1');
request.onload = () => {
  console.log(xhr.responseURL); // http://test.com/api/xxx
};
request.send();
```

##### responseType

`responseType` 属性是一个字符串，表示服务器返回数据的类型。`responseType` 是可写的，可以在 `open()` 方法之后、`send()` 方法之前设置它的值，用以告诉浏览器如何解析返回的数据。它可以采用以下值：

- `''`：空字符串等同于默认类型 `text`，表示服务器返回的是文本数据。
- `arraybuffer`：表示服务器返回的是包含二进制数组数据的 ArrayBuffer 对象。
- `blob`：表示服务器返回的是包含二进制数据的 Blob 对象。
- `document`：表示服务器返回的是一个 HTML 或 XML 文档对象。
- `json`：表示服务器返回的是 JSON 格式的数据，可以使用 `JSON.parse()` 方法解析。
- `text`：表示服务器返回的是文本数据。

示例一，设置为 `blob` 来处理获取到的图片：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/imgs/test.png');
request.responseType = 'blob';
request.onload = () => {
  const { status, response } = request;
  if (status === 200) {
    const blob = new Blob(response, { type: 'image/png' });
    console.log(blob);
  }
};
request.send();
```

示例二，设置为 `json` 来获取响应：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test/json');
request.responseType = 'json';
request.onload = () => {
  const { status, response } = request;
  if (status === 200) {
    console.log(JSON.parse(response));
  }
};
request.send();
```

##### status(只读)

`status` 属性返回一个整数，表示服务器响应的状态码。在请求完成前，或请求出错，`status` 属性的值都是 0。如果请求成功或服务器没有返回状态码，`status` 属性的值都是 200。常见的 HTTP 状态码如下：

- 200 - OK，请求成功。
- 301 - Moved Permanently，永久移动。
- 301 - Found，暂时移动。
- 304 - Not Modified，未修改。
- 400 - Bad Request，请求错误。
- 401 -  Unauthorized，未授权。
- 403 - Forbidden，禁止访问。
- 404 - Not Found，未发现请求资源。
- 500 - Internal Server Error，服务器错误。

通常，只有 2xx 和 304 的状态码才表示服务器响应是正常的。

```javascript
request.onload = () => {
  const { readyState, status, response } = request;
  const checkReadyState = readyState;
  const checkStatus = (status >= 200 && status < 300) || status === 304;
  if (checkReadyState && checkStatus) {
    console.log(response);
  }
};
```

##### statusText(只读)

`statusText` 属性返回一个字符串，表示服务器响应的状态信息。如果请求处于调用 `send()` 方法之前，则该属性的值是空字符串；如果服务器没有返回状态信息，则该属性默认为 `OK`。

##### timeout

`timeout` 属性是一个整数，用于设置多少毫秒后，如果请求仍未得到结果，就会自动终止。默认值为 0，表示没有超时。当超时发生时，`timeout` 事件就会被触发。

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test/json');
request.timeout = 5000;
request.send();
```

另外，`timeout` 属性不能用于同步请求中，否则将会抛出一个 `InvalidAccessError` 类型的错误。

##### upload

`XMLHttpRequest` 还可以用于上传文件，而且如果上传的文件过大，一般都会追踪上传的进度。但 `progress` 事件在这里不起作用，因为它仅在接收数据阶段触发。此时可以使用 `upload` 属性，它返回一个对象用于表示上传的进度，可以通过对其绑定事件来追踪上传的进度。可用事件如下：

- `loadstart`：上传开始。
- `progress`：上传期间定期触发。
- `abort`：上传终止。
- `error`：上传失败（非 HTTP 错误）。
- `load`：上传成功完成。
- `timeout`：上传超时（如果设置了 `timeout` 属性）。
- `loadend`：上传完成，不管是成功还是失败。

比如，跟踪上传文件的进度：

```html
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  const request = new XMLHttpRequest();
  request.open('POST', '/api/test/upload');
  // 跟踪进度
  request.upload.onprogress = (event) => {
    const { total, loaded } = event;
    console.log(`文件大小：${total}，已上传：${loaded}`);
  };
  // 跟踪完成，无论成功与否
  request.upload.loadend = () => {};
  request.send(file);
}
</script>
```

##### withCredentials

`withCredentials` 属性是一个布尔值，用于表示跨域请求时，用户凭证（比如 Cookie 和 HTTP 授权）是否会包含在请求中，默认是 `false`。

如果要想在跨域请求时携带 Cookie，则需要将 `widthCredentials` 设置为 `true`。

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.withCredentials = true;
request.send();
```

并且对于跨域请求，服务端也需要进行设置：

- `Access-Control-Allow-Origin` 必须设置为请求的源，告诉浏览器允许跨域。
- `Access-Control-Allow-Credentials` 设置为 `true`，这样才能将响应暴露给页面。

### 方法

##### open()

`open()` 方法用于初始化一个请求，它仅仅是用于配置请求，并不会发送请求，语法如下：

```
request.open(method, url[, async[, user[, password]]]);
```

参数分别是：

- `method`(必填)：HTTP 请求方法。比如 `GET`、`POST`、`PUT`、`DELETE`、`HEAD` 等。
- `url`(必填)：要请求的 URL。
- `async`(可选)：布尔值，表示请求是否为异步请求，默认为 `true`。如果为 `fasle`，那么请求将会以同步的方式处理，`send()` 方法只有在收到服务器响应后才会返回，浏览器才能进行下一步的操作。由于同步请求，用户发送请求后需要等待结果，很容易破坏用户体验，目前许多浏览器已经禁止在主线程中使用，只允许在 Worker 里面使用。因此，应该避免将该属性设置为 `false`。
- `user`(可选)：用于身份验证的用户名，默认为 `null`。
- `password`(可选)：用于身份验证的密码，默认为 `null`。

比如，初始化一个 `POST` 请求：

```javascript
request.open('POST', '/api/test');
```

另外，对于调用过 `open()` 方法的请求，如果再次调用该方法，相当于调用 `abort()` 方法，即终止该请求。

##### send()

`send()` 方法用于发送 HTTP 请求。如果是异步请求，则该方法会在发送请求后立即返回；如果是同步请求，则该方法会在响应到达后才返回。语法如下：

```
request.send([body]);
```

该参数是可选的，表示请求中要发送的数据体，可以是各种格式的数据：

```
// null 默认值，比如请求方法是 GET 或 HEAD
request.send(null);

// 可以发送文档对象，在发送之前会被序列化
request.send(Document data);

// 可以发送表单数据
reqeuset.send(FormData data);

// 可以发送二进制数据，最好使用 ArrayBufferView 或 Blob 对象
request.send(ArrayBufferView data);
request.send(Blob data);

// 可以发送字符串数据
request.send(DOMString data);
```

示例一，发送带查询参数的 `GET` 请求：

```javascript
const request = new XMLHttpRequest();
request.open('GET', `/api/userList/?usernmae=${encodeURIComponent(usernmae)}`);
request.onload = () => {
  // 处理响应
};
request.send();
```

示例二，发送带表单数据的 `POST` 请求：

```javascript
const formData = new FomrData();
formData.append('username', 'lufei');
formData.append('age', 18);

const request = new XMLHttpRequest();
request.open('POST', '/api/addUser');
request.onload = () => {
  // 处理响应
};
request.send(formData);
```

另外，如果没有调用 `setRequestHeader()` 方法来设置 `Accept` 头部信息，则会发送类型为 `*/*` 的 `Accept` 头部信息。

##### setRequestHeader()

`setRequestHeader()` 方法用于设置 HTTP 请求头信息，该方法必须在 `open()` 方法之后，`send()` 方法之前调用。语法如下：

```
request.setRequestHeader(header, value);
```

`header` 是请求头名称，`value` 是对应的值：

```javascript
request.open('get', '/api/test');
request.setRequestHeader('Content-Type', 'text/html;charset=utf-8');
request.setRequestHeader('Content-Length', 100);
request.send();
```

如果多次对同一个请求头赋值，不会产生覆盖，只会生成一个合并了多个值的请求头。

```javascript
request.setRequestHeader('X-Auth'， '123');
request.setRequestHeader('X-Auth'， '456');
// header 将是
// X-Auth: 123, 456
```

##### getResponseHeader()

`getResponseHeader()` 方法返回一个字符串，表示获取的指定响应头的值，该方法不区分大小写。如果还没有收到服务器响应或者指定的字段不存在，则返回 `null`。语法如下：

```
request.getResponseHeader(headerName);
```

比如：

```javascript
request.getResponseHeader('Content-Type');
```

另外，如果响应头中有多个同名的字段，那么会返回以逗号和空格将值分隔的字符串。

##### getAllResponseHeaders()

`getAllResponseHeaders()` 方法一个字符串，表示服务器返回的所有响应头信息，每个 header 之间始终使用 `\r\n`（回车+换行）进行分隔。如果没有收到任何响应，则为 `null`。语法如下：

```
request.getAllResponseHeaders();
```

比如，以下是一个原始的响应头：

```
date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
content-encoding: gzip\r\n
x-content-type-options: nosniff\r\n
server: meinheld/0.6.1\r\n
x-frame-options: DENY\r\n
content-type: text/html; charset=utf-8\r\n
connection: keep-alive\r\n
strict-transport-security: max-age=63072000\r\n
vary: Cookie, Accept-Encoding\r\n
content-length: 6502\r\n
x-xss-protection: 1; mode=block\r\n
```

对获取到的响应头字符串进行处理：

```javascript
request.onload = () => {
  const headerList = reqeust.getAllResponseHeaders().trim().split('\r\n');
  const headerMap = headerList.reduce((result, current) => {
    const [name, value] = current.split(': ');
    result[name] = value;
    return result;
  });
  console.log(headerMap['Content-Type']); // text/html; charset=utf-8
}
```

##### overrideMimeType()

`overrideMimeType()` 方法指定一个 MIME 类型用于替代服务器指定的类型，从而让浏览器进行不一样的处理。该方法需要在 `send()` 方法之前调用，语法如下：

```
request.overrideMimeType(mimeType);
```

比如，服务器返回的 MIME 类型是 `text/xml`，但由于一些原因浏览器解析失败报错，导致无法拿到数据。此时可以调用 `overrideMimeType()` 方法将 MIME 类型修改为 `text/plain`，这样就可以得到原始数据：

```javascript
request.open('get', '/api/test');
request.overrideMimeType('text/plain');
request.send();
```

##### abort()

`abort()` 方法用于中止已经发出的请求，所以该方法需要在 `send()` 方法后调用。当请求被中止时会触发 `abort` 事件，同时 `readyState` 变为 4，`status` 变为 0。

### 事件

##### readystatechange

`readystatechange` 事件会在 `readyState` 属性发生变化时触发，语法如下：

```javascript
request.addEventListener('readystatechange', event => {});
// or
request.onreadystatechange = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
reqeust.addEventListener('readystatechange', event => {
  const { readyState } = request;
  console.log(readyState); // 分别打印出 1、2、3、4
});
request.open('GET', '/api/test');
request.send();
```

##### loadstart

`loadstart` 事件会在请求开始时触发——即调用 `open()` 方法后，语法如下：

```javascript
request.addEventListener('loadstart', event => {});
// or
request.onloadstart = event => {};
```

另外，`loadstart` 事件（也包括 `load`、`loadend`、`error`、`progress`、`abort`、`timeout`）中的 `event` 对象还有三个自有的可读属性：

- `lengthComputable` 是布尔值，表示加载的总量是否可以计算，默认是 false。
- `loaded` 是一个整数，表示已经加载的量，默认是 0。当使用 HTTP 下载资源时，该属性只计算响应的 body 部分，而不会包含响应头和其它开销。
- `total` 是一个整数，表示需要加载的总量，默认是 0。当使用 HTTP 下载资源时，该属性的值等同于`Content-Length`，而不会包含响应头和其它开销。

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
reqeust.addEventListener('loadstart', event => {
  const { readyState } = request;
  console.log(readyState); // 1
  const { lengthComputable, loaded, total } = event;
  console.log(lengthComputable, loaded, total);
});
request.send();
```

##### load

`load` 事件会在请求成功完成时触发，此时已完全下载响应。比如，HTTP 状态码为 2xx 是请求成功完成，HTTP 状态码为 400 或 500 等也是请求成功完成。语法如下：

```javascript
request.addEventListener('load', event => {});
// or
request.onload = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.addEventListener('load', event => {
  const { readyState, status, response } = request;
  console.log(readyState); // 4
  if ((status >= 200 && status < 300) || status === 304) {
    // 处理响应
    console.log(response);
  } else {
    // HTTP error
    console.log('请求出错了');
  }
});
request.send();
```

##### loadend

`loadend` 事件会在 `load`、`error`、`abort` 或 `timeout` 之后触发，该事件表示请求结束，无论成功与否。语法如下：

```javascript
request.addEventListener('loadend', event => {});
// or
request.onloadend = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.addEventListener('loadend', event => {
  const { readyState } = request;
  console.log(readyState); // 4
  console.log('请求完成，不管是成功还是失败')
});
request.send();
```

##### error

`error` 事件会在遇到非 HTTP 错误时触发，比如网络中断或跨域。语法如下：

```javascript
request.addEventListener('error', event => {});
// or
request.onerror = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.addEventListener('error', event => {
  // 处理非 HTTP error
});
request.send();
```

##### progress

`progress` 事件会在接收响应数据阶段定期触发，语法如下：

```javascript
request.addEventListener('progress', event => {});
// or
request.onprogress = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.addEventListener('progress', event => {
  const { readyState } = request;
  console.log(readyState); // 3
});
request.send();
```

##### abort

`abort` 事件会在调用了 `abort()` 方法中止请求后触发，语法如下：

```javascript
request.addEventListener('abort', event => {});
// or
request.onabort = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.addEventListener('abort', event => {
  const { readyState, status } = request;
  console.log(readyState); // 4
  console.log(status); // 0
});
request.send();
request.abort();
```

##### timeout

`timeout` 事件会在设置了 `timeout` 属性后由于请求超时而取消了该请求后触发，语法如下：

```javascript
request.addEventListener('timeout', event => {});
// or
request.ontimeout = event => {};
```

示例：

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.timeout = 100;
request.addEventListener('timeout', event => {
  // 请求超时
  const { readyState } = request;
  console.log(readyState); // 4
});
request.send();
```

### 应用

使用 `XMLHttpRequest` 发送 AJAX 请求，一般有以下四个步骤：

1. 创建 XMLHttpRequest对象的实例。
2. 调用实例的 `open` 方法。
3. 监听实例的 `onload`、`onerror` 事件，并处理返回的数据。
4. 调用实例的 `send` 方法。

##### [请求静态资源](./JavaScript/xmlhttprequest-example-static.md)



