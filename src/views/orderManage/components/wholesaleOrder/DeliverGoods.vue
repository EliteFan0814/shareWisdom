<template>
  <el-dialog :title="'订单编号：'+goods.order_sn"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :center="true"
    @close="close">
    <el-form :rules="rules"
      label-position="left"
      label-width="100px"
      :model="goods"
      ref="goods">
      <el-form-item label="快递公司"
        prop="express_type">
        <el-input class="inp"
          placeholder="填写快递公司"
          v-model="goods.express_type"></el-input>
      </el-form-item>
      <el-form-item label="运单号"
        prop="express_number">
        <el-input class="inp"
          placeholder="填写快递单号"
          v-model="goods.express_number"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
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
        express_type: [
          {
            required: true,
            message: '请输入快递公司'
          }
        ],
        express_number: [
          {
            required: true,
            message: '请输入运单号'
          }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.goods.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('order_id', this.goods.order_id)
        params.append('express_number', this.goods.express_number),
          params.append('express_type', this.goods.express_type)
        this.$http.post('/manage/goods_order/deliver', params).then(res => {
          if (res.code == 1) {
            this.dialogVisible = false
          }
        })
      })
    }
  }
}
</script>

