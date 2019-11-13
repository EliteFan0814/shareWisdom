<template>
  <el-dialog title="添加商品"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :center="true"
    width="50%">
    <el-form :rules="rules"
      :model="item"
      ref="item"
      label-position="right"
      label-width="15%">
      <el-form-item label="商品标题："
        prop="name">
        <el-input class="inp"
          v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类："
        prop="value21">
        <el-select class="inp"
          v-model="item.value21"
          placeholder="分类">
          <el-option v-for="item1 in fenlei"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格："
        prop="price">
        <el-input class="inp"
          v-model="item.price"
          placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="运费："
        prop="shipfee">
        <el-input class="inp"
          v-model="item.shipfee"
          placeholder></el-input>
      </el-form-item>
      <el-form-item label="排序权重："
        prop="sort">
        <div>
          <el-slider class="slider"
            v-model="item.sort"
            :max="255"
            show-input></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="上传缩略图："
        prop="thumb">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadSectionFile">
          <img v-if="item.thumb"
            :src="item.thumb"
            class="avatar img">
          <i v-else>点击图片重新上传</i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容："
        prop="content">
        <!-- <quillEditor v-model="item.textarea" class="quillEditor"></quillEditor> -->
        <Editor id="tinymce"
          v-model="item.content"
          @changed="(value)=>{item.content=value}"
          class="quillEditor"></Editor>

      </el-form-item>
    </el-form>
    <span slot="footer"
      align="right"
      class="dialog-footer">
      <el-button @click="isDialog= false">取 消</el-button>
      <el-button type="primary"
        @click="submit('item')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import Editor from '@/components/RichText'
//import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    Editor
    //quillEditor
  },
  props: ['fenlei'],
  data() {
    return {
      item: {
        value21: '',
        content: '',
        value: '',
        shipfee: '',
        name: '',
        price: '',
        thumb: '',
        sort: 255,
        picurl: ''
      },
      src: '',
      isDialog: true,
      rules: {
        name: [
          {
            required: true,
            message: '请输入商品名称'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入商品价格'
          }
        ],
        thumb: [
          {
            required: true,
            message: '请上传缩略图'
          }
        ],
        shipfee: [
          {
            required: true,
            message: '请输入运费'
          }
        ],
        value21: [
          {
            required: true,
            message: '请选择分类'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容'
          }
        ]
      }
    }
  },
  methods: {
    // method:{
    //   tinymce.init({}),
    // },
    editorInit: {
      language_url: '/tinymce/zh_CN.js',
      language: 'zh_CN',
      skin_url: '/tinymce/skins/lightgray',
      height: 300
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.item.thumb = res.data.filepath
      })
    },
    close() {
      this.$emit('close')
    },
    submit() {
      if (this.item.price < 0) {
        this.$message.error('商品价格不能小于零!')
        return
      }
      if (this.item.shipfee < 0) {
        this.$message.error('运费不能小于零!')
        return
      }
      this.$refs.item.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('cate_id', this.item.value21)
        params.append('title', this.item.name)
        params.append('price', this.item.price)
        params.append('shipfee', this.item.shipfee)
        params.append('summary', '123')
        params.append('price_describe', '123')
        params.append('thumb', this.item.thumb)
        params.append('content', this.item.content)
        params.append('sort', this.item.sort)
        this.$http.post('', params).then(res => {
          this.$emit('getData', '1')
        })
      })
    }
  }
}
</script>

<style scoped>
.icon {
  border: 1px dashed #888;
  width: 200px;
  height: 200px;
  line-height: 200px;
}
.el-form-item__error {
  padding-left: 110px;
}
.block {
  width: 70%;
  margin-left: 80px;
}
img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.inp {
  width: 90%;
}
i {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border: 1px dashed black;
  display: block;
}
.fenlei {
  width: 80%;
  /* margin-left: 10px; */
}
.quillEditor {
  margin-bottom: 50px;
  margin-right: 10%;
  height: 400px;
}
.ship {
  margin-left: 30px;
}
</style>


