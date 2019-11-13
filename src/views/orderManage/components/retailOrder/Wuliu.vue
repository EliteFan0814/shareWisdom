<template>
  <div>
    <el-dialog :title="'订单：'+propitem.id+' 的物流信息'"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="50%"
      :center="true">

      <el-table :data="form">
        <el-table-column label="物流状态"
          align="center">
          <template slot-scope="{row}">{{row.statusStr}}</template>
        </el-table-column>
        <el-table-column label="快递公司"
          align="center">
          <template slot-scope="{row}">{{row.expressCompany}}</template>
        </el-table-column>
        <el-table-column label="运单号"
          align="center">
          <template slot-scope="{row}">{{row.expressNumber}}</template>
        </el-table-column>
        <el-table-column label="发货日期"
          align="center">
          <template slot-scope="{row}">{{row.expressDate}}</template>
        </el-table-column>
        <el-table-column label="确认收货日期"
          align="center">
          <template slot-scope="{row}">{{row.confirmDate}}</template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ['propitem'],
  data() {
    return {
      isDialog: true
    }
  },
  computed: {
    form() {
      return [this.propitem]
    }
  },
  created() {},
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
.sliderbox {
  display: flex;
  margin-left: 20px;
}
.inp {
  width: 85%;
}
.slider {
  width: 445px;
}
.textinp {
  width: 85%;
}
.quillEditor {
  margin-bottom: 50px;
  height: 100px;
}
</style>
<style scoped>
.quillEditor {
  height: 500px;
  margin-bottom: 50px;
}
.i {
  width: 30px;
  height: 30px;
  display: inline-block;
  font-size: 30px;
  color: white;
  line-height: 30px;
  background-color: #666;
  border-radius: 50%;
  margin-left: 30px;
  text-align: center;
  cursor: pointer;
}
.btn {
  position: relative;
  margin-left: 30px;
}
</style>
