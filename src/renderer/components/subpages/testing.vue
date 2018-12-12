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
                <el-select v-model="params.model" placeholder="choose a model">
                  <el-option v-for="i in models" :value="i.value" :label="i.label"></el-option>
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
                  :file-list="fileList"
                  :auto-upload="false"
                  :on-change="handleChange"
                  limit=1
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
                <el-button type="success" @click="">Start Testing</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <!-- result -->
      <el-col style="padding-left:2px" :span="16">
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Testing Results</div></el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      fileList: [
        // {
        //   name: '', 
        //   url: ''
        // }, 
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


      // 表单数据
      params: {
        model: '', // 所选model
        dataset: '', // 所选dataset
        radio: 'dataset', // 标记测试模式, "dataset" / "picture"
      }
    }
  },
  methods:{
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
  width: 100px
}
</style>
