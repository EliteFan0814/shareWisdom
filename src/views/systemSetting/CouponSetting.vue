<template>
  <div>
    <el-card>
      <div class="body">
        <div v-for="item in tableData"
          class="block">
          <div class="itemC">
            <span class="demonstration">{{item.name}}</span>
            <el-slider v-model="item.value"
              :step="stepValue"
              class="slid"
              show-input></el-slider>
          </div>
        </div>
        <div class="end"
          slot="footer">
          <el-button type="primary"
            @click="submit">保 存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      innerSystemStr: [],
      stepValue: 0.1,
      item: [{ name: 'haha', number: 2 }, { name: 'haha', number: 2 }]
    }
  },
  computed: {
    postSystemStr(){
      let innerPostSystemStr = []
      for(let i = 0; i < this.tableData.length;i++){
        let j = {}
        j.code = this.tableData[i].code
        j.value = this.tableData[i].value
        innerPostSystemStr.push(j)
      }
      return innerPostSystemStr
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('/api/SystemSetting/List').then(res => {
        let systemStr = res.value
        for(let i = 0;i < systemStr.length;i++){
          if(systemStr[i].code.indexOf('coupon_') !== -1){
            this.innerSystemStr.push(systemStr[i])
          }
        }
        this.tableData = this.innerSystemStr
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].value = Number(this.tableData[i].value)
        }
      })
    },
    submit() {
      this.$confirm('确认保存修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/SystemSetting/SystemModify', {
              modifySettings: this.postSystemStr
            })
            .then(res => {
              if (res.success) {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
              }
            })
        })
        .catch(err => {
          this.innerSystemStr = []
          this.getData()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: 1000px;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  .itemC {
    height: 40px;
    line-height: 40px;
  }
}
.slid {
  float: right;
  width: 80%;
}
.end {
  margin-top: 20px;
  text-align: right;
  width: 700px;
}
</style>