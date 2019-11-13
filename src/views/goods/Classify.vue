<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <el-button type="primary" class="add_btn" @click="Invest({})">添加网站栏目</el-button>
      </div>
      <el-table :data="tableData" row-key="id" :tree-props="{children: 'child'}" default-expand-all>

        <el-table-column label="ID" align="center">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>

        <el-table-column label="栏目名称" align="center">
          <template slot-scope="{row}">{{row.classname}}</template>
        </el-table-column>
        <el-table-column label="栏目类型" align="center">
          <template slot-scope="{row}">{{row.infotype_str}}</template>
        </el-table-column>
        <el-table-column label="跳转链接" align="center">
          <template slot-scope="{row}">{{row.linkurl}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="{row}">{{row.orderid}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-button :type="row.checkinfo == 1 ? 'success' : 'info'" size="mini" @click="stateChange(row)">{{row.checkinfo_str}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px" align="center">
          <template slot-scope="{row}">
            <el-button @click="Invest(row)" size="mini" type="success">
              添加子栏目
            </el-button>
            <el-button @click="cipher(row)" size="mini" type="primary">
              修改
            </el-button>
            <el-button @click="delInfo(row)" size="mini" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Cipher v-if="isCipher" @close="closeDia" :types="types" :form="form"></Cipher>
      <Invest v-if="isInvest" @close="closeDia" :types="types" :form="form"></Invest>
      <!-- <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination> -->
    </el-card>
  </div>
</template>
<script>
import Cipher from "./components/classify/Cipher";
import Invest from "./components/classify/Invest";
import BasePagination from "@/components/BasePagination";
export default {
  components: {
    Cipher,
    Invest,
    BasePagination
  },
  created() {
    this.getData();
  },
  data() {
    return {
      value: "",
      value11: "",
      value5: "",
      status: "",
      keywords: "",
      form: {},
      isCipher: false,
      isRefillShow: false,
      isInvest: false,
      tableData: [],
      types: [],
      vipStatus: [],
      maxPage: 1,
      nowPage: 1
    };
  },
  watch: {
    nowPage() {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$http
        .get("/manage/Info_class/lists", {
          params: {
            //type: 1,
            style: "tree",
          }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.types = res.data.type_screen;
          this.vipStatus = res.data.state_screen;
          this.maxPage = Math.ceil(res.data.total / 8);
          console.log(this.tableData);
          
        });
    },
    stateChange(row) {
      let params = new URLSearchParams();
      params.append("id",row.id);
      this.$http.post("/manage/Info_class/check",params).then(res => {
        this.getData()
      })
    },
    closeDia(value){
      if(value)this.getData();
      this.isInvest=false;
      this.isCipher=false;
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
    },
    cipher(data) {
      this.isCipher = true;
      this.form = data;
    },
    //会员详情
    delInfo(data) {
      this.$confirm("是否删除 " + data.classname +" ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", data.id);
        this.$http.post("/manage/Info_class/del", params).then(res => {
          if (res.code == 1) {
            this.getData();
          }
        });
      }).catch(() => {
        this.$message.info("您已取消删除")
      })
    },
    //代理商进货列表
    onRefill(data){
      this.form = data;
      this.$router.push({path:'/order/AgentPurchase'});
    },
    onSell(data){
      this.form = data;
      this.$router.push({path:'/order/SelfMention'});
    },
    
    //充值
    Invest(data) {
      this.form = data;
      this.isInvest= true;
    },
    changeStatus(row) {
      let params = new URLSearchParams();
      params.append("id", id);
      this.$http.post("/manage/member/state", params).then(res => {
        if (res.code == 1) {
          this.getData();
        }
      });
      // row.status == 1 ?(row.status = 0, row.status_str = '非正常') : (row.status = 1 , row.status_str = '正常')
    },
    oFill() {
      this.isRefillShow = false;
      // this.getData()
    },
    load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 100)
      }
  }
};
</script>


<style lang="scss" module >
.header {
  display: flex;
  align-items: center;

  > div {
    flex-grow: 0;
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 20px;
    }

    > span {
      margin-right: 5px;
    }
  }

  .search {
    display: flex;
    align-items: center;

    > div {
      width: 200px;
    }
  }

  [space] {
    flex-grow: 1;
  }
}
</style>
<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
