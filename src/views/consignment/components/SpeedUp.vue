<template>
  <div>
    <el-dialog :title="propitem.id+' 提速记录'"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="60%"
      :center="true">
      <el-table :data="form">

        <el-table-column label="时间"
          align="center"
          width="300px">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>

        <el-table-column label="消耗芝麻数">
          <template slot-scope="{row}">{{row.sellPrice}}xxxxxxxx</template>
        </el-table-column>

        <el-table-column label="元名次">
          <template slot-scope="{row}">{{row.sellPrice}}xxxxxxxx</template>
        </el-table-column>

        <el-table-column label="提升后名次"
          align="center"
          width="300px">
          <template slot-scope="{row}">{{row.sellPrice}}xxxxxxxx</template>
        </el-table-column>

      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: ['propitem'],
  data() {
    return {
      isDialog: true
    }
  },
  computed: {
    form() {
      return [this.propitem]
    }
  },
  created() {},
  methods: {
    getData() {
      let value = ''
      if (this.item.delivery_arr) {
        value = this.item.delivery_arr.linkValue
      }
      this.$http
        .get('/manage/store_order/express?number=' + value)
        .then(res => {
          console.log(res)
          this.form = res.data.list
        })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style>
</style>
