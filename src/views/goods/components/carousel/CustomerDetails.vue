<template>
  <el-card>
    <el-dialog iconClass="el-icon-info"
      title="新增轮播图"
      width="30%"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close">
      <el-form :model="item1"
        :rules="rules"
        ref="item1"
        label-position="right"
        label-width="100px">
        <el-form-item label="跳转类型"
          prop="value5">
          <el-select class="leixing"
            v-model="item1.value5"
            placeholder="跳转类型">
            <el-option v-for="item in leixing"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转对象"
          prop="value11">
          <el-select class="leixing"
            v-model="item1.value11"
            placeholder="跳转对象"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            reserve-keyword>
            <el-option v-for="item2 in chanpin"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <div v-if="this.value5=='GOODS' && this.value11=='LIST'">
          <el-form-item label="分类选择">
            <el-select class="leixing" v-model="value16" placeholder="跳转类型">
              <el-option
                v-for="item in shangpinfenlei"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="this.value5=='PRODUCT' && this.value11=='LIST'">
          <el-form-item label="分类选择">
            <el-cascader
              :props="props"
              expand-trigger="hover"
              :options="canpinfenlei"
              v-model="selectedOptions2"
            ></el-cascader>
          </el-form-item>
        </div>
        <div v-if="this.value5=='GOODS' && this.value11=='GOODS'">
          <el-form-item label="商品选择">
            <div>
              <el-select
                v-model="sp"
                filterable="true"
                remote="true"
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in shangpin"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>

        <div v-if="this.value5=='PRODUCT' && this.value11=='GOODS'">
          <el-form-item label="产品选择">
            <el-select
              v-model="cp"
              filterable="true"
              remote="true"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="method"
              :loading="loading"
            >
              <el-option
                v-for="item in chanpin"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div> -->

        <!-- <el-form-item v-for="item in del2" :key="item" class="duixiang" label="跳转对象" align="center">
          <el-input v-model="id"></el-input>
        </el-form-item> -->
        <el-form-item label="权重"
          prop="sort">
          <template>
            <div class="block">
              <el-slider :max="255"
                v-model="item1.sort"
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
              v-if="item1.thumb">
              <img :src="item1.thumb"
                class="avatar">
            </div>

            <div class="img"
              v-else>
              <span>点击图片重新上传</span>
            </div>
          </el-upload>
          <span class="test">提示: 请选择(宽:640, 高:320)的图片</span>
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
      item1: {
        value5: '',
        sort: 255,
        thumb: '',
        value11: ''
      },
      value: '',
      value16: '',
      src: '',
      isDialog: true,
      tabs: 0,
      todo: '',
      title: '',
      rules: {
        value5: [{ required: true, message: '请选择跳转类型!' }],
        sort: [{ required: true, message: '请选择排序!' }],
        thumb: [{ required: true, message: '请上传缩略图!' }],
        value11: [{ required: true, message: '请选择跳转对象!' }]
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
  },
  methods: {
    oChange() {
      if (this.value5 == 'GOODS' && this.value11 == 'LIST') {
        // this.del1.push({ id: 1 });
        // this.del2.splice(1)
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
          this.$http
            .get(
              '/manage/product/lists?page=1&rows=100&cate_id=&state=&pick&keywords=' +
                query
            )
            .then(res => {
              // this.shangpin = res.data.list;
              this.shangpin = res.data.list.map(item => {
                return { value: item.title, label: item.title }
              })
            })
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
          this.$http
            .get(
              '/manage/product/lists?page=1&rows=10&cate_id&state&pick&keywords=' +
                query
            )
            .then(res => {
              // this.shangpin = res.data.list;
              this.chanpin = res.data.list.map(item => {
                return { value: item.id, label: item.title }
              })
              console.log(this.chanpin)
            })
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
      this.$http.post('/manage/image/upload', form).then(res => {
        this.item1.thumb = res.data.filepath
      })
    },
    submit() {
      this.$refs.item1.validate(valid => {
        if (!valid) return
        this.$http
          .post('', {
            thumb: this.item1.thumb,
            sort: this.item1.sort,
            jump_id: this.item1.value11
            //jump_id: this.value16?this.value16:this.selectedOptions2[1]
          })
          .then(res => {
            if (res.msg == '添加成功') {
              this.$emit('close', '1')
            }
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
.test {
  font-size: 10px;
  margin-left: -15px;
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
</style>

