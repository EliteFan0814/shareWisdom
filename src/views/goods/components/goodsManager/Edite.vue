<template>
  <el-dialog :title="item.title"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    width="50%"
    :center="true"
    @close="close">
    <el-form label-position="right"
      label-width="150px"
      :rules="rules"
      :model="editData"
      ref="editData">
      <el-form-item label="商品标题："
        prop="title">
        <el-input class="inp"
          v-model="editData.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="品牌名称">
        <el-input class="inp" v-model="editData.price"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="商品类型">
        <el-input class="inp" v-model="item.cate_name"></el-input>
      </el-form-item> -->
      <el-form-item label="所属分类："
        prop="cate_id">
        <el-select class="inp"
          v-model="editData.cate_id"
          placeholder="分类">
          <el-option v-for="item in fenleis"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格："
        prop="price">
        <el-input class="inp"
          v-model="editData.price"></el-input>
      </el-form-item>
      <el-form-item label="销量："
        prop="sales_number">
        <el-input class="inp"
          v-model.number="editData.sales_number"></el-input>
      </el-form-item>
      <!-- <el-form-item label="销量：">
        <el-input class="inp" v-model="editData.sales_number"></el-input>
      </el-form-item> -->
      <!-- 显示运费 -->
      <el-form-item label="运费："
        prop="shipfee">
        <el-input class="inp"
          v-model="editData.shipfee"></el-input>
      </el-form-item>
      <!-- <el-form-item label="推荐状态：">
        <el-radio v-model="pick" label='1'>推荐</el-radio>
        <el-radio v-model="pick" label='0'>不推荐</el-radio>
      </el-form-item>
      <el-form-item label="上架状态：">
        <el-radio v-model="status" label="1">显示</el-radio>
        <el-radio v-model="status" label="0">不显示</el-radio>
      </el-form-item> -->
      <el-form-item label="排序权重："
        prop="sort">
        <div class="block sliderbox">
          <el-slider class="slider"
            v-model="editData.sort"
            :max="255"
            show-input></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="上传缩略图："
        prop="thumb">
        <el-upload class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :http-request="uploadSectionFile">
          <img v-if="src"
            :src="src"
            class="avatar img">
          <i v-else>点击图片重新上传</i>
          <div></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容："
        prop="content">
        <editor id="ad"
          :content="editData.content"
          @changed="(value)=>{editData.content=value}"></editor>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="isDialog = false">取 消</el-button>
      <el-button type="primary"
        @click="submit(item)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Editor from '@/components/RichText'

export default {
  components: {
    Editor
  },
  props: ['item'],
  data() {
    return {
      pick: this.item.pick + '',
      status: this.item.status + '',
      isDialog: true,
      editData: {},
      src: '',
      fenlei: '',
      fenleis: [],
      rules: {
        title: [{ required: true, message: '请输入商品标题!' }],
        sort: [{ required: true, message: '请选择排序!' }],
        thumb: [{ required: true, message: '请上传缩略图!' }],
        price: [{ required: true, message: '请输入价格!' }],
        sales_number: [
          { required: true, message: '请输入销量!' },
          { type: 'number', message: '销量只能输入数字!' }
        ],
        content: [{ required: true, message: '请输入规格名称!' }],
        cate_id: [{ required: true, message: '请选择分类!' }],
        shipfee: [{ required: true, message: '请输入运费!' }],
        price: [{ required: true, message: '请输入价格!' }]
      }
    }
  },
  created() {
    this.getData()
    this.editData = this.item
    this.getFenLei()
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/goods/info', {
          params: {
            id: this.item.id
          }
        })
        .then(res => {
          this.editData = res.data.info
          this.src = this.editData.thumb
        })
    },
    getFenLei() {
      this.$http.get('/manage/goods_category/lists').then(res => {
        console.log(res)
        this.fenleis = res.data.list
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.src = res.data.filepath
      })
    },
    close() {
      this.$emit('close')
    },
    submit(item) {
      this.$refs.editData.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('title', this.editData.title)
        params.append('id', this.editData.id)
        params.append('thumb', this.src)
        params.append('price', this.editData.price)
        params.append('sort', this.editData.sort)
        params.append('cate_id', this.editData.cate_id)
        params.append('shipfee', this.editData.shipfee)
        params.append('sales_number', this.editData.sales_number)
        params.append('price_describe', this.item.editData)
        params.append('content', this.editData.content)

        this.$http.post('', params).then(res => {
          if (res.code == 1) {
            this.$emit('close', '1')
          }
        })
      })
      // this.$refs.editData.validate(valid => {
      //   if (!valid) return;
      // });
    }
  }
}
</script>
<style scoped>
.block {
  width: 70%;
  /* margin-left: 10px */
}
img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.inp {
  width: 90%;
}
.quillEditor {
  margin-bottom: 50px;
  margin-right: 10%;
  height: 400px;
}
</style>
<style scoped>
i {
  display: block;
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  line-height: 150px;
}
</style>



