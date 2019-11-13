<template>
  <div>
    <el-dialog :title="`${form.title} 相册`"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="60%"
      :center="true">
      <el-row :gutter="20">
        <el-col :span="4"
          v-for="(picurl, index) in photos"
          :key="index">
          <div style="position:relative">
            <img class="imgPic"
              :src="picurl">
            <div class="del el-icon-close"
              @click="delPic(index)"></div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="imgPic img">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadSectionFile">+
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <UpLoadPic v-if="isUploadShow" :item="item" @close="upClose"></UpLoadPic> -->
  </div>
</template>

<script>
// import UpLoadPic from "./UpLoadPic";
export default {
  components: {
    // UpLoadPic
  },
  props: ['form'],
  data() {
    return {
      isUploadShow: false,
      isAddShow: false,
      isDialog: true,
      item1: {},
      photos: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    delPic(index) {
      this.photos.splice(index, 1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    getData() {
      this.photos = this.form.picarr
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
        this.item1.picurl = res.data.filepath
        console.log(this.item1.picurl)
        if (!this.photos) this.photos = []
        this.photos.push(this.item1.picurl)
        console.log(this.photos)
      })
    },
    submit() {
      let params = new URLSearchParams()
      // params.append('id',this.form.id)
      // params.append('data',this.photos)

      let data = {}
      data.id = this.form.id
      data.data = this.photos
      this.$http.post('/manage/info_list/updateThumb', data).then(res => {
        if (res.code == 1) {
          this.$emit('close', '1')
        }
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
  position: relative;
  margin: 10px 0;
  border-radius: 10px;
}
.del {
  position: absolute;
  font-size: 18px;
  width: 18px;
  height: 18px;
  color: gray;
  background: white;
  cursor: pointer;
  top: 15px;
  right: 20px;
  z-index: 100;
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
