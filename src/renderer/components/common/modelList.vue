<template>
  <div>
    <el-row id="title">
      <el-col :span="24"><div class="grid-content">Model List</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="singleTable"
          :data="tableData"
          :height="tableHeight"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            width="40">
          </el-table-column>
          <el-table-column
            property="model"
            label="Model"
            width="100">
          </el-table-column>
          <el-table-column
            property="status"
            label="Status"
            width="100">
          </el-table-column>
          <el-table-column
            property="label"
            label="Label"
            width="130">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row id="btns">
      <el-col :span="24">
        <el-button plain @click="toTraining">To Train Page</el-button>
        <el-button plain @click="toTesting">To Test Page</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    var __this = this;
    return{
      tableData: [
        {
          model: 'model1',
          status: 'status',
          label: 'label',
        },
        {
          model: 'model2',
          status: 'status',
          label: 'label',
        },
        {
          model: 'model3',
          status: 'status',
          label: 'label',
        },
        {
          model: 'model4',
          status: 'status',
          label: 'label',
        },    
        {
          model: 'model5',
          status: 'status',
          label: 'label',
        },
        {
          model: 'model6',
          status: 'status',
          label: 'label',
        },   
        {
          model: 'model7',
          status: 'status',
          label: 'label',
        },
        {
          model: 'model8',
          status: 'status',
          label: 'label',
        }, 
      ],
      currentRow: null,
      tableHeight: '420px', 
    }
  },
  methods:{
    toTraining(){
      this.$router.push('/training');
    },
    toTesting(){
      this.$router.push('/testing');
    }
  },
  mounted(){
    var __this = this;
    
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
#btns{
  text-align: center;
  line-height: 100px
}
</style>