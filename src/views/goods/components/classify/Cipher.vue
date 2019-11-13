<template>
  <div>
    <el-dialog @close="close"
      :title="form.classname"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      width="800px"
      :center="true">
      <el-form :model="form"
        ref="form"
        :rules="rules"
        label-position="right"
        label-width="100px">
        <el-form-item label="栏目类型"
          prop="infotype">
          <el-select class="inp"
            disabled
            v-model="form.infotype_str">
            <el-option v-for="type in types"
              :key="type.value"
              :label="type.label"
              :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属栏目">
          <el-input class="inp"
            disabled
            v-model="form.parent_name"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称"
          prop="classname">
          <el-input class="inp"
            v-model="form.classname"></el-input>
        </el-form-item>
        <el-form-item label="排序"
          prop="orderid">
          <div>
            <el-slider class="inp"
              v-model="form.orderid"
              :max="255"
              show-input></el-slider>
          </div>
        </el-form-item>

        <el-form-item label="跳转链接">
          <el-input class="inp"
            v-model="form.linkurl"></el-input>
        </el-form-item>
        <el-form-item label="SEO">
          <el-input class="inp"
            v-model="form.seotitle"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input class="inp"
            v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
            autosize
            class="inp"
            v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile">
            <div v-if="form.picurl">
              <img :src="form.picurl">
            </div>

            <div class="img"
              v-else>
              <i class="el-icon-info"></i>
              <span>点击上传图片</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button slot="footer"
        type
        @click="close">取消</el-button>
      <el-button slot="footer"
        type="primary"
        @click="edit()">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['form', 'types'],
  created() {
    // console.log(this.form);
  },
  data() {
    return {
      isDialog: true,
      rules: {
        infotype: [{ required: true, message: '请输入栏目类型' }],
        classname: [{ required: true, message: '请输入栏目名称' }],
        picurl: [{ required: true, message: '请上传图片' }],
        linkurl: [{ required: true, message: '请输入跳转链接' }],
        orderid: [{ required: true, message: '请选择排序' }]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.form.picurl = res.data.filepath
      })
    },
    edit() {
      this.$refs.form.validate(value => {
        if (!value) return
        let params = new URLSearchParams()
        params.append('id', this.form.id)
        params.append('parent_id', this.form.parentid)
        params.append('linkurl', this.form.linkurl)
        params.append('picwidth', this.form.picwidth)
        params.append('picheight', this.form.picheight)
        params.append('seotitle', this.form.seotitle)
        params.append('keywords', this.form.keywords)
        params.append('description', this.form.description)
        params.append('infotype', this.form.infotype)
        params.append('classname', this.form.classname)
        params.append('picurl', this.form.picurl)
        params.append('orderid', this.form.orderid)
        this.$http.post('/manage/Info_class/edit', params).then(res => {
          if (res.code == 1) {
            this.$emit('close', '1')
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.btnbox {
  text-align: center;
}
.btn {
  display: inline-block;
  width: 70%;
}
.btn.pay {
  position: relative;
  margin-left: -3px;
}
.btn:nth-of-type(2) {
  margin-top: 10px;
}
.inp {
  border: none;
  width: 90%;
}
.img {
  width: 200px;
  height: 200px;
  border: 1px dashed #666;
  line-height: 200px;
}
img {
  width: 200px;
  height: 200px;
}
</style>

