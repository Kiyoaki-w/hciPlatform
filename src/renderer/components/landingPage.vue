<template>
  <el-container>
    <el-header id="mainHeader">An Interesting <b>Neural Network</b> Experiment Platform</el-header>
    <el-container id="mainBody">
      <el-main id="content">
        <el-row>
          <el-col :span="18" :offset="3">
            <h1>Hi, Welcome to our Platform.</h1>
            <p><b>Tips:</b> Now, You can choose <b>a model that has been trained</b> to predict or <b>personally train a model</b> for prediction.</p>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="18" :offset="3">
            <button @click="toTesting" id="mybutton">Choose a trained model</button>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px">
          <el-col :span="18" :offset="3">
            <button @click="toTraining" id="mybutton">Personally train a model</button>
          </el-col>
        </el-row>
        <el-row style="margin-top:40px">
          <el-col :span="4" :offset="20">
            <a href=""><i class="el-icon-question"></i>help</a>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  export default {
    name: 'landing',
    data(){
      var __this = this;
      return{
        // 页面布局尺寸 (in px)
        headerHeight: 150,
      }
    },
    methods: {
      // open (link) {
      //   this.$electron.shell.openExternal(link)
      // },
      toTesting(){
        this.$router.push('/main/testing');
      },
      toTraining(){
        this.$router.push('/main/training')
      }
    },
    mounted(){
      // 设置各部分高度
      var clientHeight = document.body.clientHeight;
      document.getElementById("mainHeader").style.height = this.headerHeight + 'px';
      document.getElementById("mainHeader").style.lineHeight = this.headerHeight + 'px';
      document.getElementById("mainBody").style.height = clientHeight - this.headerHeight + 'px';
    }
  }
</script>

<style>
h1{
  font-size: 45px;
  padding-top: 90px
}
#mybutton{
  background-color: #517b7a; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: 250px;
  height: 40px;
  border-radius: 5px;
}
</style>
