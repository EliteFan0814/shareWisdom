<template>
  <el-dialog :title="`标题：${now_row.title}`"
    center
    :visible.sync="dialogFormVisible"
    @close="close">
    <div class="demo-image__lazy">
      <el-image v-for="url in urls"
        :key="url"
        :src="url"
        @load="load"></el-image>
    </div>
    <div slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="dialogFormVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
                
<script>
export default {
  props: {
    now_row: {
      default: {}
    },
    is_service:{
      default:false
    }
    // spread_list: {
    //   default: []
    // }
  },
  data() {
    return {
      dialogFormVisible: true,
      spread_id: '',
      urls: []
    }
  },
  mounted() {
    this.getPicList()
  },
  methods: {
    load(e) {
      console.log('加载成功', e)
    },
    close() {
      this.$emit('close')
    },
    getPicList() {
      let url = '/company/order/info'
      if(this.is_service){
        url = '/company/service/info'
      }
      this.$http
        .get(url, {
          params: {
            order_id: this.now_row.order_id,
            service_id:this.now_row.service_id
          }
        })
        .then(res => {
          if (res.code) {
            this.urls = res.data.info.picture_json_list
            console.log('urls', this.urls)
          }
        })
    }
    // submit() {
    //   if (this.spread_id !== '') {
    //     this.$http
    //       .post('/company/recruit/spread', {
    //         recruit_id: this.now_title.recruit_id,
    //         param_id: this.spread_id
    //       })
    //       .then(res => {
    //         if (res.code) {
    //           this.dialogFormVisible = false
    //           this.$emit('close', '1')
    //         }
    //       })
    //   } else {
    //     this.$alert('请选择推广天数', '请选择', {
    //       confirmButtonText: '确定'
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.demo-image__lazy {
  height: 400px;
  overflow: auto;
  img{
    display: block;
  }
}
</style>