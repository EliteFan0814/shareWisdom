<template>
  <el-dialog title="商品详情"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    width="950px"
    :center="true"
    @close="close">
    <el-form :model="item"
      ref="item"
      :rules="rules"
      label-position="right"
      label-width="180px">
      <el-form-item label="名称："
        prop="name">
        <el-input class="inp"
          placeholder="请输入名称"
          v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="零售价："
        prop="retailPrice">
        <el-input class="inp"
          placeholder="请输入零售价"
          v-model="item.retailPrice"></el-input>
      </el-form-item>
      <el-form-item label="批发价："
        prop="wholesalePrice">
        <el-input class="inp"
          placeholder="请输入批发价"
          v-model="item.wholesalePrice"></el-input>
      </el-form-item>
      <el-form-item label="期次限购数量"
        prop="periodLimit">
        <el-input class="inp"
          placeholder="请输入期次限购数量"
          v-model="item.periodLimit"></el-input>
      </el-form-item>
      <el-form-item label="期次库存"
        prop="periodCount">
        <el-input class="inp"
          placeholder="请输入期次库存"
          v-model="item.periodCount"></el-input>
      </el-form-item>
      <el-form-item label="批发价所需优惠券数量："
        prop="wholesaleCoupon">
        <el-input class="inp"
          placeholder="请输入优惠券数量"
          v-model="item.wholesaleCoupon"></el-input>
      </el-form-item>
      <el-form-item label="批发价所需芝麻数量："
        prop="wholesaleSesame">
        <el-input class="inp"
          placeholder="请输入芝麻数量"
          v-model="item.wholesaleSesame"></el-input>
      </el-form-item>
      <el-form-item label="缩略图："
        prop="thumb">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request="uploadSectionFile">
          <img v-if="item.thumb"
            :src="item.thumb"
            class="avatar img">
          <i v-else>点击图片重新上传</i>
        </el-upload>
      </el-form-item>
      <el-form-item label="图文详情："
        prop="content">
        <!-- <quillEditor v-model="item.textarea" class="quillEditor"></quillEditor> -->
        <Editor id="tinymce"
          :content="item.content"
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
import Editor from '@/components/RichText'

export default {
  components: {
    Editor
  },
  props: ['propitem', 'fenlei'],
  data() {
    return {
      isDialog: true,
      item: { content: '' },
      innerItem: {},
      rules: {
        name: [{ required: true, message: '请输入商品名称' }],
        retailPrice: [{ required: true, message: '请输入零售价' }],
        wholesalePrice: [{ required: true, message: '请输入批发价' }],
        periodLimit: [{ required: true, message: '期次限购数量' }],
        periodCount: [{ required: true, message: '期次库存' }],
        wholesaleCoupon: [
          { required: true, message: '请输入批发单件所需优惠券' }
        ],
        wholesaleSesame: [
          { required: true, message: '请输入批发单件所需芝麻' }
        ],
        thumb: [{ required: true, message: '请上传缩略图' }],
        content: [{ required: true, message: '请编写商品详情' }]
      }
    }
  },
  created() {
    this.innerItem = JSON.parse(JSON.stringify(this.propitem))
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/api/Goods/GetOne', {
          params: {
            goodsId: this.propitem.id
          }
        })
        .then(res => {
          this.item = res.value
        })
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },

    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('files', fileObj)
      this.$http
        .post('/api/Files/UploadFiles?isPublic=true', form)
        .then(res => {
          this.item.thumb = res.pathList[0]
        })
    },
    close() {
      this.$emit('close')
    },
    submit() {
      // if(this.item.price < 0){
      //   this.$message.error("商品价格不能小于零!")
      //   return
      // }
      // if(this.item.shipfee < 0){
      //   this.$message.error("运费不能小于零!")
      //   return
      // }
      this.$refs.item.validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('Id', this.item.id)
        params.append('Name', this.item.name)
        params.append('RetailPrice', this.item.retailPrice)
        params.append('periodLimit', this.item.periodLimit)
        params.append('periodCount', this.item.periodCount)
        params.append('WholesalePrice', this.item.wholesalePrice)
        params.append('WholesaleSesame', this.item.wholesaleSesame)
        params.append('WholesaleCoupon', this.item.wholesaleCoupon)
        params.append('Thumb', this.item.thumb)
        params.append('Content', this.item.content)
        params.append('Pics', this.item.pics)

        this.$http.post('/api/Goods/Modify', params).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.$emit('close', '1')
          }
        })
      })
    }
  }
}
</script>
<style scoped>
img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.inp {
  width: 90%;
}
.quillEditor {
  margin-bottom: 100px;
  height: 400px;
  width: 700px;
}
</style>



