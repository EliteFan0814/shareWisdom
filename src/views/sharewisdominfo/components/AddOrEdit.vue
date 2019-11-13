<template>
  <el-dialog :title="rowInfo.title?'编辑当前文章':'添加新文章'"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :center="true"
    width="50%">
    <el-form :rules="rules"
      :model="innerRowInfo"
      ref="rowInfo"
      label-position="right"
      label-width="15%">
      <el-form-item label="标题："
        prop="title">
        <el-input class="inp"
          placeholder="请输入标题"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="图文详情："
        prop="content">
        <Editor id="tinymce"
          :content="innerRowInfo.content"
          @changed="(value)=>{innerRowInfo.content=value}"
          class="quillEditor"></Editor>
      </el-form-item>
    </el-form>
    <span slot="footer"
      align="right"
      class="dialog-footer">
      <el-button @click="isDialog= false">取 消</el-button>
      <el-button type="primary"
        @click="submit('rowInfo')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Editor from '@/components/RichText'
export default {
  components: {
    Editor
  },
  props: ['rowInfo'],
  created() {
    if (this.rowInfo.title) {
      this.innerRowInfo = JSON.parse(JSON.stringify(this.rowInfo))
    }
  },
  data() {
    return {
      innerRowInfo: {
        title: '',
        content: ''
      },
      isDialog: true,
      rules: {
        title: [{ required: true, message: '请输入标题' }],
        content: [{ required: true, message: '请编写文章详情' }]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('title', this.innerRowInfo.title)
        params.append('Content', this.innerRowInfo.content)
        // ----------查看修改文章接口----------
        if (this.innerRowInfo.id) {
          // params.append('id', this.innerRowInfo.id)
          // this.$http.post('/api/Goods/Modify', params).then(res => {
          //   if (res.success) {
          //     this.$message({
          //       type: 'success',
          //       message: '修改成功!'
          //     })
          //     this.$emit('close', '1')
          //   }
          // })
        } else {
          // ----------添加新文章接口----------
          // this.$http.post('/api/Goods/Create', params).then(res => {
          //   if (res.success) {
          //     this.$message({
          //       type: 'success',
          //       message: '添加成功!'
          //     })
          //     this.$emit('close', '1')
          //   }
          // })
        }
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
.quillEditor {
  margin-bottom: 50px;
  margin-right: 10%;
  height: 400px;
}
.ship {
  margin-left: 30px;
}
</style>


