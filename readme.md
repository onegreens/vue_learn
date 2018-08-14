# vue 学习

## 1. vue 文件结构

├── README.md 项目介绍
├── index.html 入口页面
├── build 构建脚本目录
│ ├── build-server.js 运行本地构建服务器，可以访问构建后的页面
│ ├── build.js 生产环境构建脚本
│ ├── dev-client.js 开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│ ├── dev-server.js 运行本地开发服务器
│ ├── utils.js 构建相关工具方法
│ ├── webpack.base.conf.js wabpack 基础配置
│ ├── webpack.dev.conf.js wabpack 开发环境配置
│ └── webpack.prod.conf.js wabpack 生产环境配置
├── config 项目配置
│ ├── dev.env.js 开发环境变量
│ ├── index.js 项目配置文件
│ ├── prod.env.js 生产环境变量
│ └── test.env.js 测试环境变量
├── mock mock 数据目录
│ └── hello.js
├── package.json npm 包配置文件，里面定义了项目的 npm 脚本，依赖包等信息
├── src 源码目录  
│ ├── main.js 入口 js 文件
│ ├── app.vue 根组件
│ ├── components 公共组件目录
│ │ └── title.vue
│ ├── assets 资源目录，这里的资源会被 wabpack 构建
│ │ └── images
│ │ └── logo.png
│ ├── routes 前端路由
│ │ └── index.js
│ ├── store 应用级数据（state）
│ │ └── index.js
│ └── views 页面目录
│ ├── hello.vue
│ └── notfound.vue
├── static 纯静态资源，不会被 wabpack 构建。
└── test 测试文件目录（unit&e2e）
└── unit 单元测试
├── index.js 入口脚本
├── karma.conf.js karma 配置文件
└── specs 单测 case 目录
└── Hello.spec.js

## 2.散点

### 1.设置首页

1.  在路由设置中，即 router 文件夹下的 index.js 中导入需要显示的页面

```js
import login from "../components/account/login/Login.vue";
```

2.  在 router 文件夹下的 index.js 中配置 path

```js
let router = new Router({
    //去除地址栏里的#/
    mode: "history",
    routes: [
        { name: "login", path: "/login", component: login },
        { name: "mode", path: "*", redirect: "/login" },
        { name: "mode1", path: "/", redirect: "/login" }
    ]
});
```

关键参数：path

例子：

页面路径为http://localhost:9520，当加载时，框架会在路由中匹配对应路径的页面

### 2.设置 axios 的默认路径

```js
//设置axios的默认路径
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/ldmall";
//将axios放到vue原型中 方便调用
Vue.prototype.axios = axios;

以上操作在mian.js中完成，即入口文件，会在项目初始化时加载
```

### 3.跨域的解决办法

在 config.index.js 中添加 proxyTable

```js
 proxyTable: {
      '/api':{
        target:'http://localhost:8080',
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    },
```

当我们需要调用http://localhost:8080/text的时候，只需要写 api/text

### 4.页面跳转

```js
this.$router.push({"/path"})
```

该路径需要现在路由（router）中声明

### 5.配置环境文件

在 config/index.js 中，build 下添加

```js
 env: require('./prod.env'),
```

### 6. 去除地址栏里的#/

在 router 的配置中，在声明 router 时，添加 mode

```js
let router = new Router({
    //去除地址栏里的#/
    mode: "history"
});
```

### 7. 配置子路径

如 /user/changepassword

在 router 的配置中，在声明 router 时，

```js
let router = new Router({
    //去除地址栏里的#/
    mode: "history",
    routes: [
        {
            name: "user",
            path: "/user",
            component: user,
            children: [
                {
                    name: "changepassword",
                    path: "changepassword",
                    component: changepassword
                }
            ]
        }
    ]
});
```

在 Router 外声明

```js
const managementNumber = [
    {
        name: "managementArgument",
        path: "managementArgument",
        component: managementArgument
    }
];

let router = new Router({
    //去除地址栏里的#/
    mode: "history",
    routes: [...managementNumber]
});
```

## 3.vuex

### 1.概念

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### 2.状态管理核心

状态管理有 5 个核心，分别是 state、getter、mutation、action 以及 module。分别简单的介绍一下它们：

1、state

        state为单一状态树，在state中需要定义我们所需要管理的数组、对象、字符串等等，只有在这里定义了，在vue.js的组件中才能获取你定义的这个对象的状态。

2、getter

        getter有点类似vue.js的计算属性，当我们需要从store的state中派生出一些状态，那么我们就需要使用getter，getter会接收state作为第一个参数，而且getter的返回值会根据它的依赖被缓存起来，只有getter中的依赖值（state中的某个需要派生状态的值）发生改变的时候才会被重新计算。

3、mutation

        更改store中state状态的唯一方法就是提交mutation，就很类似事件。每个mutation都有一个字符串类型的事件类型和一个回调函数，我们需要改变state的值就要在回调函数中改变。我们要执行这个回调函数，那么我们需要执行一个相应的调用方法：store.commit。

4、action

        action可以提交mutation，在action中可以执行store.commit，而且action中可以有任何的异步操作。在页面中如果我们要嗲用这个action，则需要执行store.dispatch

5、module

        module其实只是解决了当state中很复杂臃肿的时候，module可以将store分割成模块，每个模块中拥有自己的state、mutation、action和getter。

### 3. 安装

```js
npm install vuex --save
```

### 4. 实例

详见 文件夹 store

内容包括：多 modules 添加， 添加至 vue

## 4. qs

键值对转换模块

```js
var qs = require("qs");
var assert = require("assert");

var obj = qs.parse("a=c");
assert.deepEqual(obj, { a: "c" });

var str = qs.stringify(obj);
assert.equal(str, "a=c");
```

### 5.element-ui

中文官方网站： http://element-cn.eleme.io/#/zh-CN
