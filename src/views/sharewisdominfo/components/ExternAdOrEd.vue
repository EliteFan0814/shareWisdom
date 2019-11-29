<template>
  <el-dialog
    :title="rowInfo.order_id?'编辑当前职位':'发布新职位'"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :center="true"
    width="50%"
  >
    <el-form
      :rules="rules"
      :model="innerRowInfo"
      ref="rowInfo"
      label-position="right"
      label-width="12%"
    >
      <el-form-item label="标题：" prop="title">
        <el-input placeholder="请输入标题" v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="行业：" prop="trade_id">
        <el-select v-model="innerRowInfo.trade_id" placeholder="请选择行业">
          <el-option
            v-for="item in trade_class"
            :key="item.trade_id"
            :label="item.name"
            :value="item.trade_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工期要求：" prop="project_ask">
        <el-input placeholder="请输入工期要求" v-model="innerRowInfo.project_ask"></el-input>
      </el-form-item>
      <el-form-item label="所需人数：" prop="number">
        <el-input placeholder="请输入所需人数" v-model="innerRowInfo.number"></el-input>
      </el-form-item>
      <el-form-item label="费用预算：" prop="price">
        <el-input placeholder="请输入费用预算" v-model="innerRowInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="公司名称：" prop="company_name">
        <el-input placeholder="请输入公司名称" v-model="innerRowInfo.company_name"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="linkman">
        <el-input placeholder="请输入联系人" v-model="innerRowInfo.linkman"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input placeholder="请输入联系电话" v-model="innerRowInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="职位：" prop="position">
        <el-input placeholder="请输入职位" v-model="innerRowInfo.position"></el-input>
      </el-form-item>

      <el-form-item label="添加图纸：" prop="picture_json">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :http-request="uploadPic"
          :on-success="upLoadSuccess"
          :on-error="upLoadErr"
          :on-remove="removeImg"
          :file-list="el_img_list"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="公司地址：" prop="map_location">
        <Amap @getPosition="readPosition" :user_id="rowInfo.order_id"></Amap>
      </el-form-item>
    </el-form>
    <span slot="footer" align="right" class="dialog-footer">
      <el-button @click="isDialog= false">取 消</el-button>
      <el-button type="primary" @click="submit('rowInfo')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Editor from "@/components/RichText";
import Amap from "@/components/amap";
export default {
  components: {
    Editor,
    Amap
  },
  props: ["rowInfo", "trade_class"],
  created() {
    if (this.rowInfo.order_id) {
      // this.innerRowInfo = JSON.parse(JSON.stringify(this.rowInfo))
      this.$http
        .get("/company/order/info", {
          params: { order_id: this.rowInfo.order_id }
        })
        .then(res => {
          this.innerRowInfo = res.data.info;
          this.filterImgUrl();
        });
    }
  },
  computed: {},
  data() {
    return {
      el_img_list: [],
      innerRowInfo: {
        title: "",
        trade_id: "",
        project_ask: "",
        number: "",
        type: "",
        salary: "",
        company_name: "",
        linkman: "",
        phone: "",
        position: "",
        price: "",
        picture_json: [],
        picture_json_list: [],
        add_lon: "",
        add_lat: ""
      },
      isDialog: true,
      dialogImageUrl: "",
      dialogVisible: false,
      before_up_pic: [],
      rules: {
        title: [{ required: true, message: "请输入标题" }],
        trade_id: [{ required: true, message: "请选择工种" }],
        project_ask: [{ required: true, message: "工期要求不能为空" }],
        price: [{ required: true, message: "费用预算不能为空" }],
        type: [{ required: true, message: "请选择工期类型" }],
        number: [{ required: true, message: "请输入电话" }],
        salary: [{ required: true, message: "请输入薪水" }],
        company_name: [{ required: true, message: "请输入公司名称" }],
        linkman: [{ required: true, message: "请输入联系人" }],
        phone: [{ required: true, message: "请输入电话" }],
        position: [{ required: true, message: "请输入职位" }]
      }
    };
  },
  methods: {
    // 把返回的 picture_json_list 进行重置
    filterImgUrl() {
      let filterImg = [];
      this.innerRowInfo.picture_json_list.map(element => {
        let inner = {};
        inner.url = element;
        filterImg.push(inner);
      });
      // this.before_up_pic = filterImg
      // 给el-img用的格式
      this.el_img_list = filterImg;
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    close() {
      this.$emit("close");
    },
    readPosition(location_info) {
      Object.assign(this.innerRowInfo, location_info);
      console.log("父组件", this.innerRowInfo);
    },
    // 上传图片
    uploadPic(upfiles) {
      console.log("上传的图片信息：", upfiles);
      let pic_info = {};
      // this.before_up_pic.push(upfiles.file)
      pic_info.uid = upfiles.file.uid;
      let fileObj = upfiles.file;
      let form = new FormData();
      form.append("file", fileObj);
      this.$http.post("/company/image/upload", form).then(res => {
        if (res.code) {
          pic_info.url = res.data.fileurl;
          // this.before_up_pic.push(pic_info)
          this.el_img_list.push(pic_info);
          this.filter_before_up_pic();
          console.log(
            "图片列表详情 innerRowInfo里的pic_list：",
            this.innerRowInfo.picture_json
          );
          console.log(upfiles.onSuccess);
        }
      });
    },
    // 最终上传时的图片数组格式
    filter_before_up_pic() {
      let res = [];
      for (let i = 0; i < this.el_img_list.length; i++) {
        res.push(this.el_img_list[i].url);
      }
      this.innerRowInfo.picture_json = res;
      // this.innerRowInfo.picture_json_list = res
    },
    // 图片上传成功
    upLoadSuccess(response, file, fileList) {
      console.log("yyy", response, file, fileList);
    },
    // 图片上传失败
    upLoadErr(err,file,fileList){
      console.log("xxx", err, file, fileList)
    },
    // 删除图片
    removeImg(file, fileList) {
      let del_uid = file.uid;
      let final_res = [];
      for (let i = 0; i < this.el_img_list.length; i++) {
        if (this.el_img_list[i].uid === del_uid) {
          this.el_img_list.splice(i, 1);
        }
      }
      this.filter_before_up_pic();
    },

    submit(refName) {
      // 判断如果当前是添加信息的话，判断amap组件是否选择了地址
      if (!this.rowInfo.order_id) {
        if (this.innerRowInfo.picture_json.length === 0) {
          this.$alert("请上传图纸", "缺少信息", {
            confirmButtonText: "确定"
          });
          return;
        }
        if (!this.innerRowInfo.is_click) {
          this.$alert("请定位公司地址", "缺少信息", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      // 否则就是修改当前信息，那么就不需要判断amap组件是否选择地址
      this.$refs[refName].validate(valid => {
        if (!valid) return;
        // ----------查看修改文章接口----------
        if (this.innerRowInfo.order_id) {
          // params.append('order_id', this.innerRowInfo.order_id)
          this.$http
            .post("/company/order/edit", this.innerRowInfo)
            .then(res => {
              if (res.code) {
                console.log(res);
                // this.$message({
                //   type: 'success',
                //   message: '修改成功!'
                // })
                this.$emit("close", "1");
              }
            });
        } else {
          // ----------添加新文章接口----------
          console.log("params", this.innerRowInfo);
          this.$http
            .post("/company/order/apply", this.innerRowInfo)
            .then(res => {
              console.log(res);
              if (res.code) {
                this.$emit("close", "1");
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.el-form-item {
  margin-bottom: 20px;
  .el-input {
    width: 90%;
  }
}

.inner-input {
  display: inline-block;
  width: 20%;
}
i {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border: 1px dashed black;
  display: block;
}
.quillEditor {
  margin-bottom: 50px;
  margin-right: 10%;
  height: 400px;
}
.ship {
  margin-left: 30px;
}
.amap-box {
  width: 90%;
  height: 300px;
}
</style>


