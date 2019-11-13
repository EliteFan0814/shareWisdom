<template>
  <div>
    <el-dialog @close="close"
      :title="form.id ? '添加子栏目' : '添加栏目菜单'"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      width="800px"
      :center="true">
      <el-form :model="item"
        ref="item"
        :rules="rules"
        label-position="right"
        label-width="100px">
        <el-form-item label="栏目类型"
          prop="infotype">
          <el-select class="inp"
            v-model="item.infotype">
            <el-option v-for="type in types"
              :key="type.value"
              :label="type.label"
              :value="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.parentid == 0"
          label="所属栏目">
          <el-input class="inp"
            disabled
            v-model="form.classname"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称"
          prop="classname">
          <el-input class="inp"
            v-model="item.classname"></el-input>
        </el-form-item>
        <el-form-item label="排序"
          prop="orderid">
          <div>
            <el-slider class="inp"
              v-model="item.orderid"
              :max="255"
              show-input></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input class="inp"
            v-model="item.linkurl"></el-input>
        </el-form-item>
        <el-form-item label="SEO">
          <el-input class="inp"
            v-model="item.seotitle"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input class="inp"
            v-model="item.keywords"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
            autosize
            class="inp"
            v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile">
            <div v-if="item.picurl">
              <img :src="item.picurl">
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
        @click="invest()">确 定</el-button>
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
      item: {
        infotype: '',
        classname: '',
        picurl: '',
        orderid: 255,
        keywords: '',
        seotitle: '',
        linkurl: '',
        description: ''
      },
      rules: {
        infotype: [{ required: true, message: '请输入栏目类型' }],
        classname: [{ required: true, message: '请输入栏目名称' }],
        linkurl: [{ required: true, message: '请输入跳转链接' }],
        picurl: [{ required: true, message: '请上传图片' }],
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
        this.item.picurl = res.data.filepath
      })
    },
    invest() {
      this.$refs.item.validate(value => {
        if (!value) return
        let params = new URLSearchParams()
        params.append('parent_id', this.form.id ? this.form.id : 0)
        params.append('infotype', this.item.infotype)
        params.append('classname', this.item.classname)
        params.append('picurl', this.item.picurl)
        params.append('linkurl', this.item.linkurl)
        params.append('picwidth', '')
        params.append('picheight', '')
        params.append('seotitle', this.item.seotitle)
        params.append('keywords', this.item.keywords)
        params.append('description', this.item.description)
        params.append('orderid', this.item.orderid)
        this.$http.post('/manage/Info_class/add', params).then(res => {
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

