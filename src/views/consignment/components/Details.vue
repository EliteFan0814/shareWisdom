<template>
  <div>
    <el-dialog :title="'订单'+orderData[0].id"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="900px"
      :center="true">
      <el-tabs type="card">

        <el-tab-pane label="清单">
          <el-table :data="orderData">
            <el-table-column label="缩略图"
              align="center">
              <template slot-scope="{row}"><img :src="row.id">xxxxxxxx</template>
            </el-table-column>
            <el-table-column label="商品名称"
              align="center">
              <template slot-scope="{row}">{{row.goodsName}}</template>
            </el-table-column>
            <el-table-column label="购买数量"
              align="center">
              <template slot-scope="{row}">{{row.goodsCount}}</template>
            </el-table-column>
            <el-table-column label="成交价"
              align="center">
              <template slot-scope="{row}">{{row.price}}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="地址">
          <el-form label-position="right"
            label-width="15%">
            <el-form-item label="联系人：">
              <el-input readonly
                class="inp"
                v-model="orderData[0].contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input readonly
                class="inp"
                v-model="orderData[0].phone"></el-input>
            </el-form-item>
            <el-form-item label="收货地址：">
              <el-input readonly
                class="inp"
                v-model="orderData[0].address">
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="日志">
          <el-form label-position="right"
            label-width="15%">
            <el-form-item label="时间：">
              <el-input readonly
                class="inp"></el-input>
            </el-form-item>
            <el-form-item label="内容：">
              <el-input readonly
                class="inp"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input class="inp">
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer">
        <el-button type
          @click="close()">取消</el-button>
        <el-button type="primary"
          @click="close()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { log } from 'util'

export default {
  components: {
    //addFm,
  },
  props: ['propitem'],
  data() {
    return {
      isAddShow: false,
      isDialog: true,
      form: [{ name: 123 }],
      liebiao: [],
      showAddFm: false,
      showUpDate: false
    }
  },
  computed: {
    orderData() {
      return [this.propitem]
    }
  },
  created() {},
  methods: {
    getData() {},
    close() {
      this.$emit('close')
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
}
.slider {
  width: 445px;
}
.textinp {
  width: 85%;
}
.quillEditor {
  margin-bottom: 50px;
  height: 100px;
}
</style>
<style scoped>
.fenge {
  width: 95%;
  margin: 20px 0;
  font-size: 18px;
  text-align: center;
}
img {
  width: 50px;
  height: 50px;
}
</style>
