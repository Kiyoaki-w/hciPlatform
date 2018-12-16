<template>
  <div>
    <el-row>
      <!-- setting -->
      <el-col :span="8">
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Training Settings</div></el-col>
        </el-row>
        <el-row style="padding-top:10px">
          <el-col :span="24">
            <el-form :label-position="right" label-width="140px" :model="params">
              <el-form-item size="small" label="Model">
                <el-select v-model="params.model" placeholder="check a model">
                  <el-option v-for="i in models" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item size="small" label="Dataset">
                <el-select v-model="params.dataset" placeholder="check a dataset">
                  <el-option v-for="i in datasets" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              
              <el-row id="subtitle3">
                <el-col :span="24"><div @click="toAccuracy" class="grid-content">Params</div></el-col>
              </el-row>
              <el-form-item size="small" label="Epoch">
                <el-input v-model="params.epoch"></el-input>
              </el-form-item>
              <el-form-item size="small" label="Batch size">
                <el-input v-model="params.batchSize"></el-input>
              </el-form-item>
              <el-form-item size="small" label="Learning Rate">
                <el-input v-model="params.lRate"></el-input>
              </el-form-item>
              <el-form-item size="small" label="Activation">
                <el-select v-model="params.act" placeholder="choose an activation function">
                  <el-option v-for="i in acts" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="small" label="Regularization">
                <el-select v-model="params.act" placeholder="choose a regularization method">
                  <el-option v-for="i in regs" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="small" label="Regularization Rate">
                <el-input v-model="params.regRate"></el-input>
              </el-form-item>
            </el-form>
            <el-row id="mybtn">
              <el-col :span="12">
                <el-button type="info" @click="toHome">Back Home</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" @click="startTrain">Start Training</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>



      <!-- result -->
      <el-col style="padding-left:2px" :span="16">

        <!-- title -->
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Training Results</div></el-col>
        </el-row>

        <!-- subtitle -->
        <el-row>
          <el-col :span="12">
            <el-row id="subtitle1">
              <el-col :span="24"><div @click="toLoss" id="btndiv" class="grid-content">Loss</div></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row id="subtitle2">
              <el-col :span="24"><div @click="toAccuracy" id="btndiv" class="grid-content">Accuracy</div></el-col>
            </el-row>
          </el-col>
        </el-row>

        
        <!-- content  v-if被改成v-show了 使用v-if的话不会切换图标 -->
        <el-row  v-show="activeName==='loss'">
          <el-col :span="24">
            <div id="lossChart"> </div>
          </el-col>
        </el-row>
        <el-row v-show="activeName==='accuracy'">
          <el-col :span="24">
            <div id="accChart"> </div>
          </el-col>
        </el-row>

        <!-- <el-row>
          <div class="spinner" v-show="false">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        </el-row> -->

        <!-- loading -->
        <el-row id="loadingIcon">
          <i :class="loadingStat"></i>
        </el-row>
      </el-col>

      

    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // content部分的当前选中 loss/accuracy
      activeName: 'loss',
      loadingStat: 'el-icon-check', // el-icon-check  el-icon-loading
      
      // 下拉菜单数据
      models: [
        {
          label: 'LeNet',
          value: 0
        },
        {
          label: 'MLP',
          value: 1
        },
        {
          label: 'SVM',
          value: 2
        },
      ],
      datasets: [
        {
          label: 'MINIST',
          value: 'MINIST'
        }
      ],
      acts: [
        {
          label: 'Sigmoid',
          value: 0
        },
        {
          label: 'Relu',
          value: 1
        },
        {
          label: 'Tanh',
          value: 2
        }
      ],
      regs: [
        {
          label: 'No regulatization',
          value: 0
        },
        {
          label: 'L1',
          value: 1
        },
        {
          label: 'L2',
          value: 2
        }
      ],
      lossDataX: [
        '0', '1', '2', '3', '4', '5'
      ],
      lossDataY: [
        5, 20, 36, 10, 10, 20
      ],
      accDataX: [
        '0', '1', '2', '3', '4', '5'
      ],
      accDataY: [
        5, 10, 26, 30, 40, 50
      ],
      // 表单数据
      params: {
        model: 0,
        dataset: 'MINIST',
        epoch: 10,
        batchSize: 100,
        lRate: 0.0001,
        act: 0,
        reg: 0,
        regRate: 0.01,
      }
    }
  },
  methods:{
    getAccuracy(){
      var echarts = require('echarts');
      var accChart = echarts.init(document.getElementById('accChart'));

      var self = this
      this.$http.get('http://127.0.0.1:1234/train/accuracy/233',{crossdomain: true})
        .then(function (response) {
          self.accDataX = response["data"][0]
          self.accDataY = response["data"][1]
          accChart.setOption({
              title: {
                  text: 'accuracy'
              },
              tooltip: {},
              xAxis: {
                  data: self.accDataX
              },
              yAxis: {},
              series: [{
                  name: '%',
                  type: 'line',
                  data: self.accDataY
              }]
          });
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    getLoss(){
      var echarts = require('echarts');

      var lossChart = echarts.init(document.getElementById('lossChart'));
      var self = this
      this.$http.get('http://127.0.0.1:1234/train/loss/233')
        .then(function (response) {
          self.lossDataX = response["data"][0]
          self.lossDataY = response["data"][1]
          console.log(self.lossDataX)
          lossChart.setOption({
            title: {
                text: 'Loss'
            },
            tooltip: {},
            xAxis: {
                data: self.lossDataX
            },
            yAxis: {},
            series: [{
                name: 'cross entropy',
                type: 'line',
                data: self.lossDataY
            }]
          });
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    startTrain(){
      this.loadingStat = "el-icon-loading" 
      var __this = this;
      this.$http.post('http://127.0.0.1:1234/train/start', __this.params)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toHome(){
      this.$router.push('/');
    },
    toLoss(){
      // 改变按钮颜色
      document.getElementById("subtitle1").style.backgroundColor = "#528e6e";
      document.getElementById("subtitle2").style.backgroundColor = "#a5c3b6";
      this.getLoss() 
      // 标记当前选中为loss
      this.activeName = 'loss';
    },
    toAccuracy(){
      document.getElementById("subtitle1").style.backgroundColor = "#a5c3b6";
      document.getElementById("subtitle2").style.backgroundColor = "#528e6e";
      this.getAccuracy()
      this.activeName = 'accuracy';
    }
  },
  mounted(){
    
  }   //初步添加了两个chart
}
</script>

<style>
#title{
  background-color: #769897;
  height: 30px;
  line-height: 30px;
  color: white;
}
#subtitle1{
  background-color: #528e6e;
  height: 30px;
  line-height: 30px;
  color: white;
}
#subtitle2{
  background-color: #a5c3b6;
  height: 30px;
  line-height: 30px;
  color: white;
}
#subtitle3{
  background-color: #789799;
  height: 30px;
  line-height: 30px;
  color: white;
  margin-bottom: 10px;
  margin-top:20px
}
#lossChart{
  margin-top:60px;
  width:600px;
  height: 400px;
}
#accChart{
  margin-top:60px;
  width:600px;
  height: 400px;
}

#btndiv{
  cursor: pointer;
}
#mybtn{
  text-align: center;
}
label.el-form-item__label{
  font-size:13px
}
#loadingIcon{
  font-size:40px;
  float: right;
  padding-right: 40px;
  margin-top: -50px;
  color: #528e6e;
  font-weight: bold
}
.spinner {
  float: right;
  margin-right: 50px;
  margin-top: -60px;
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 6px;
}
 
.spinner > div {
  background-color: #67CF22;
  height: 100%;
  width: 6px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
