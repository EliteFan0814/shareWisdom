<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords" placeholder="关键词" clearable/>
        </div>
        <!-- <div class="selectcontainer">
          
        </div> -->
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <el-button type="primary" class="add_btn" @click="Invest({})">添加导航菜单</el-button>
      </div>
      <el-table :data="tableData" row-key="id" :tree-props="{children: 'child'}" default-expand-all>

        <el-table-column label="ID" align="center">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>

        <el-table-column label="导航名称" align="center">
          <template slot-scope="{row}">{{row.classname}}</template>
        </el-table-column>

        <el-table-column label="跳转链接" align="center">
          <template slot-scope="{row}">{{row.linkurl}}</template>
        </el-table-column>-->
        <el-table-column label="排序" align="center">
          <template slot-scope="{row}">{{row.orderid}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" @click="changeStatus(row)" :type="row.checkinfo == 1 ? 'success' : 'info'">{{row.checkinfo_str}}</el-button>
          </template>
        </el-table-column>
        
          
        <el-table-column label="操作" min-width="120px" align="center">
          <template slot-scope="{row}">
            <el-button @click="Invest(row)" size="mini" type="success">
              添加子导航
            </el-button>
            <el-button @click="cipher(row)" size="mini" type="primary">
              编辑
            </el-button>
            <el-button @click="delInfo(row)" size="mini" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Cipher v-if="isCipher" @close="closeDia" :form="form" :targets="targets"></Cipher>
      <Invest v-if="isInvest" @close="closeDia" :form1="form" :targets="targets"></Invest>
      <!-- <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination> -->
    </el-card>
  </div>
</template>
<script>
import Cipher from "./components/agent/Cipher";
import Invest from "./components/agent/Invest";
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
      status: "禁用",
      keywords: "",
      form: {},
      isCipher: false,
      isShowDetail: false,
      isRefillShow: false,
      isInvest: false,
      tableData: [],
      targets: [],
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
        .get("/manage/nav/lists", {
          params: {
            keywords: this.keywords
          }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.targets = res.data.target_screen;
        });
    },
    closeDia(value){
      if(value)this.getData()
      this.isInvest = false;
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
        this.$http.post("/manage/nav/del", params).then(res => {
          if (res.code == 1) {
            this.getData();
          }
        });
      }).catch(() => {
        this.$message.info("您已取消删除！")
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
      params.append("id", row.id);
      this.$http.post("/manage/nav/check", params).then(res => {
        if (res.code == 1) {
          this.getData();
        }
      });
    },
    oFill() {
      this.isRefillShow = false;
      // this.getData()
    },
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
.add_btn {
  margin-left: auto;
}
</style>
