<template>
  <el-dialog :title="`充值推广：${now_title.title}`"
    center
    :visible.sync="dialogFormVisible"
    @close="close">
    <el-form>
      <!-- <el-form-item label="推广配置：">
        <el-select v-model="spread_id"
          placeholder="请选择活动区域">
          <el-option v-for="item in spread_list"
            :label="`推广 ${item.name} 天，需花费 ${item.value} 元`"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="推广配置：">
        <el-radio-group v-model="spread_id">
          <el-radio v-for="item in spread_list"
            :key="item.id"
            :label="item.id">{{`推广 ${item.name} 天，需花费 ${item.value} 元`}}</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    now_title: {
      default: {}
    },
    spread_list: {
      default: []
    }
  },
  data() {
    return {
      dialogFormVisible: true,
      spread_id: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      if (this.spread_id !== '') {
        let url = ''
        let id_str = ''
        if(this.now_title.recruit_id){
          url = '/company/recruit/lists'
          id_str = 'recruit_id'
        }else if(this.now_title.order_id){
          url = '/company/order/lists'
          id_str = 'order_id'
        }else{
          url = '/company/service/lists'
          id_str = 'service_id'
        }
        this.$http
          .post(url, {
            recruit_id: this.now_title[id_str],
            order_id:this.now_title[id_str],
            service_id:this.now_title[id_str],
            param_id: this.spread_id
          })
          .then(res => {
            if (res.code) {
              this.dialogFormVisible = false
              this.$emit('close','1')
            }
          })
      } else {
        this.$alert('请选择推广天数', '请选择', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>