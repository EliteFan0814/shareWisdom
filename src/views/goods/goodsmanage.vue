<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords" placeholder="关键词" @blur="getData" clearable/>
        </div>
        <div>
          <el-select v-model="value5" @change="getData" placeholder="分类" clearable>
            <el-option
              v-for="item in fenlei"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- <div>
          <el-select v-if="false" v-model="value11" @change="getData" placeholder="商品类型">
            <el-option
              v-for="item in leixing"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <div>
          <el-select v-model="value16" @change="getData" placeholder="状态">
            <el-option
              v-for="item in shangjia"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- <div>
          <el-select v-model="value21" @change="getData" placeholder="推荐状态">
            <el-option
              v-for="item in tuijian"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <el-button @click="addGoods" class="add" type="primary">
          添加商品
        </el-button>
      </div>

      <el-table :data="goodsData">
        <el-table-column label="缩略图" align="center" class="imgbox" min-width="110">
          <template slot-scope="{row}">
            <img :src="row.thumb">
          </template>
        </el-table-column>

        <el-table-column label="名称" align="center" min-width="150">
          <template slot-scope="{row}">{{row.title}}</template>
        </el-table-column>

        <el-table-column label="所属分类" align="center">
          <template slot-scope="{row}">{{row.cate_name}}</template>
        </el-table-column>

        <el-table-column label="市场价" align="center">
          <template slot-scope="{row}">{{row.price}}</template>
        </el-table-column>
        <el-table-column label="会员价" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="店铺价" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="代理价" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="赠送积分" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        
        <el-table-column label="用户限购数量" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="店铺限购数量" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="代理限购数量" align="center">
          <template slot-scope="{}"></template>
        </el-table-column>
        <el-table-column label="销量" align="center">
          <template slot-scope="{row}">{{row.sales_number}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="{row}">{{row.sort}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" min-width="100">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column>
        
        <el-table-column label="是否推荐" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" :type="row.pick == 0 ? 'info' : 'success'" @click="changePick(row)">{{row.pick_str}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" :type="row.status == 1 ? 'success' : 'info'" @click="changeStatus(row)">{{row.status_str}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="230" align="center">
          <template slot-scope="{row}">
            <el-button @click="edite(row)" size="mini" type="primary">
              编辑
            </el-button>
            <!-- <el-button @click="guige(row)" size="mini" type="primary">
              商品规格
            </el-button> -->
            <el-button @click="oXC(row)" size="mini" type="primary">
              相册
            </el-button>
            <el-button @click="del(row)" size="mini" type="danger">
              删除
              <!-- <i class="el-icon-edit"></i> -->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出对话框 -->
      <tianjia v-if="isAddShow" @close="close" :fenlei="fenlei"></tianjia>
      <Edite v-if="isEditShow" @close="update" :item="item"></Edite>
      <shangpinxiangce :item="item" v-if="isXiangCeShow" @close="xcClose"></shangpinxiangce>
      <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
import shangpinxiangce from "./components/goodsManager/shangpinxiangce";
import tianjia from "./components/goodsManager/tianjia";
import Edite from "./components/goodsManager/Edite";
import BasePagination from "@/components/BasePagination";

export default {
  components: {
    shangpinxiangce,
    tianjia,
    Edite,
    BasePagination,
  },
  created() {
    this.getFenLei();
    this.getData();
  },
  data() {
    return {
      isXiangCeShow: false,
      isGuigeShow: false,
      value: "",
      value5: "",
      value11: "",
      value16: "",
      value21: "",
      item: {},
      isEditShow: false,
      isAddShow: false,
      dialogVisible: false,
      keywords: "",
      goodsData: [
        {
          "cate_id": 22,
          "title": "HUAWEI P30 麒麟980 超感光徕卡三摄 屏内指纹 双屏录像 (极光色）",
          "price": "3988.00",
          "shipfee": "0.00",
          "summary": "123",
          "price_describe": "undefined",
          "thumb": "/resource/picture/20190529/952408a5575080332f04ba06481598aa.jpg",
          "sort": 255,
          "create_time": "2019-05-28 16:33:29",
          "pick": 0,
          "hits": 175,
          "sales_number": 3,
          "status": 1,
          "status_str": "显示",
          "picurl": "http://app.jdbtoy888.com//resource/picture/20190529/952408a5575080332f04ba06481598aa.jpg",
          "pick_str": "不推荐",
          "cate_name": "数码家电"
        },
      ],
      maxPage: 1,
      nowPage: 1,
      fenlei: [],
      leixing: [],
      shangjia: [],
      tuijian: []
    };
  },
  watch: {
    nowPage() {
      this.getData();
    }
  },
  methods: {
    getFenLei() {
      // this.$http.get("/manage/goods_category/lists").then(res => {
      //   this.fenlei = res.data.list;
      // });
    },
    getData() {
      // this.goodsData = [];
      // this.$http
      //   .get("", {
      //     params: {
      //       rows: 10,
      //       page: this.nowPage,
      //       keywords: this.keywords,
      //       cate_id: this.value5,
      //       state: this.value16,
      //       pick: this.value21
      //     }
      //   })
      //   .then(res => {
      //     this.tuijian = res.data.pick_screen;
      //     this.goodsData = res.data.list;
      //     this.maxPage = res.data.page_total;
      //     this.shangjia = res.data.state_screen;
      //   });
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
    },
    add() {
      this.dialogVisible = true;
    },
    del(data) {
      this.$confirm("是否删除" + data.title + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: "true"
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", data.id);
          this.$http.post("", params).then(res => {
            if (res.code == 1) {
              this.getData();
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
    changePick(row){
      row.pick == 1 ? (row.pick = 0, row.pick_str = '不推荐') : (row.pick = 1, row.pick_str = '推荐')
    },
    changeStatus(row){
      row.status == 1 ? (row.status = 0, row.status_str = '不显示') : (row.status = 1, row.status_str = '显示')
    },
    //添加报单商品
    addGoods() {
      this.isAddShow = true;
    },
    edite(data) {
      this.item = data;
      this.isEditShow = true;
    },
    close(value) {
      if(value)this.getData();
      this.isAddShow = false;
    },
    update(value) {
      this.isEditShow = false;
      if(value)this.getData();
    },
    oXC(data) {
      this.item = data;
      this.isXiangCeShow = true;
    },
    xcClose() {
      this.isXiangCeShow = false;
    },
    oTuiJian(data) {
      let params = new URLSearchParams();
      params.append("id", data.id);
      // this.$http.post("", params).then(res => {
      //   if (res.code == 1) {
      //     this.getData();
      //   }
      // });
    },
    oShow(data) {
      let params = new URLSearchParams();
      params.append("id", data.id);
      // this.$http.post("", params).then(res => {
      //   if (res.code == 1) {
      //     this.getData();
      //   }
      // });
    }
  }
};
</script>


<style lang="scss" module>
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
.inp {
  width: 80%;
}
.sliderbox {
  display: flex;
}
.slider {
  flex: 1;
}
.avatar {
  width: 100px;
  height: 250px;
  border: 1px solid black;
}
.add {
  display: inline-block;
  position: absolute;
  right: 40px;
}
img {
  height: 100px;
  max-width: 100px;
}
</style>

