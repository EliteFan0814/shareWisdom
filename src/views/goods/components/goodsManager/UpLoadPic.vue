<template>
  <el-card>
    <el-dialog iconClass="el-icon-info"
      title="上传图片"
      width="30%"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      center="true">
      <el-form :model="item"
        ref="form"
        label-position="right"
        label-width="100px">
        <el-form-item label="上传图片"
          class="upload">
          <el-upload class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadSectionFile">
            <img v-if="src"
              :src="src"
              class="avatar">
            <i v-else
              class="el-icon-plus avatar-uploader-icon"></i>
            <div>
              <i class="el-icon-info"></i>
              <span>点击图片重新上传</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      src: '',
      isDialog: true
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    close() {
      this.$emit('close')
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.src = res.data.filepath
      })
    },
    submit() {
      this.$http
        .post('/manage/goods_picarr/add', {
          thumb: this.src,
          goods_id: this.item.id
        })
        .then(res => {
          if (res.code == 1) {
            this.isDialog = false
          }
        })
    }
  }
}
</script>

<style>
.block {
  width: 70%;
  margin-left: 15px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  margin-left: 20px;
}
.avatar {
  width: 80%;
  height: 60%;
}
.u_editor {
  height: 500px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.leixing {
  width: 75%;
}
.duixiang {
  width: 80%;
}
</style>
