# 每周总结

邱僚林
2019/7/26

## 学习问题

_还没有_

## 学习总结

### array map set

- array

  - 基本数组类型，创建方式 2 种：`[]`和`new Array()`,故将继承数组类的属性与方法
  - 主要特点  
    方法一般都接受 2 个参数:`callback`和`thisArg`(回调执行时的上下文)
    遍历的回调都接受三个参数:`value`,`index`,`array`(正在操作的数组)
  - 常用方法：  
    `.forEach(callback)`遍历回调;  
    `.every(ninja => "name" in ninja)`遍历所有判断是否都有"name"接受回调 Boolean 值，若全部为`ture`则返回`ture`;  
    `.some(ninja => "name" in ninja)`,遍历直至一个`ture`就返回;  
    `ninjas.find(ninja => ninja.weapon === "wakizashi"）`使用 find 方法查找满足回调函数中指定条件的第 1 个元素，否则为 undefined  
    `.indexOf(value)`和`.findIndex(ninja =>ninja =="yoshi")`都返回满足的元素的索引;  
    `.sort(num1,num2 => num1>num2?return 1;return -1)`,通过回调比较相邻两个数对其排序,若为 1 则交换位置.  
    `filter(ninja => callback)`,返回 callback 为真的数组

- map

  - 字典数组类型,创建方式:`new Map([a,...])`
  - 特点:纯粹的字典映射,不继承普通对象的方法,比如`constructor`,同样也去除了`key`必须是字符串的限制  
    　 map 是键值对的集合，key 可以是任意类型的值，甚至可以是对象
  - 常用方法:  
    example:`const ninjaIslandMap = new Map();ninga1={name:"yoshi",}`.  
     `ninjaIslandMap.map.set(ninja1, { homeIsland: "Honshu"})`,则设置了 ninja1 和`{ homeIsland: "Honshu"}`的映射,`ninjaIslandMap.map.get(ninja1).homeIsland =='honshu'`  
     `for of`对其中每个元素进行遍历,返回每个元素本身,包括 key 和 value.`for in`则只返回 key  
     `.has(key)`通过对 key 进行 hash 运算后散射得到其 index(即内存地址) 值,故能直接通过 key 进行哈希散射后匹配`map[hash(key)]`,所以时间复杂度为 O(1),可利用其进行判断去重.

- set

  - 唯一数组类型,创建方式:`new Set([a,...])`
  - 特点:成员的值唯一,构建为红黑树结构.

### vue

#### 什么是 Vue

vue 是一个渐进式 mvvm 的框架,当创建一个 vm(`viewmodel`)实例时,该数据就有了响应式,能绑定视图的能力

```js
var vm = new Vue({
  data: data
});
```

#### 主要用法

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
    title:'Vue'
  }
})
```

- 声明式渲染

> 使用`{{}}`模板语法声明式地将数据渲染进 DOM 的系统

> 使用`v-`前缀指令在标签中声明式地将数据渲染进 DOM 的系统,将数据与元素特性进行绑定

```js
<div id="app">{{ message }}</div>
```

```js
<span v-bind:title="message"> look this title</span>
```

- 条件与循环

  > vue 不仅可以把数据绑定到 DOM 文本或特性，还可以绑定到 DOM 结构
  > 通过`v-if`, `v-for`,可以动态生成 DOM

- 事件交互
  > 用 v-on 指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法

```js
button v-on:click="reverseMessage">反转消息</button>
```

#### 计算属性和监听属性

- 计算属性
  > 当模板中放入太多的逻辑导致模板过重且难以维护时,可以使用计算属性.计算属性执行时会通过响应式`autorun`,数据会收集此依赖,只在相关响应式依赖发生改变时它们才会重新求值
  > 计算属性也可以提供一个 setter

```js
computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
```

- 监听属性
  > 用来专门监听数据的变化然后做出相应,只依赖制定的数据,不同于计算属性,监听属性可以改变除了依赖的属性以外的其他属性

#### Class 与 Style 绑定

- 对象语法  
  通过`v-bind:class={active:isActive}` isActive 是数据属性,active 是字符串,当 isActive 为真则 class= "active", 等同于 `:class="isActive?'active':''"`
- 数组语法  
   可以用来处理多个 class  
  `<div v-bind:class="[isActive ? activeClass : '', errorClass,elseClass,'last']"></div>`

- 绑定内联样式
  直接在 style 上写样式对象

```js
<div v-bind:style="{color:'red';fontSize:'13px'}"></div>
<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

## 学习反馈

_很好_
