<template>
  <div>
    <el-row>
      <!-- setting -->
      <el-col :span="8">
        <el-row id="title">
          <el-col :span="24"><div class="grid-content">Testing Settings</div></el-col>
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

}
</script>

<style>
#title{
  background-color: #769897;
  height: 30px;
  line-height: 30px;
  color: white;
}
</style>
