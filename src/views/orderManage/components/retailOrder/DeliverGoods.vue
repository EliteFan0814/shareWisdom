<template>
  <el-dialog :title="'订单编号：'+goods.id"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :center="true">
    <el-form :rules="rules"
      label-position="left"
      label-width="100px"
      :model="goods"
      ref="goods">
      <el-form-item label="快递公司"
        prop="expressCompany">
        <el-input class="inp"
          placeholder="填写快递公司"
          v-model="goods.expressCompany"></el-input>
      </el-form-item>
      <el-form-item label="运单号"
        prop="expressNumber">
        <el-input class="inp"
          placeholder="填写快递单号"
          v-model="goods.expressNumber"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['goods'],
  data() {
    return {
      dialogVisible: true,
      rules: {
        expressCompany: [
          {
            required: true,
            message: '请输入快递公司'
          }
        ],
        expressNumber: [
          {
            required: true,
            message: '请输入运单号'
          }
        ]
      }
    }
  },
  methods: {
    close(update) {
      this.dialogVisible = false
      this.$emit('close', update)
    },
    submit() {
      this.$refs.goods.validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('OrderId', this.goods.id)
        params.append('Express', this.goods.expressCompany),
          params.append('ExpressNumber', this.goods.expressNumber)
        this.$confirm('确认发货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/SellOrder/Express', params).then(res => {
            if (res.success) {
              this.$message({
                message: '已发货',
                type: 'success'
              })
              this.close(true)
            }
          })
        }).catch(()=>{
        this.$message('已取消！')
      })
      })
    }
  }
}
</script>

