<template>
  <el-card>
    <el-dialog iconClass="el-icon-info"
      :title="item1.type_name ? '修改规格类型' : '修改规格类型值'"
      width="30%"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      :center="true">
      <el-form :model="item1"
        :rules="rules"
        ref="item1"
        label-position="right"
        label-width="100px">
        <el-form-item class="duixiang"
          label="名称："
          :prop="item1.type_name ? 'type_name' : 'item_value'">
          <template>
            <el-input v-if="item1.type_name"
              v-model="item1.type_name"></el-input>
            <el-input v-else
              v-model="item1.item_value"></el-input>
          </template>
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
            @change="handleChange"
            :min="0"
          ></el-input-number>
        </el-form-item> -->
        <el-form-item v-if="!item1.type_name"
          class="duixiang"
          label="缩略图："
          prop="picurl">
          <el-upload v-model="item1.picurl"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile">
            <img v-if="item1.picurl"
              :src="item1.picurl"
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
          @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: ['item'],
  created() {
    this.src = this.item1.picurl
    this.item1 = this.item
    console.log(this.item1)
  },
  data() {
    return {
      item1: {},
      isDialog: true,
      tabs: 0,
      todo: '',
      title: '',
      rules: {
        type_name: [{ required: true, message: '请输入规格名称!' }],
        item_value: [{ required: true, message: '请输入规格名称!' }],
        picurl: [{ required: true, message: '请输选择上传图片!' }]
      },
      fileurl: '',
      leixing: [],
      src: ''
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
        this.item1.picurl = res.data.filepath
        console.log(this.item1)
      })
    },
    submit(item1) {
      this.$refs.item1.validate(valid => {
        console.log(valid)
        if (!valid) return
        let params = new URLSearchParams()
        if (this.item1.item_id) {
          params.append('item_id', this.item1.item_id)
          params.append('item_value', this.item1.item_value)
          params.append('picurl', this.item1.picurl)
          this.$http.post('/manage/goods_spec_item/edit', params).then(res => {
            if (res.code == 1) {
              this.$emit('close', '1')
            }
          })
        } else if (this.item1.spec_type_id) {
          params.append('spec_type_id', this.item1.spec_type_id)
          params.append('type_name', this.item1.type_name)
          this.$http.post('/manage/goods_spec_type/edit', params).then(res => {
            if (res.code == 1) {
              this.$emit('close', '1')
            }
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
}
.leixing {
  width: 75%;
}
.duixiang {
  width: 80%;
}
</style>

