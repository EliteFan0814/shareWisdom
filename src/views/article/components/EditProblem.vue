<template>
  <el-dialog :title="innerItem.id ?`修改文章：${item.title}`:'新增文章'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="close"
    width="900px"
    :center="true">
    <el-form :model="innerItem"
      ref="innerItem"
      :rules="rules"
      label-width="13%">
      <el-form-item label="标题："
        prop="title">
        <el-input class="inp"
        placeholder="请输入标题"
          v-model="innerItem.title"></el-input>
      </el-form-item>
      <el-form-item label="内容："
        prop="content">
        <Editor class="inp"
          id="tinymce"
          :content="innerItem.content"
          @changed="(value)=>{this.innerItem.content=value}"></Editor>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Editor from '@/components/RichText'

export default {
  props: ['item'],
  components: {
    Editor
  },
  data() {
    return {
      dialogVisible: true,
      innerItem: '',
      typeId: 'common_problem',
      rules: {
        title: [{ required: true, message: '请输入标题' }],
        content: [{ required: true, message: '请输入内容' }]
      }
    }
  },
  created() {
    this.innerItem = JSON.parse(JSON.stringify(this.item))
    if(this.$route.name === 'CommonProblem'){
      this.typeId = 'common_problem'
    }else{
      this.typeId = 'platform_placard'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    uploadSectionFile: function(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        this.item.thumb = res.data.filepath
      })
    },
    submit() {
      this.$refs.innerItem.validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('title', this.innerItem.title)
        params.append('content', this.innerItem.content)
        if (this.innerItem.id) {
          params.append('id', this.innerItem.id)
          this.$http.post('/api/Article/Modify', params).then(res => {
            if (res.success) {
              this.$message({
                message: '恭喜你，修改成功！',
                type: 'success'
              })
              this.$emit('close', '1')
            }
          })
        } else {
          params.append('typeId', this.typeId)
          this.$http.post('/api/Article/Publish', params).then(res => {
            if (res.success) {
              this.$message({
                message: '恭喜你，添加成功！',
                type: 'success'
              })
              this.$emit('close', '1')
            }
          })
        }
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
  height: auto;
}
.slider {
  width: 445px;
}
</style>
<style scoped>
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
</style>




