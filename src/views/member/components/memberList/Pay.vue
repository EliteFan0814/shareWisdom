<template>
  <el-dialog :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :title="'给 '+form.name+' 充值'"
    width="500px"
    :center="true">
    <el-form :model="item"
      :rules="rules"
      ref="item"
      label-position="right"
      label-width="100px">
      <el-form-item label="充值类型："
        prop="chargeType">
        <el-select class="inp"
          v-model="item.chargeType"
          placeholder="选择类型">

          <el-option v-for="item in RechargeType"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额："
        prop="chargeValue">
        <el-input class="inp"
          v-model="item.chargeValue"
          placeholder="请输入金额"></el-input>
      </el-form-item>
      <!-- <el-form-item label="备注：">
        <el-input class="inp"
          v-model="item.remark"
          placeholder="请输入备注"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer">
      <el-button type
        @click="isDialog = false">取消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  created() {
    // this.getData();
  },
  props: ['form'],
  data() {
    return {
      isDialog: true,
      item: {
        chargeType: '',
        chargeValue: ''
      },
      number: 0,
      rules: {
        chargeType: [{ required: true, message: '请选择充值类型' }],
        chargeValue: [{ required: true, message: '请输入充值金额' }]
      },
      RechargeType: [
        { label: '芝麻', value: 'Sesame' },
        { label: '优惠券', value: 'Coupon' },
        { label: '奖金', value: 'Bnous' }
      ]
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      let params = new FormData()
      params.append('memberId', this.form.id)
      params.append('ChargeValue', this.item.chargeValue)
      params.append('ChargeType', this.item.chargeType)
      this.$http.post('/api/MemberCharge/Charge', params).then(res => {
        if (res.success) {
          this.$message({
            message: '恭喜你，充值成功',
            type: 'success'
          })
          this.$emit('close', '1')
        }
      })
    },
    submit() {
      this.$refs.item.validate(valid => {
        if (!valid) return
        this.getData()
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
.inp {
  border: none;
  height: 40px;
  width: 90%;
}
</style>



