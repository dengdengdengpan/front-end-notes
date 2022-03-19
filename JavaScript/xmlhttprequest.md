# XMLHttpRequest

`XMLHttpRequest` 对象是 AJAX 的主要接口，用于浏览器和服务器之间的通信。

### 构造函数

在使用 `XMLHttpRequest` 对象实例的属性、方法、事件之前都需要先初始化它：

```javascript
const request = new XMLHttpRequest();
```

### 属性

##### XMLHttpRequest.readyState(只读)

`readyState` 属性返回一个整数用于表示当前实例所处的状态，它可能返回以下值：

- 0 - UNSET：已创建 `XMLHttpRequest` 实例，但还未调用 `open()` 方法。
- 1 - OPENED：`open()` 方法已经调用，但 `send()` 方法还未调用。在这个状态下还可以调用 `setRequestHeader()` 方法设置请求头信息。
- 2 - HEADERS_RECEIVED：`send()` 方法已经调用，并且已经接收到响应头信息。
- 3 - LOADING：正在接收服务器返回数据的 body 部分。此时，如果 `responseType` 属性是 `text` 或空字符串，那么 `responseText` 属性会包含已经收到的部分信息。
- 4 - DONE：本次请求已经完成，这表示服务器返回的数据已经完全接收或者完成失败。

每当实例的状态发生变化，`readyState` 属性的值都会改变，并会触发 `readyStateChange` 事件：

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com');
request.onreadystatechange = () => {
  console.log(request.readyState);
};
request.send();
```

##### XMLHttpRequest.response(只读)

`response` 属性表示服务器返回响应中的 body 部分，它可以任何类型的数据类型，比如二进制对象、字符串、对象等，具体的数据类型由 `responseType` 决定。

如果请求尚未完成或未成功，则 `response` 属性的值为 `null`。但如果 `responseType` 属性是 `text` 或空字符串，在 `readyState` 等于 3 的状态下——即请求未结束之前，`response` 属性会包含服务器已经返回的部分数据。

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

##### XMLHttpRequest.responseText(只读)

`responseText` 属性返回从服务器接收到的文本数据，它只有在请求成功接收完数据后才包含完整的数据。

##### XMLHttpRequest.responseXML(只读)

`responseXML` 属性返回从服务器接收到的 HTML 或 XML 文档对象。如果请求没有成功，或尚未发送，或接收到的数据不能被解析成 HTML 或 XML，则为 `null`。

要想获取正常的 `responseXML` 需要将服务器返回响应头中的 `Content-Type` 属性设置为 `text/xml` 或者`aplication/xml`，并在发送请求前，需要将 `responseType` 属性设置为 `document`。如果服务器未指明 `Content-Type` 是 `text/xml` 还是 `application/xml`， 则可以使用 `overrideMimeType()` 方法强制解析为 XML。

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

##### XMLHttpRequest.responseURL(只读)

`responseURL` 属性返回发送数据的服务器的网址。如果网址中包含锚点，则该属性将会移除锚点；如果服务器端发生跳转，则该属性返回的是最后实际返回数据的网址。

```javascript
const request = new XMLHttpRequest();
request.open('GET', 'http://test.com/api/xxx#stpe1');
request.onload = () => {
  console.log(xhr.responseURL); // http://test.com/api/xxx
};
request.send();
```

##### XMLHttpRequest.responseType

`responseType` 属性是一个字符串，用于表示服务器返回数据的类型。`responseType` 是可写的，可以在 `open()` 方法之后、`send()` 方法之前设置它的值，用以告诉浏览器如何解析返回的数据。它可以采用以下值：

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

示例二，设置为 `jons` 来获取响应：

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

##### XMLHttpRequest.status(只读)

`status` 属性返回一个整数用于表示服务器响应的状态码。在请求完成前，或者请求出错，`status` 属性的值都是 0。如果请求成功或者服务器没有返回状态码，`status` 属性的值都是 200。常见的 HTTP 状态码如下：

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
  const checkStatus = (status >= 200 && status <300) || status === 304;
  if (checkReadyState && checkStatus) {
    console.log(response);
  }
};
```

##### XMLHttpRequest.statusText(只读)

`statusText` 属性返回一个字符串用于表示服务器响应的状态信息。如果请求处于调用 `send()` 方法之前，则该属性的值是空字符串；如果服务器没有返回状态信息，则该属性默认为 `OK`。

##### XMLHttpRequest.timeout

`timeout` 属性是一个整数，表示一个请求在被自动终止前所消耗的毫秒数。默认值为 0，表示没有超时。当超时发生时，`timeout` 事件就会被触发。

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test/json');
request.timeout = 5000;
request.send();
```

另外，`timeout` 属性不能用于同步请求中，否则将会抛出一个 `InvalidAccessError` 类型的错误。

##### XMLHttpRequest.upload

`XMLHttpRequest` 不仅可以发送请求，还可以发送文件。`upload` 属性返回一个对象用于表示上传的进度，可以通过对其绑定事件来追踪上传的进度。可用事件如下：

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

##### XMLHttpRequest.withCredentials

`withCredentials` 属性是一个布尔值，表示跨域请求时，用户凭证（比如 Cookie 和 HTTP 授权）是否会包含在请求中，默认是 `false`。

如果要想在跨域请求时携带 Cookie，则需要将 `widthCredentials` 设置为 `true`。

```javascript
const request = new XMLHttpRequest();
request.open('GET', '/api/test');
request.withCredentials = true;
request.send();
```

对于跨域请求，服务端也需要进行设置：

- 设置 `Access-Control-Allow-Origin` 为请求的源，告诉浏览器允许跨域。
- 设置 `Access-Control-Allow-Credentials` 为 `true`，这样才能将响应暴露给页面。

### 方法

### 事件

