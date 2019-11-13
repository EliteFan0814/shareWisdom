<template>
  <div>
    <el-card>
      <el-button type="primary" @click="add()">新增轮播图</el-button>

      <el-table :data="tableData" m-b-10>
        <el-table-column label="缩略图" align="center" >
          <template slot-scope="{ row }">
            <img :src="row.picurl" :class="$style.imp">
          </template>
        </el-table-column>
        <el-table-column label="跳转类型" align="center">
          <template slot-scope="{ row }">{{row.jump_type_str}}</template>
        </el-table-column>
        <el-table-column label="跳转对象" align="center">
          <template slot-scope="{ row }">{{row.jump_name}}</template>
        </el-table-column>
        <el-table-column label="权重" align="center">
          <template slot-scope="{ row }">{{row.sort}}</template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="{row}">
            <el-button size="mini" @click="edit(row)" type="primary">
              编辑
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" @click="removeTodo(row.id)" type="danger">
              删除
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination> -->
    </el-card>
    <bianji v-if="isBianjiShow" @close="editClose" :item="item"></bianji>
    <CustomerDetails v-if="formShow" @close="editClose" :item="sltItem"/>
  </div>
</template>

<script>
//import BasePagination from "@/components/BasePagination";
import CustomerDetails from "./components/carousel/CustomerDetails";
import bianji from "./components/carousel/bianji";
import { constants } from "crypto";

export default {
  components: {
    bianji,
    //BasePagination,
    CustomerDetails
  },
  created() {
    this.getData();
  },
  data() {
    return {
      fenlei: [],
      item: {},
      formShow: false,
      sltItem: {},
      tableData: [
        {
          "type": "GOODS",
          "thumb": "/resource/picture/20190524/1e4938d48bbae39b2993c5cb91396b4b.png",
          "sort": 0,
          "jump_type": "LIST",
          "jump_id": 17,
          "type_str": "商品",
          "picurl": "http://app.jdbtoy888.com//resource/picture/20190524/1e4938d48bbae39b2993c5cb91396b4b.png",
          "jump_type_str": "列表",
          "jump_name": "男装",
          "jump_type_list": [
              {
                  "name": "男装"
              }
          ]
        },
      ],
      maxPage: 1,
      nowPage: 1,
      isBianjiShow: false
    };
  },

  watch: {
    nowPage() {
      this.getData();
    }
  },

  methods: {
    init(to, from) {
      this.getData();
    },
    search(keyname) {
      return this.tableData.filter(item => {
        if (item.name.includes(keyname)) {
          return item;
        }
      });
    },
    getData() {
      // this.tableData = [];
      // this.$http
      //   .get("", {
      //     params: {
      //       page: this.nowPage,
      //       //rows: 4,
      //       type: ""
      //     }
      //   })
      //   .then(res => {
      //     if (res.msg == "ok") {
      //       alert(1)
      //       this.tableData = res.data.list;
      //       this.fenlei = res.data.type_screen;
      //     }
      //   });
    },

    filterChange() {
      if (this.keyname) {
        this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
      } else {
        this.tableData = [...this.tableDataOther];
      }
    },
    add() {
      this.sltItem = {
        img: ""
      };
      this.formShow = true;
    },
    open(row) {
      this.sltItem = row;
      this.formShow = true;
    },
    removeTodo(id) {
      this.$confirm("确定要删除吗？", "提示？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", id);
          this.$http.post("", params).then(res => {
            if (res.code == 1) {
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    newData() {
      //this.getData();
      this.formShow = false;
    },
    edit(data) {
      this.item = data;
      this.isBianjiShow = true;
    },
    editClose(value) {
      this.formShow = false;
      this.isBianjiShow = false;
      if(value)this.getData();
    }
  }
};
</script>

<style lang="scss" module>
// .el-table-column {
//   height: 100px;
// }
.imp{
  height: 100px;
}
</style>
