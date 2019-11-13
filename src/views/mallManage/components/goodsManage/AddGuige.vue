<template>
  <el-card>
    <el-dialog iconClass="el-icon-info"
      :title="item1.type_name ? '添加规格类型值' : '添加规格类型'"
      width="35%"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      :center="true">
      <el-form :model="item"
        :rules="rules"
        ref="item"
        label-position="right"
        label-width="25%">
        <el-form-item class="duixiang"
          label="名称："
          prop="name">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <!-- <el-form-item class="duixiang" label="权重：" prop="sort">
          <template>
            <div>
              <el-slider :max="255" v-model="item.sort" show-input></el-slider>
            </div>
          </template>
        </el-form-item>
        <el-form-item class="duixiang" label="价格：" prop="price">
          <el-input-number
            v-model="item.price"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item> -->
        <el-form-item v-if="item1.type_name"
          class="duixiang"
          label="缩略图："
          prop="thumb">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :http-request="uploadSectionFile">
            <img v-if="item.thumb"
              :src="item.thumb"
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
        <el-button type
          @click="isDialog = false">取消</el-button>
        <el-button type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: ['item1'],
  data() {
    return {
      item: {
        price: 0,
        name: '',
        sort: 255,
        thumb: ''
      },
      isDialog: true,
      tabs: 0,
      todo: '',
      title: '',
      rules: {
        name: [{ required: true, message: '请输入规格名称!' }],
        sort: [{ required: true, message: '请选择排序!' }],
        thumb: [{ required: true, message: '请上传缩略图!' }],
        price: [{ required: true, message: '请输入价格!' }]
      },
      fileurl: '',
      leixing: []
    }
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    close() {
      this.$emit('close')
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.item.thumb = res.data.filepath
      })
    },
    submit() {
      console.log(this.item1)

      this.$refs.item.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        if (this.item1.id) {
          params.append('goods_id', this.item1.id)
          params.append('type_name', this.item.name)
          this.$http.post('/manage/goods_spec_type/add', params).then(res => {
            this.$emit('close', '1')
          })
        } else if (this.item1.spec_type_id) {
          params.append('spec_type_id', this.item1.spec_type_id)
          params.append('item_value', this.item.name)
          params.append('picurl', this.item.thumb)
          this.$http.post('/manage/goods_spec_item/add', params).then(res => {
            this.$emit('close', '1')
          })
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
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.leixing {
  width: 75%;
}
.duixiang {
  width: 90%;
}
</style>

