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
              <el-form-item size="medium" label="Model">
                <el-select v-model="params.model" placeholder="check a model">
                  <el-option v-for="i in models" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item size="medium" label="Dataset">
                <el-select v-model="params.dataset" placeholder="check a dataset">
                  <el-option v-for="i in datasets" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>
              
              <el-row id="subtitle3">
                <el-col :span="24"><div @click="toAccuracy" class="grid-content">Params</div></el-col>
              </el-row>
              <el-form-item size="medium" label="Epoch">
                <el-input v-model="params.epoch"></el-input>
              </el-form-item>
              <el-form-item size="medium" label="Learning Rate">
                <el-input v-model="params.lRate"></el-input>
              </el-form-item>
              <el-form-item size="medium" label="Activation">
                <el-input v-model="params.act"></el-input>
              </el-form-item>
              <el-form-item size="medium" label="Regularization">
                <el-input v-model="params.reg"></el-input>
              </el-form-item>
              <el-form-item size="medium" label="Regularization Rate">
                <el-input v-model="params.regRate"></el-input>
              </el-form-item>
            </el-form>
            <el-row id="mybtn">
              <el-col :span="12">
                <el-button type="info" @click="toHome">Back Home</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" @click="">Start Training</el-button>
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
      
      // 下拉菜单数据
      models: [
        {
          label: 'model1',
          value: 'model1'
        },
        {
          label: 'model2',
          value: 'model2'
        },
        {
          label: 'model3',
          value: 'model3'
        },
      ],
      datasets: [
        {
          label: 'dset1',
          value: 'dset1'
        },
        {
          label: 'dset2',
          value: 'dset2'
        },
        {
          label: 'dset3',
          value: 'dset3'
        },
      ],
      lossDataX:[
        '0', '1', '2', '3', '4', '5'
      ],
      lossDataY:[
        5, 20, 36, 10, 10, 20
      ],
      accDataX:[
        '0', '1', '2', '3', '4', '5'
      ],
      accDataY:[
        5, 10, 26, 30, 40, 50
      ],
      // 表单数据
      params: {
        model: '',
        dataset: '',
        epoch: '',
        lRate: '',
        act: '',
        reg: '',
        regRate: '',
      }
    }
  },
  methods:{
    getAccuracy(){
      axios.get('/api/train/accuracy', {
          params: {
            mode_id: 12345
          }
        })
        .then(function (response) {
          this.accDataX = response[0]
          this.accDataX = response[1]
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLoss(){
      axios.get('/api/train/loss', {
          params: {
            mode_id: 12345
          }
        })
        .then(function (response) {
          this.lossDataX = response[0]
          this.lossDataX = response[1]
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    startTrain(){
      axios.post('/api/train/start', this.params)
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

      // 标记当前选中为loss
      this.activeName = 'loss';
    },
    toAccuracy(){
      document.getElementById("subtitle1").style.backgroundColor = "#a5c3b6";
      document.getElementById("subtitle2").style.backgroundColor = "#528e6e";
 
      this.activeName = 'accuracy';
    }
  },
  mounted(){
    var echarts = require('echarts');

    var lossChart = echarts.init(document.getElementById('lossChart'));

    lossChart.setOption({
        title: {
            text: 'Loss'
        },
        tooltip: {},
        xAxis: {
            data: this.lossDataX
        },
        yAxis: {},
        series: [{
            name: 'cross entropy',
            type: 'line',
            data: this.lossDataY
        }]
    });
    var accChart = echarts.init(document.getElementById('accChart'));

    accChart.setOption({
        title: {
            text: 'accuracy'
        },
        tooltip: {},
        xAxis: {
            data: this.accDataX
        },
        yAxis: {},
        series: [{
            name: '%',
            type: 'line',
            data: this.accDataY
        }]
    });
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
</style>
