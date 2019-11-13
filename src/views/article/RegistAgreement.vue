<template>
    <el-card class="body">
      <div slot="header"
        class="clearfix">
        <span>{{title}}</span>
      </div>
      <div class="body">
        <RichText id="tinymce"
          class="richText"
          :height1="700"
          :content="content"
          @changed="(value) =>{this.content = value}"></RichText>
        <div class="end"
          slot="footer">
          <el-button type="primary"
            @click="submit">保 存</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
import RichText from '@/components/RichText'
export default {
  components: {
    RichText
  },
  data() {
    return {
      id: '',
      title: '用户协议',
      content: '请填写用户协议',
      typeId: 'user_agreement'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    typeExist() {},
    getData() {
      this.$http
        .get('/api/Article/GetOneByType', {
          params: {
            type: this.typeId
          }
        })
        .then(res => {
          if (res.value !== null) {
            this.title = res.value.title
            this.content = res.value.content
            this.id = res.value.id
            this.typeId = res.value.typeId
          }
        })
    },
    submit() {
      this.$confirm('确认保存文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .get('/api/Article/GetOneByType', {
              params: {
                type: this.typeId
              }
            })
            .then(res => {
              if (res.value !== null) {
                // 如果文章的 类型id 存在，就获取文章的 id，然后修改文章
                this.id = res.value.id
                this.title = res.value.title
                this.typeId = res.value.typeId
                this.$http
                  .post('/api/Article/Modify', {
                    title: this.title,
                    content: this.content,
                    id: this.id
                  })
                  .then(res => {
                    if (res.success) {
                      this.$message({
                        message: '恭喜你，修改成功',
                        type: 'success'
                      })
                    }
                    this.getData()
                  })
              } else {
                // 如果文章不存在，就发布一篇单类型文章
                this.$http
                  .post('/api/Article/Publish', {
                    title: this.title,
                    content: this.content,
                    typeId: this.typeId
                  })
                  .then(res => {
                    if (res.success) {
                      this.$message({
                        message: '恭喜你，发布成功',
                        type: 'success'
                      })
                    }
                    this.getData()
                  })
              }
            })
        })
        .catch(err => {
          this.$message('已取消！')
          this.getData()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  .richText {
    width: 900px;
  }
  .end {
    margin-top: 20px;
    text-align: center;
    width: 900px;
  }
}
</style>