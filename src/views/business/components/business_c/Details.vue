<template>
  <el-dialog
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :title="form.title+' 详情'"
    
    width="800px"
    :center="true"
  >
     <el-form :model="data" label-position="right" ref="data" :rules="rules" label-width="15%">
      <el-form-item label="栏目：">
        <el-input class="inp" disabled v-model="data.classname"></el-input>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input class="inp" v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile"
          >
            <div class="img" v-if="data.picurl">
              <img :src="data.picurl" class="avatar">
            </div>

            <div class="img" v-else>
              <span>点击图片重新上传</span>
            </div>
          </el-upload>
          <!-- <span class="test">提示: 请选择(宽:640, 高:320)的图片</span> -->
      </el-form-item>
      <el-form-item label="排序：">
        <div class="sliderbox">
          <el-slider class="inp" v-model="data.orderid" :max="255" show-input></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="跳转链接：">
        <el-input class="inp" v-model="data.linkurl"></el-input>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input class="inp" v-model="data.keywords"></el-input>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input class="inp" v-model="data.description"></el-input>
      </el-form-item>
      
      <el-form-item label="点击次数：">
        <el-input class="inp" v-model="data.hits"></el-input>
      </el-form-item>
      <el-form-item label="详细内容：">
        <Editor class="inp richText" id="tinymce" :content="data.content" @changed="(value)=>{this.data.content=value}"></Editor>
      </el-form-item>
       <!-- <el-form-item label="更新时间：">
        <el-input class="inp" v-model="data.posttime"></el-input>
      </el-form-item> -->
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Editor from '@/components/RichText'
export default {
  components:{
    Editor
  },
  created() {
    this.getData();
  },
  props: ["form"],
  data() {
    return {
      isDialog: true,
      data: {},
      rules : {
        classid: [{ required: true, message: '请选择栏目' }],
        title: [{ required: true, message: '请输入标题'}],
        picurl: [{ required: true, message: '请上传缩略图'}],
        linkurl: [{ required: true, message: '请输入跳转链接' }],
        keywords: [{ required: true, message: '请输入关键字'}],
        description: [{ required: true, message: '请输入描述' }],
        content: [{ required: true, message: '请输入内容'}],
        orderid: [{ required: true, message: '请选择排序'}],
        hits: [{ required: true, message: '请输入标题' }],
      }
    };
  },
  methods: {
    getData() {
      this.$http
        .get("/manage/info_list/info?id=" + this.form.id)
        .then(res => {
          this.data = res.data.info;
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file;
      var form = new FormData();
      form.append("file", fileObj);
      this.$http.post("/manage/image/upload", form).then(res => {
        this.data.picurl = res.data.filepath;
      });
    },
    close() {
      this.$emit("close");
    },
    submit() {
      this.$refs.data.validate(valid => {
        if(!valid)return
      let params = new URLSearchParams();
      params.append("id", this.data.id);
      params.append("classid", this.data.classid);
      params.append("title", this.data.title);
      params.append("colorval", this.data.colorval);
      params.append("boldval", this.data.boldval);
      params.append("flag", this.data.flag);
      params.append("source", this.data.source);
      params.append("author", this.data.author);
      params.append("linkurl", this.data.linkurl);
      params.append("keywords", this.data.keywords);
      params.append("description", this.data.description);
      params.append("content", this.data.content);
      params.append("picurl", this.data.picurl);
      params.append("hits", this.data.hits);
      params.append("orderid", this.data.orderid);
      params.append("picarr", '');
      this.$http.post("/manage/info_list/edit", params).then(res => {
        if (res.code == 1) {
          this.$emit('close','1')
        }
      });
      })
    }
  }
};
</script>
<style scoped>
.inp {
  border: none;
  height: 30px;
  width: 90%;
}
.richText{
  height: 460px;
}
.img {
  width: 152px;
  height: 152px;
  border: 1px dashed gray;
  line-height: 150px;
}
img {
  width: 150px;
  height: 150px;
}
</style>



