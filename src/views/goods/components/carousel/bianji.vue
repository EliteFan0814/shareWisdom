<template>
  <el-card>
    <el-dialog iconClass="el-icon-info"
      title="编辑轮播图"
      width="30%"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close">
      <el-form :model="item"
        :rules="rules"
        ref="item"
        label-position="right"
        label-width="100px">
        <el-form-item label="轮播图类型"
          prop="type">
          <el-select class="leixing"
            v-model="item.type"
            placeholder="跳转类型">
            <el-option v-for="item in leixing"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转对象"
          prop="jump_name">
          <el-select class="leixing"
            v-model="item.jump_name"
            placeholder="跳转对象"
            filterable
            remote
            :remote-method="remoteMethod">
            <el-option v-for="item in chanpin"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权重"
          prop="sort">
          <template>
            <div class="block">
              <el-slider :max="255"
                v-model="item.sort"
                show-input></el-slider>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="缩略图"
          prop="thumb">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile">
            <div class="src"
              v-if="item.thumb">
              <img :src="item.thumb"
                class="avatar">
            </div>

            <div class="img"
              v-else>
              <span>点击图片重新上传</span>
            </div>
          </el-upload>
          <span class="test1">提示: 请选择(宽: 640, 高: 320) 的图片</span>
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
import { constants } from 'crypto'
export default {
  props: ['item'],
  mounted() {
    this.value5 = this.item.type
    this.value11 = this.item.jump_type

    this.value16 = this.item.jump_name

    this.selectedOptions2[1] = this.jump_id
    this.selectedOptions2[0] = this.jump_id

    this.cp = this.item.title
    this.sp = this.item.title
  },
  data() {
    return {
      cp: '',
      loading: false,
      sp: '',
      shangpin: [],
      chanpin: [],
      canpinfenlei: [],
      props: {
        children: 'child'
      },
      selectedOptions2: [],
      show: false,
      id: '',
      sort: 255,
      value: '',
      value5: '',
      value11: '',
      value16: '',
      src: '',
      isDialog: true,
      tabs: 0,
      todo: '',
      title: '',
      rules: {
        type: [{ required: true, message: '请选择跳转类型!' }],
        sort: [{ required: true, message: '请选择排序!' }],
        thumb: [{ required: true, message: '请上传缩略图!' }],
        jump_type: [{ required: true, message: '请选择跳转对象!' }],
        jump_name: [{ required: true, message: '请选择产品!' }]
      },
      fileurl: '',
      del1: [],
      del2: [],
      shangpinfenlei: [],
      leixing: [
        {
          label: '商品',
          value: 'GOODS'
        },
        {
          label: '产品',
          value: 'PRODUCT'
        }
      ],
      tiaozhuanduixiang: [
        {
          label: '分类',
          value: 'CATES'
        },
        {
          label: '列表',
          value: 'LIST'
        },
        {
          label: '商品',
          value: 'GOODS'
        }
      ]
    }
  },
  created() {
    this.getSPFL()
    this.getCPFL()
    this.src = this.item.thumb
  },
  methods: {
    oChange() {
      if (this.item.type == 'GOODS' && this.item.jump_type == 'LIST') {
      }
    },
    getSPFL() {
      // this.$http.get("/manage/goods_category/lists").then(res => {
      //   this.shangpinfenlei = res.data.list;
      // });
    },
    getCPFL() {
      // this.$http.get("/manage/product_category/lists").then(res => {
      //   this.canpinfenlei = res.data.list;
      // });
    },
    // remoteMethod() {},
    remoteMethod1(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          // this.$http
          //   .get(
          //     "/manage/goods/lists?page=1&rows=100&cate_id=&state=&pick&keywords=" +
          //       query
          //   )
          //   .then(res => {
          //     // this.shangpin = res.data.list;
          //     this.shangpin = res.data.list.map(item => {
          //       return { value: item.title, label: item.title };
          //     });
          //   });
        }, 300)
      } else {
        this.shangpin = []
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          // this.$http
          //   .get(
          //     "/manage/product/lists?page=1&rows=10&cate_id&state&pick&keywords=" +
          //       query
          //   )
          //   .then(res => {
          //     // this.shangpin = res.data.list;
          //     this.chanpin = res.data.list.map(item => {
          //       return { value: item.id, label: item.title };
          //     });
          //   });
        }, 100)
      } else {
        this.chanpin = []
      }
    },
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
      // this.$http.post("/manage/image/upload", form).then(res => {
      //   this.item.thumb = res.data.filepath;
      // });
    },
    submit() {
      this.$refs.item.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('id', this.item.id)
        params.append('sort', this.item.sort)
        params.append('thumb', this.item.thumb)
        //params.append("type", this.item.type);
        //params.append("jump_type", this.item.jump_type);
        params.append('jump_id', this.item.jump_name)
        this.$http.post('', params).then(res => {
          this.$emit('close', '1')
        })
      })
    }
  }
}
</script>

<style>
.block {
  width: 70%;
  /* margin-left: 15px */
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
<style scopde>
.img {
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  line-height: 150px;
}
img {
  width: 150px;
  height: 150px;
}
.src {
  width: 200px;
  height: 200px;
}
.test1 {
  font-size: 10px;
}
</style>

