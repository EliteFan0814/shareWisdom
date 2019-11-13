<template>
  <div>
    <el-dialog
      @close="close"
      :title="form1.id ? '添加子导航菜单' : '添加导航菜单'"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      width="600px" :center="true"
    >
    <el-form :model="item" ref="item" :rules="rules" label-position="right" label-width="100px">
      <el-form-item v-if="form1.id" label="所属导航">
        <el-input class="inp" disabled v-model="form1.classname"></el-input>
      </el-form-item>
      <el-form-item label="导航名称" prop="classname">
        <el-input class="inp" v-model="item.classname"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="linkurl">
        <el-input class="inp" v-model="item.linkurl"></el-input>
      </el-form-item>
      <el-form-item label="重写地址" prop="relinkurl">
        <el-input class="inp" v-model="item.relinkurl"></el-input>
      </el-form-item>
      <el-form-item class="upload" label="导航图片" prop="picurl">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="uploadSectionFile"
          >
            <div v-if="item.picurl">
              <img :src="item.picurl">
            </div>

            <div class="img" v-else>
              <i class="el-icon-info"></i>
              <span>点击上传图片</span>
            </div>
          </el-upload>
      </el-form-item>
      <el-form-item label="打开方式" prop="target">
        <el-select class="inp" v-model="item.target" placeholder="请选择">
            <el-option
              v-for="item in targets"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="orderid">
        <div class="sliderbox">
          <el-slider class="inp" v-model="item.orderid" :max="255" show-input></el-slider>
        </div>
      </el-form-item>
    </el-form>
      <el-button slot="footer" type @click="close">取消</el-button>
      <el-button slot="footer" type="primary" @click="invest()">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["form1", "targets"],
  created() {
    // console.log(this.form);
  },
  data() {
    return {
      isDialog: true,
      money: "",
      opentype: [],
      item:{
        classname:"",
        linkurl:"",
        relinkurl:"",
        picurl:"",
        target:"",
        orderid:255,
      },
      rules : {
        linkurl: [{ required: true, message: '请输入跳转链接' }],
        classname: [{ required: true, message: '请输入导航名称'}],
        picurl: [{ required: true, message: '请上传图片'}],
        orderid: [{ required: true, message: '请选择排序'}],
        relinkurl: [{ required: true, message: '请输入重写地址'}],
        target: [{ required: true, message: '请输入打开方式'}]
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file;
      var form = new FormData();
      form.append("file", fileObj);
      this.$http.post("/manage/image/upload", form).then(res => {
        this.item.picurl = res.data.filepath;
      });
    },
    invest() {
      this.$refs.item.validate(valid => {
        if(!valid)return
        
        let params = new URLSearchParams();
        params.append("parent_id", this.form1.id ? this.form1.id : 0);
        params.append("classname", this.item.classname);
        params.append("linkurl", this.item.linkurl);
        params.append("relinkurl", this.item.relinkurl);
        params.append("picurl", this.item.picurl);
        params.append("target", this.item.target);
        params.append("orderid", this.item.orderid);
        this.$http.post("/manage/nav/add", params).then(res => {
          if (res.code == 1) {
            this.$emit('close','1')
          }
        });
      })
    },
  }
};
</script>
<style scoped>
.btnbox {
  text-align: center;
}
.inp {
  border: none;
  height: 30px;
  width:90%
}
.btn {
  display: inline-block;
  width: 70%;
}
.btn.pay {
  position: relative;
  margin-left: -3px;
}
.btn:nth-of-type(2) {
  margin-top: 10px;
}
.img {
  width: 200px;
  height: 200px;
  border: 1px dashed #666;
  line-height: 200px;
}
img {
  width: 200px;
  height: 200px;
}
</style>

