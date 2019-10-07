<template>
<div class="dashboard">
  <el-row :gutter="12">
    <el-col :span="16">
      <el-row style="margin-bottom:10px;">
        <el-col :span="24">
          <el-card shadow="always">
            传感器在线数据
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-card shadow="always">
            传感器1
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="always">
            传感器2
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-col :span="24">
        <el-card shadow="always">
          数据统计量
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</div>
</template>

<script>

</script>

<style lang="scss" scoped>
.dashboard{
  padding:10px 10px 0px 10px;
}
</style>