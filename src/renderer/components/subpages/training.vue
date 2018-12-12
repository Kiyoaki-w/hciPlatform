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

        <!-- content -->
        <el-row v-if="activeName==='loss'">
          <el-col :span="24">
            Loss Img
          </el-col>
        </el-row>
        <el-row v-if="activeName==='accuracy'">
          <el-col :span="24">
            Accuracy Img
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
