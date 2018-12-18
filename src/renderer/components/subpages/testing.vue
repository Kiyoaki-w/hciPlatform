<template>
  <div>
    <el-row>
      <!-- setting -->
      <el-col :span="8">
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Testing Settings</div></el-col>
        </el-row>
        <el-row style="padding-top:10px">
          <el-col :span="24">
            <el-form :label-position="right" label-width="140px" :model="params">
              <el-form-item size="medium" label="Model">
                <el-select v-model="params.model" @change="modelChange" placeholder="choose a model">
                  <el-option v-for="i in models" :value="i.value" :label="i.label" id="choosedModel"></el-option>
                </el-select>
              </el-form-item>


              <el-row id="subtitle3">
                <el-col :span="24"><div class="grid-content">Input Data</div></el-col>
              </el-row>

              <el-form-item size="medium">
                <el-radio v-model="params.radio" label="dataset" style="margin-left:-250px">Test the dataset</el-radio>
              </el-form-item>
              
              
              <el-form-item style="margin-top:-15px" size="medium" label="Dataset">
                <el-select :disabled="params.radio==='picture'" v-model="params.dataset" placeholder="choose a dataset">
                  <el-option v-for="i in datasets" :value="i.value" :label="i.label"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item size="medium">
                <el-radio v-model="params.radio" label="picture" style="margin-left:-250px">Test the picture</el-radio>
              </el-form-item>

              <el-row style="margin-top:-15px" size="medium" label="Dataset">
                <el-upload
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="imgList"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :limit=9
                  :disabled="params.radio==='dataset'">
                  <el-button :disabled="params.radio==='dataset'" slot="trigger" style="margin-left:-100px" size="small" plain>选取文件</el-button>
                  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                </el-upload>
                <img src="" style="margin-top:10px;" width="120px" height="120px">
              </el-row>
              
            </el-form>


            <el-row style="margin-top:10px" id="mybtn">
              <el-col :span="12">
                <el-button type="info" @click="toHome">Back Home</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" @click="startTest">Start Testing</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <!-- result -->
      <el-col style="padding-left:2px" :span="16">
        <!-- title -->
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Testing Results</div></el-col>
        </el-row>
        <!-- 模型数据 -->
        <el-row style="padding-top:5px;padding-left:10px">
          <span style="float:left"><span class="infotext">{{modelInfo.model}}</span>  dataset:<span class="infotext">{{modelInfo.dataset}}</span>  Activation:<span class="infotext">{{modelInfo.act}}</span>  Regularization:<span class="infotext">{{modelInfo.reg}}</span></span>
          <span style="float:left">epoch:<span class="infotext">{{modelInfo.epoch}}</span>  batchSize:<span class="infotext">{{modelInfo.batchSize}}</span>  Learning Rate:<span class="infotext">{{modelInfo.lRate}}</span>  Regularization Rate:<span class="infotext">{{modelInfo.regRate}}</span></span>
          <span style="float:left">loss on test data:<span class="infotext">{{modelInfo.loss}}</span>  accuracy on test data:<span class="infotext">{{modelInfo.acc}}</span></span>
        </el-row>
        <!-- 图片显示 -->
        <el-row style="padding-top:20px;">
          <el-col :span="8" v-for="i in tempimgList">
            <img :src='i.url' width='190px'>
            <p style="margin-top:5px;padding-bottom:15px">{{i.text}}</p>
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
      imgList: [
        // {
        //   name: '', 
        //   url: ''
        // }, 
      ],
      tempimgList: [
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img1',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img2',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img3',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img4',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img5',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: 'img6',
        },
      ],
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
          label: 'MINIST',
          value: 'MINIST'
        }
      ],

      // 模型数据
      modelInfo: {
        model: 'LeNet',
        dataset: 'MINIST',
        epoch: 10,
        batchSize: 100,
        lRate: 0.0001,
        act: 0,
        reg: 0,
        regRate: 0.01,
        loss: 0,
        acc: 0,
      },


      // 表单数据
      params: {
        model: '', // 所选model
        dataset: 'MINIST', // 所选dataset
        radio: 'dataset', // 标记测试模式, "dataset" / "picture"
      }
    }
  },
  methods:{
    modelChange(){
      console.log("choosedModel")
      console.log(document.getElementById("choosedModel").value)
    },
    startTest(){
      var self = this
      var loss = 0
      var acc = 0
      var res = []
      this.$http.get('http://127.0.0.1:1234/eval/inference_on_existed_data/' + this.params["model"],{crossdomain: true})
      .then(function (response) {
        console.log(response)
        loss = response["data"][0][0]
        acc = response["data"][0][1]
        self.modelInfo["acc"] = acc
        self.modelInfo["loss"] = loss
        
        for(var i=0; i<self.tempimgList.length; i++){
          self.tempimgList[i]["text"] = response["data"][1][i][1]
          console.log(response["data"][1][i][0].replace("\\", "/"))
          self.tempimgList[i]["url"] = 'D:/人机交互/platform/platform/' + response["data"][1][i][0].replace("\\", "/")
        }
        
      })
      .catch((error)=> {
        console.log(error);
      });
    },  
    getDatasets(){
      axios.get('/datasets')
        .then(function (response) {
          this.datasets = response
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
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleChange(file, fileList){
      console.log(file)
    }
  },
  mounted(){
    var self = this
    var res = []
    this.$http.get('http://127.0.0.1:1234/existed_models',{crossdomain: true})
    .then(function (response) {
      
      self.models = []
      console.log(response["data"])
      for(var i=0;i<response["data"].length;i++){
        var keys = Object.keys(response["data"][i])
        self.models.push({label:response["data"][i][keys[0]][0] + "_" + response["data"][i][keys[0]][1] + "_" +  keys[0],value:keys[0]})
        console.log(keys[0])
        console.log(response["data"][i][keys[0]])
      }
      res = response
      
//      for(var i=0; i<)
    })
    .catch((error)=> {
      console.log(error);
    });


  }   
}
</script>

<style>
#title{
  background-color: #769897;
  height: 30px;
  line-height: 30px;
  color: white;
}
.el-upload-dragger{
  width: 100px;
}
.infotext{
  color: #528e6e;
  font-weight: bold
}
</style>
