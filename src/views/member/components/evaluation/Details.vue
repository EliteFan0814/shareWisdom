<template>
  <el-dialog :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :title="form.nickname"
    width="500px"
    :center="true">
    <el-form :model="data"
      label-position="right"
      label-width="100px">
      <el-form-item label="评价图片">
        <img src="@/icons/png/logo.jpg">
      </el-form-item>
      <el-form-item label="评价内容">
        <el-input readonly
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="form.qrcode_str"></el-input>
      </el-form-item>
      <el-form-item label="回复内容">
        <el-input readonly
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
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
      data: {}
    }
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/member/info?id=' + this.form.member_id)
        .then(res => {
          this.data = res.data.info
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
}
</style>



