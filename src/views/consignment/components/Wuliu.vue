<template>
  <div>
    <el-dialog :title="'订单：'+propitem.id+' 的物流信息'"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="60%"
      :center="true">

      <el-table :data="form">
        <el-table-column label="状态">
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
        <el-table-column label="创建时间"
          align="center">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间"
          align="center">
          <template slot-scope="{row}">{{row.endDate}}</template>
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
  filters: {
    statusText(value) {
      if (value === -10) {
        return '订单取消'
      } else if (value === 30) {
        return '确认收货'
      } else if (value === 20) {
        return '已发货，待收货'
      } else if (value === 10) {
        return '待发货，已支付'
      } else if (value === 0) {
        return '待支付'
      } else {
        return '状态未知'
      }
    }
  },
  created() {},
  methods: {
    getData() {
      let value = ''
      if (this.item.delivery_arr) {
        value = this.item.delivery_arr.linkValue
      }
      this.$http
        .get('/manage/store_order/express?number=' + value)
        .then(res => {
          this.form = res.data.list
        })
    },
    close() {
      this.$emit('close')
    },
    submit() {
      //   let params = new URLSearchParams();
      //   params.append("id", this.item.id);
      //   params.append("title", this.item.title);
      //   params.append("content", this.textarea);
      //   params.append("thumb", this.item.thumb);
      //   params.append("cate", this.item.cate);
      //   this.$http.post("/manage/article/edit", params).then(res => {
      //     if (res.code == 1) {

      //     }
      //   });
      this.isDialog = false
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
