## 人机交互前端 开发日志

### 12.11

#### 实现功能:
  - electron + vue 框架搭建
  - 前端UI框架实现
  - /main, /training, /testing 路由设计
  - /training页面settings部分

#### todos:
  - /training页面results部分的图表显示与更新
  - /testing页面settings部分
  - 后端api的调用 & 页内数据的实时更新(包括图表的刷新, ModelList组件, Training Settings的下拉菜单)
  - 当前页面是将尺寸写死的, 未做对窗口大小变化的适配


### 12.12

#### 实现功能:
  - 重做了页面布局
  - 重写了路由结构
    - '/': landingPage.vue
    - '/main/testing': testing
    - '/main/training': training

#### todos:
  - /main/training页面results部分的图表显示与更新
  - 后端api的调用 & 页内数据的实时更新(包括图表的刷新, ModelList组件, Training Settings的下拉菜单)