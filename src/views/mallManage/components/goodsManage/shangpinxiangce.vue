<template>
  <div>
    <el-dialog :title="`${item.name} 相册`"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="1000px"
      :center="true">
      <el-row :gutter="20"
        v-if="form.length > 0">
        <el-col :span="4"
          v-for="item in form"
          :key="item.thumb">
          <div style="position:relative">
            <img class="imgPic"
              :src="item.thumb">
            <!-- <div class="del el-icon-close" @click="delPic(item.id)"></div> -->
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="imgPic img">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadSectionFile"
            >+
            </el-upload>
          </div>
        </el-col> -->
      </el-row>
      <div class="xiangce"
        v-else>暂无相册展示</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      isUploadShow: false,
      isAddShow: false,
      isDialog: true,
      item1: {},
      form: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    delPic(id) {
      this.$http.post('/Manage/Goods_picarr/del', { id: id }).then(res => {
        this.getData()
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    getData() {
      this.$http
        .get('/Manage/Goods_picarr/lists?goods_id=' + this.item.id)
        .then(res => {
          this.form = res.data.list
        })
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
        this.item1.thumb = res.data.fileurl
        this.$http
          .post('/Manage/Goods_picarr/add', {
            goods_id: this.item.id,
            thumb: this.item1.thumb
          })
          .then(ress => {
            this.getData()
          })
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
  font-size: 20px;
  width: 20px;
  height: 20px;
  color: white;
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
.xiangce {
  text-align: center;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
}
</style>
