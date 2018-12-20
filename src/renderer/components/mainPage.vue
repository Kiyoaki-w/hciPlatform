<template>
  <el-container>
    <el-header id="mainHeader">
      An Interesting <b>Neural Network</b> Experiment Platform
    </el-header>

    <el-header id="mainHeader">An Interesting <b>Neural Network</b> Experiment Platform</el-header>
    
    <el-container id="mainBody">
      <el-aside id="content">
        <router-view></router-view>
      </el-aside>
      <!-- <el-aside v-if="false" id="aside" :width="asideWidth+'px'">
        <modelList />
      </el-aside> -->
    </el-container>
  </el-container>
</template>

<script>
  import modelList from './common/modelList'

  export default {
    name: 'main',
    components: { modelList },
    data(){
      var __this = this;
      return{
        // 页面布局尺寸 (in px)
        headerHeight: 150, 
        asideWidth: 300, 
      }
    },
    methods: {

    },
    mounted(){
      // 设置各部分高度
      var clientHeight = document.body.clientHeight;
      document.getElementById("mainHeader").style.height = this.headerHeight + 'px';
      document.getElementById("mainHeader").style.lineHeight = this.headerHeight + 'px';
      document.getElementById("mainBody").style.height = clientHeight - this.headerHeight + 'px';
      // // 设置各部分宽度 reserved
      // var clientWidth = document.body.clientWidth;
      // document.getElementById("content").style.width = clientWidth - this.asideWidth + 'px';
      
      // 设置各部分宽度 reserved
      var clientWidth = document.body.clientWidth;
      document.getElementById("content").style.width = clientWidth + 'px';

    }
  }
</script>

<style>
.el-header{
  background-color: #35666a;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 2px;
  font-size: 30px
}

#aside{
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;
  margin-left: 2px
}

#content{
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 100%;
}


body > .el-container {
  height: 100%;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
