<template>
  <div>
    <el-dialog :title="`${item.title}商品相册`"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="60%"
      :center="true">
      <el-row :gutter="20">
        <el-col :span="4"
          v-for="item in form"
          :key="item.thumb"><img class="imgPic"
            :src="item.thumb"></el-col>
        <el-col :span="4">
          <div class="imgPic img"
            @click="addPic()">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadSectionFile">+
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <UpLoadPic v-if="isUploadShow"
      :item="item"
      @close="upClose"></UpLoadPic>
  </div>
</template>

<script>
import UpLoadPic from './UpLoadPic'

export default {
  components: {
    UpLoadPic
  },
  props: ['item'],
  data() {
    return {
      isUploadShow: false,
      isAddShow: false,
      isDialog: true,
      item1: {},
      form: [
        {
          id: 115,
          goods_id: 23,
          thumb:
            '/resource/picture/20190529/83b33107c14e725227b3e36134a1d346.jpg',
          picurl:
            'http://app.jdbtoy888.com//resource/picture/20190529/83b33107c14e725227b3e36134a1d346.jpg',
          goods_name:
            'HUAWEI P30 麒麟980 超感光徕卡三摄 屏内指纹 双屏录像 (极光色）'
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    getData() {
      // this.$http
      //   .get("/manage/goods_picarr/lists?goods_id=" + this.item.id)
      //   .then(res => {
      //     this.form = res.data.list;
      //   });
    },
    close() {
      this.$emit('close')
    },
    upClose() {
      this.getData()
      this.isUploadShow = false
    },
    add() {
      this.isAddShow = true
    },
    uploadSectionFile: function(param) {
      this.item1 = {}
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.item1.thumb = res.data.filepath
        this.form.push(this.item1)
      })
    }
  }
}
</script>
<style>
.sliderbox {
  display: flex;
  margin-left: 20px;
}
.inp {
  width: 85%;
}
.slider {
  width: 445px;
}
.textinp {
  width: 85%;
}
.quillEditor {
  margin-bottom: 50px;
  height: 100px;
}
</style>
<style scoped>
.quillEditor {
  height: 500px;
  margin-bottom: 50px;
}
.i {
  width: 30px;
  height: 30px;
  display: inline-block;
  font-size: 30px;
  color: white;
  line-height: 30px;
  background-color: #666;
  border-radius: 50%;
  margin-left: 30px;
  text-align: center;
  cursor: pointer;
}
.btn {
  position: relative;
  margin-left: 30px;
}
.imgPic {
  width: 150px;
  height: 150px;
  display: inline-block;
  margin: 10px 0;
  border-radius: 10px;
}
.img {
  border: 1px dashed gray;
  font-size: 50px;
  color: lightgray;
  text-align: center;
  line-height: 140px;
  cursor: pointer;
}
</style>
