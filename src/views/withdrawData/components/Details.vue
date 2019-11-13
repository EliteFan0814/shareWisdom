<template>
  <el-dialog :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :title="details.member_info.account"
    width="450px"
    :center="true">
    <el-form :model="detailsData"
      label-position="left"
      label-width="100px">
      <el-form-item class="inp"
        label="会员名称">
        <el-input :disabled="true"
          v-model="details.member_info.account"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="会员账号">
        <el-input :disabled="true"
          v-model="details.account"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="手机号码">
        <el-input :disabled="true"
          v-model="details.member_info.phone"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="真实姓名">
        <el-input :disabled="true"
          v-model="details.member_info.phone"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="提现金额">
        <el-input :disabled="true"
          v-model="details.apply_amount"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="提现方式">
        <el-input :disabled="true"
          v-model="details.type"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="手续费">
        <el-input :disabled="true"
          v-model="details.taxfee"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="提现账号">
        <el-input :disabled="true"
          v-model="details.member_info.tx_account"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="申请提现时间">
        <el-input :disabled="true"
          v-model="details.create_time"></el-input>
      </el-form-item>
      <el-form-item class="inp"
        label="审批时间">
        <el-input :disabled="true"
          v-model="details.check_time"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: ['detailsData'],
  created() {
    this.getData()
  },
  data() {
    return {
      details: {},
      isDialog: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getData() {
      this.$http
        .get('/manage/cash/info', {
          params: {
            id: this.detailsData.id
          }
        })
        .then(res => {
          this.details = res.data.info
        })
    }
  }
}
</script>

