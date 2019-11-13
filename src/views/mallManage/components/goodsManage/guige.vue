<template>
  <div>
    <el-dialog :title="`${item.name}规格管理`"
      :visible.sync="isDialog"
      :close-on-click-modal="false"
      @close="close"
      width="50%"
      :center="true">
      <el-form :model="item"
        ref="item">
        <!-- <el-form-item label="规格类型：">
          <el-button size="small" class="btn_g" v-for="(itemg,index) in list2" :key="index" @click="modify(itemg)">
            <span>
            {{itemg.type_name}}
            </span>
            <span @click="delete_g(itemg)">&nbsp;<i class="el-icon-close"></i></span>
          </el-button>
          <el-button  size="small" @click="add(item)" icon="el-icon-plus"></el-button>
        </el-form-item>
        <el-form-item v-for=" (itemg, index) in list2" :key="index" :label="itemg.type_name+'：'">
          <el-button size="small" class="btn_g" v-for="(itemc,index_c) in list2[index].data" :key="index_c" @click="modify(itemc)">
            <img v-if="itemc.picurl" :src="itemc.picurl">
            {{itemc.item_value}}
            <span class="spstyle" @click="delete_g(itemc)">&nbsp;<i class="el-icon-close"></i></span>
          </el-button>
          <el-button  size="small" @click="add(itemg)" icon="el-icon-plus"></el-button>
        </el-form-item> -->
        <el-form-item label="规格列表："
          align="center">
          <el-table border
            :data="form">

            <!-- <el-table-column label="缩略图" align="center">
              <template slot-scope="{row}">
                <img :src="row.thumb" alt>
              </template>
            </el-table-column>    -->

            <el-table-column label="规格"
              align="center">
              <template slot-scope="{row}">{{row.spec_name}}</template>
            </el-table-column>

            <el-table-column label="缩略图"
              align="center">
              <template slot-scope="{row}">
                <img :src="row.spec_img"
                  alt=""
                  class="spec_img">
              </template>
            </el-table-column>

            <el-table-column label="会员价"
              align="center">
              <template slot-scope="{row}">{{row.price_member}}
              </template>
            </el-table-column>
            <el-table-column label="采购价"
              align="center">
              <template slot-scope="{row}">{{row.price_purchase}}</template>
            </el-table-column>

            <!-- <el-table-column label="操作" align="center">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="save(row)">保存</el-button>
                <el-button @click="oDel(row)" size="mini" :type="row.status == 0 ? 'info' : 'success'">
                  {{statusChange(row.status)}}
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button class="btn"
          @click="isDialog = false">取 消</el-button>
        <el-button class="btn"
          type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <AddGuige style="z-index:100"
      v-if="isAddShow"
      :item1="item1"
      @close="addGuige"></AddGuige>
    <XGguige style="z-index:100"
      v-if="isGGShow"
      :item="data"
      @close="XGguige"></XGguige>
  </div>
</template>

<script>
import AddGuige from './AddGuige'
import XGguige from './XGguige'
import { URLSearchParams } from 'url'
export default {
  components: {
    AddGuige,
    XGguige
  },
  props: ['item'],
  data() {
    return {
      isGGShow: false,
      isAddShow: false,
      isDialog: true,
      form: [],
      item1: {},
      data: {},
      list: ['颜色', '尺码'],
      list2: [],
      click_d: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/Manage/goods_spec/lists?goods_id=' + this.item.id)
        .then(res => {
          this.form = res.data.list
        })
      // this.$http.get("/manage/goods_spec_type/lists?goods_id=" + this.item.id).then(res => {
      //   this.list2 = []
      //   res.data.list.map((one, index) => {
      //     this.$http.get("/manage/goods_spec_item/lists?spec_type_id=" + one.spec_type_id).then(res => {
      //     one.data = res.data.list;
      //     this.list2.splice(index,0, one);
      //     })
      //   })
      // });
    },
    save(row) {
      this.$http
        .post('/manage/goods_spec/price', {
          spec_id: row.spec_id,
          price: row.price
        })
        .then(res => {
          //this.getData()
        })
    },
    statusChange(value) {
      if (value == 0) {
        return '禁用'
      } else {
        return '启用'
      }
    },
    modify(data) {
      if (this.click_d) {
        this.click_d = false
        return
      }
      this.isGGShow = true
      this.data = data
    },
    close() {
      this.$emit('close')
    },
    submit() {
      this.isDialog = false
    },
    add(item) {
      this.item1 = item
      this.isAddShow = true
    },
    addGuige(value) {
      this.isAddShow = false
      if (value) this.getData()
    },
    XGguige(value) {
      this.isGGShow = false
      if (value) this.getData()
    },
    oDel(data) {
      this.$http
        .post('/manage/goods_spec/state', { spec_id: data.spec_id })
        .then(res => {
          if (res.code == 1) {
            this.getData()
          }
        })
    },
    delete_g(itemg) {
      console.log(itemg)
      this.click_d = true
      if (itemg.spec_type_id) {
        this.$http
          .post('/manage/goods_spec_type/del', {
            spec_type_id: itemg.spec_type_id
          })
          .then(res => {
            this.getData()
          })
      } else if (itemg.item_id) {
        this.$http
          .post('/manage/goods_spec_item/del', { item_id: itemg.item_id })
          .then(res => {
            if (res.code == 1) {
              this.getData()
            }
          })
      }
    },
    edit_g(itemg) {}
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
.quillEditor {
  height: 500px;
  margin-bottom: 50px;
}
.spec_img {
  height: 50px;
}
.i {
  width: 30px;
  height: 30px;
  display: inline-block;
  font-size: 30px;
  color: white;
  line-height: 30px;
  background-color: #666;
  border-radius: 50%;
  margin-left: 30px;
  text-align: center;
  cursor: pointer;
}
.btn {
  position: relative;
  margin-left: 30px;
}
btn_g {
  display: inline-block;
  border: 1px solid gray;
}
.spstyle {
  margin-right: -7px;
}
/* img {
  width: 40px;
  height: 25px;
  margin: -10px 0 -9px -7px;
} */
</style>
