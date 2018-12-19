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
                  action="http://127.0.0.1:1234/eval/inference"                                                  
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="imgList"
                  :auto-upload="false"
                  :data={Model_id:params.model}
                  :on-change="handleChange"
                  :on-success="uploadSuccess"
                  :limit=9
                  :disabled="params.radio==='dataset'">
                  <el-button :disabled="params.radio==='dataset'" slot="trigger" style="margin-left:-100px" size="small" plain>选取文件</el-button>
                  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                  <!--"https://jsonplaceholder.typicode.com/posts/"-->
                </el-upload>
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
        </el-row>
        <!-- 图片显示 -->
        
        <el-row style="padding-top:20px;">          
        <span id="testPerformance" style="float:left; display:none">loss on testSet:<span class="infotext">{{modelInfo.loss}}</span>     accuracy on testSet:<span class="infotext">{{modelInfo.acc}}</span></span>

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
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
      ],
      // content部分的当前选中 loss/accuracy
      activeName: 'loss',
      
      // 下拉菜单数据
      allModelInfo:{},
      models: [
        {
          label: 'model1',
          value: 'model11'
        },
        {
          label: 'model2',
          value: 'model22'
        },
        {
          label: 'model3',
          value: 'model33'
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
        act: "",
        reg: "",
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
      console.log("choosedModel");
      // 当前选中的值，将this.models中的value绑定到this.params.model中，可以在后者取到当前选中值
      console.log(this.params.model);
      this.modelInfo.model = this.allModelInfo[this.params.model][0]
      this.modelInfo.dataset = this.allModelInfo[this.params.model][1]
      this.modelInfo.batchSize = this.allModelInfo[this.params.model][3]
      this.modelInfo.lRate = this.allModelInfo[this.params.model][2]
      var acti = ""
      if(this.allModelInfo[this.params.model][4] == 0)
        acti = "sigmoid"
      else if(this.allModelInfo[this.params.model][4] == 1)
        acti = "relu"
      else
        acti = "tanh"
        //0为无正则，1为l1,2为l2   0,1,2(对应CNN,MLP,SVM
      this.modelInfo.act = acti
      var reg = ""
      if(this.allModelInfo[this.params.model][5] == 0)
        reg = "no regularization"
      else if(this.allModelInfo[this.params.model][5] == 1)
        reg = "l1"
      else
        reg = "l2"
      console.log(acti)
      console.log(reg)
      this.modelInfo.reg = reg
      this.modelInfo.regRate = this.allModelInfo[this.params.model][6]
      
    },
    startTest(){
      var self = this
      var loss = 0
      var acc = 0
      var res = []
      if(this.params.radio == "dataset")
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
          document.getElementById("testPerformance").style.display = ""
        })
        .catch((error)=> {
          console.log(error);
        });
      else{
        document.getElementById("testPerformance").style.display = "none"

        this.$refs.upload.submit();
      }
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
      this.$store.state.params = this.params;
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
    },
    uploadSuccess(response, file, fileList){
      this.tempimgList = [
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
        {
          url: 'D:/人机交互/platform/platform/',
          text: '',
        },
      ],
      console.log(response)
      for(var i=0; i<fileList.length; i++){
        this.tempimgList[i].url = fileList[i].raw.path
        this.tempimgList[i].text = response
      }
      
    },
  },
  mounted(){
    // 全局变量示例
    // 全局变量的设置在/src/store/index.js中
    // 将变量设置在Vuex.Store的state下
    
    // 全局变量的获取
    console.log(this.$store.state.globalVariable);

    // 全局变量的变更
//    this.$store.state.globalVariable = 'hello world';
    console.log(this.$store.state.globalVariable);

    // 一种解决页面退出后变量未保存的思路
    // 每次退出时，将本页Vue对象中data信息保存到全局变量，放在路由方法toHome()中
    // 进入时，从全局变量读取，将读取的语句放在mounted起始的位置
    console.log(this.$store.state.params);


    var self = this
    var res = []
    this.$http.get('http://127.0.0.1:1234/existed_models',{crossdomain: true})
    .then(function (response) {
      
      self.models = []
      console.log(response["data"])
      for(var i=0;i<response["data"].length;i++){
        var keys = Object.keys(response["data"][i])
        self.models.push({label:response["data"][i][keys[0]][0] + "_" + response["data"][i][keys[0]][1] + "_" +  keys[0],value:keys[0]})
        self.allModelInfo[keys[0]] = response["data"][i][keys[0]]
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
