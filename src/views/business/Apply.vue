<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords" placeholder="关键词" clearable/>
        </div>
        <div class="selectcontainer">
          <el-select v-model="value5" placeholder="区域" @change="getData">
            <el-option
              v-for="item in vipGrade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="tableData">

        <el-table-column label="店铺LOGO" align="center">
          <img src="@/icons/png/logo.jpg">
        </el-table-column>

        <el-table-column label="真实姓名" align="center">
          <template slot-scope="{row}">{{row.nickname}}</template>
        </el-table-column>
        <el-table-column label="手机号码">
          <template slot-scope="{row}">{{row.phone}}</template>
        </el-table-column>

        <el-table-column label="审核状态" align="center">
          <template slot-scope="{row}">
          <el-button size="mini" @click="changeStatus(row)" :type="row.status == 1 ? 'success' : 'info'">
            {{row.status_str}}
          </el-button>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center" min-width="100">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column>
        <el-table-column label="审核时间" align="center" min-width="100">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px" align="center">
          <template slot-scope="{row}">
            <el-button @click="cipher(row,'Y')" size="mini" type="success">
              同意
            </el-button>
            <el-button @click="cipher(row,'N')" size="mini" type="danger">
              拒绝
            </el-button>
            
            <el-button @click="map(row)" size="mini" type="primary">
              地图
            </el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <Map v-if="showMap" @close="showMap=false" :form="form"></Map>
      <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
import Map from "./components/apply_c/Map";
import BasePagination from "@/components/BasePagination";
export default {
  components: {
    Map,
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
      showMap: false,
      tableData: [
        {
                "id": 51,
                "parent_id": 0,
                "account": "13409976153",
                "level": 1,
                "type": "real",
                "amount": "0.00",
                "amount_ice": "0.00",
                "realname": "",
                "sex": "2",
                "age": 0,
                "address": "未设置收货地址",
                "contact_qq": "",
                "spread_code": "m7e40c886",
                "qrcode": "/resource/picture/member/qrcode_m7e40c886.png",
                "phone": "13409976153",
                "nickname": "单身狗",
                "headurl": null,
                "bond": "0",
                "status": 1,
                "create_time": "2019-06-03 11:58:31",
                "level_str": "普通会员",
                "qrcode_str": "http://app.jdbtoy888.com//resource/picture/member/qrcode_m7e40c886.png",
                "headurl_str": "",
                "status_str": "正常",
                "type_str": "真实",
                "sex_str": "女",
                "parent_name": "无推荐人",
                "team": 0,
                "team_order_num": 0,
                "cash_count": 0,
                "order_count": 0,
                "order_all": "0",
                "order_num": "0/0"
            },
      ],
      vipGrade: [],
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
      // this.tableData = [];
      // this.$http
      //   .get("", {
      //     params: {
      //       page: this.nowPage,
      //       rows: 8,
      //       level: this.value5,
      //       state: this.value11,
      //       keywords: this.keywords
      //     }
      //   })
      //   .then(res => {
      //     this.tableData = res.data.list;
      //     this.vipGrade = res.data.level_screen;
      //     this.vipStatus = res.data.state_screen;
      //     this.maxPage = Math.ceil(res.data.total / 8);
      //   });
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
    },
    cipher(data,str) {
      alert(str)
    },
    map(data){
      this.showMap = true;
      this.form = data;
    },
    details(data){
      this.isShowDetail = true;
      this.form = data;
    },
    changeStatus(row) {
      // let params = new URLSearchParams();
      // params.append("id", id);
      // this.$http.post("/manage/member/state", params).then(res => {
      //   if (res.code == 1) {
      //     this.getData();
      //   }
      // });
    },
    oFill() {
      this.isRefillShow = false;
      // this.getData()
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
