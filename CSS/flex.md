# Flex 布局

### 认识 Flex 布局

在 Flex 之前，CSS 布局一般采用正常流、浮动、定位等方式进行页面布局，但是这些传统的布局方式在某些方面有一定局限性，比如使容器中的子项占有相同的宽高、在容器中垂直居中一个子项等等。Flex 布局有以下几个特点：

- **与方向无关**
- **容器空间自动分配、子项自动对齐**
- **一维布局模型**，一次只能处理一行或一列

基于这些特点，使用 Flex 布局会使布局任务变得更加容易。元素要使用 Flex 布局，可以通过 `display` 属性设置

```css
.content {
  display: flex; /* 元素的行为类似于块元素，并根据 flexbox 模型布局其内容 */
}

.content {
  display: inline-flex; /* 元素的行为类似于内联元素，并根据 flexbox 模型布局其内容 */
}
```

注意，设为 Flex 布局后，子项的 `float`、`clear`、`vertical-align` 属性将失效

### Flex 布局模型

采用 Flex 布局的元素，称为 flex 容器（flex container），flex 容器中的所有子元素被称为 flex 项（flex item）。flex 容器沿着两个轴来布局：

![flex 模型](./imgs/flex-model.svg)

**主轴（main axis）**是沿着 flex item 放置方向延伸的轴，主轴的开始位置称为 main start，结束位置称为 main end，主轴的尺寸由 main size 表示

**交叉轴（cross axis）**是垂直 flex item 放置方向的轴，交叉轴的开始位置称为 cross start，结束位置称为 cross end，交叉轴尺寸由 cross size 表示

