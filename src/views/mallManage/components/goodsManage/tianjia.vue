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
      <el-form-item label="名称："
        prop="name">
        <el-input class="inp"
          placeholder="请输入名称"
          v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="零售价："
        prop="retailPrice">
        <el-input class="inp"
          v-model="item.retailPrice"
          placeholder="请输入零售价"></el-input>
      </el-form-item>
      <el-form-item label="批发价："
        prop="wholesalePrice">
        <el-input class="inp"
          v-model="item.wholesalePrice"
          placeholder="请输入批发价"></el-input>
      </el-form-item>
      <el-form-item label="期次限购数量"
        prop="periodLimit">
        <el-input class="inp"
          v-model="item.periodLimit"
          placeholder="请输入期次限购数量"></el-input>
      </el-form-item>
      <el-form-item label="期次库存"
        prop="periodCount">
        <el-input class="inp"
          v-model="item.periodCount"
          placeholder="请输入期次库存"></el-input>
      </el-form-item>
      <el-form-item label="批发价所需优惠券数量："
        prop="wholesaleCoupon">
        <el-input class="inp"
          v-model="item.wholesaleCoupon"
          placeholder="请输入优惠券数量"></el-input>
      </el-form-item>
      <el-form-item label="批发价所需芝麻数量："
        prop="wholesaleSesame">
        <el-input class="inp"
          v-model="item.wholesaleSesame"
          placeholder="请输入芝麻数量"></el-input>
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
    let self = this
    return {
      prop_good: {
        //lazy: true,
        expandTrigger: 'hover',
        value: 'id',
        label: 'name'
        // lazyLoad(node, resolve){
        //   if(node.level <2){
        //     self.$http.get("/manage/category/lists?id=" + node.value).then(res => {
        //     const nodes = res.data.list.map(o1 => {
        //         return {value: o1.id, label: o1.name};
        //     });
        //     resolve(nodes);
        //     });
        //   }else{
        //     resolve('')
        //   }
        // }
      },
      item: {
        name: '',
        retailPrice: '',
        wholesalePrice: '',
        periodLimit: '',
        periodCount: '',
        wholesaleCoupon: '',
        wholesaleSesame: '',
        thumb: '',
        content: '',
        pics: ''
        // value21: [],
        // value: "",
        // price_maket: "",
        // price_member: "",
        // price_store: "",
        // price_agent: "",
        // limit_store: "",
        // limit_member: "",
        // limit_agent: "",
        // score: "",
        // sort: 255,
        // picurl: ""
      },
      src: '',
      isDialog: true,
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
        // pics: [{required: true,message: "请上传商品轮播图"}]
        // thumb: [{required: false,message: "请上传缩略图"}],
        // price_member: [{required: true,message: "请输入会员价"}],
        // value21: [{required: true,message: "请选择分类"}],
        // content: [{required: true,message: "请输入内容"}],
        // price_store: [{required: true,message: "请输入会员价"}],
        // price_agent: [{required: true,message: "请输入代理价"}],
        // limit_store: [{required: true,message: "请输入用户限购数量"}],
        // limit_member: [{required: true,message: "请输入店铺限购量"}],
        // limit_agent: [{required: true,message: "请输入代理限购"}],
        // score: [{required: true,message: "请输入商品积分"}],
      }
    }
  },
  methods: {
    // method:{
    //   tinymce.init({}),
    // },
    // editorInit: {
    //   language_url: '/tinymce/zh_CN.js',
    //   language: 'zh_CN',
    //   skin_url: '/tinymce/skins/lightgray',
    //   height: 300
    // },
    // handleAvatarSuccess(res, file) {
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
        // let params = new URLSearchParams();
        params.append('Name', this.item.name)
        params.append('RetailPrice', this.item.retailPrice)
        params.append('WholesalePrice', this.item.wholesalePrice)
        params.append('periodLimit', this.item.periodLimit)
        params.append('periodCount', this.item.periodCount)
        params.append('WholesaleCoupon', this.item.wholesaleCoupon)
        params.append('WholesaleSesame', this.item.wholesaleSesame)
        params.append('Thumb', this.item.thumb)
        params.append('Content', this.item.content)
        params.append('Pics', this.item.pics)
        // params.append("cate_id", this.item.value21[this.item.value21.length-1]);
        // params.append("name", this.item.name);
        // params.append("price", this.item.price);
        // params.append("price_maket", this.item.price_maket);
        // params.append("price_member", this.item.price_member);
        // params.append("price_store", this.item.price_store);
        // params.append("price_agent", this.item.price_agent);
        // params.append("limit_store", this.item.limit_store);
        // params.append("limit_member", this.item.limit_member);
        // params.append("limit_agent", this.item.limit_agent);
        // params.append("score", this.item.score);
        // params.append("thumb", this.item.thumb);
        // params.append("content", this.item.content);
        // params.append("sort", this.item.sort);
        this.$http.post('/api/Goods/Create', params).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '添加成功!'
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


