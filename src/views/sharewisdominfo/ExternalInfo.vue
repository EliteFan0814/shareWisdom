<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <!-- <el-input v-model="search_key"
            placeholder="输入发布人姓名/电话"
            @change="filterData"
          clearable />-->

          <el-select v-model="worker_id" @clear="filterData" placeholder="选择行业" clearable>
            <el-option
              v-for="item in trade_class"
              :key="item.trade_id"
              :label="item.name"
              :value="item.trade_id"
            ></el-option>
          </el-select>

          <el-select
            v-model="province_id"
            style="margin-left:20px;"
            placeholder="选择省份"
            @clear="isClearProvinceId"
            @change="getCityList"
            clearable
          >
            <el-option
              v-for="item in province_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select
            v-model="city_id"
            placeholder="选择市"
            @clear="isClearCityId"
            @change="getDistrictList"
            :disabled="province_id?false:true"
            clearable
          >
            <el-option v-for="item in city_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>

          <el-select
            v-model="district_id"
            placeholder="选择区县"
            :disabled="province_id && city_id?false:true"
            clearable
          >
            <el-option
              v-for="item in district_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <el-button @click="addOrEdit" class="add" type="primary">发布新信息</el-button>
      </div>

      <el-table :data="info_data">
        <!-- 内部详情 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公司地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="发布时间：">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="更新时间：">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column label="发布者"
          min-width="120"
          align="center">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.avatar"
              :name="row.linkman"
              :position="row.position"
              :phone="row.phone"></MemberInfo>
          </template>
        </el-table-column>-->
        <el-table-column label="公司名称" prop="company_name" align="center" class="imgbox"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="招聘人数" prop="number" align="center"></el-table-column>
        <el-table-column label="工期要求" prop="project_ask" align="center"></el-table-column>
        <el-table-column label="费用预算" prop="price" align="center"></el-table-column>
        <el-table-column label="行业信息" prop="trade_name" align="center"></el-table-column>
        <el-table-column label="状态" width="80" prop="status_str" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="{row}">
            <el-button v-if="!row.is_time" @click="addOrEdit(row)" size="mini" type="primary">修改</el-button>
            <el-button @click="browsePic(row)" size="mini" type="primary">查看图片</el-button>
            <el-button v-if="!row.is_spread" @click="spread(row)" size="mini" type="success">推广</el-button>
            <el-button @click="deleteRow(row)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出 添加|编辑 器 -->
      <ExternAdOrEd
        v-if="is_edit_show"
        :trade_class="trade_class"
        :rowInfo="item"
        @close="closeDia"
      ></ExternAdOrEd>
      <!-- 弹出推广 -->
      <Spread
        v-if="is_spread_show"
        :now_title="item"
        :spread_list="spread_config"
        @close="closeDia"
      ></Spread>
      <!-- 弹出图片展示 -->
      <PicShow v-if="is_pic_show" :now_row="item" @close="closeDia"></PicShow>
      <!-- 分页 -->
      <BasePagination :max="total_page" :totalCount="total_count" :now.sync="now_page"></BasePagination>
    </el-card>
  </div>
</template>
<script>
// import MemberInfo from '@/components/MemberInfo'
import ExternAdOrEd from "./components/ExternAdOrEd";
import Spread from "./components/Spread";
import PicShow from "./components/PicShow";
import BasePagination from "@/components/BasePagination";

export default {
  components: {
    ExternAdOrEd,
    Spread,
    PicShow,
    BasePagination
  },
  data() {
    return {
      is_edit_show: false,
      is_spread_show: false,
      is_pic_show: false,
      now_page: 1,
      total_page: 1,
      page_size: 10,
      search_key: "",
      worker_id: "",
      trade_id: "",
      province_id: "",
      city_id: "",
      district_id: "",
      total_count: 1,
      trade_class: [],
      province_list: [],
      city_list: [],
      district_list: [],
      item: {},
      spread_state: "c",
      spread_config: [],
      info_data: [
        {
          avatar: "",
          name: undefined,
          phone: undefined,
          id: 0,
          title: "第一条信息",
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: "2019/11/06 15:01:48"
        },
        {
          avatar: "",
          name: "测试1",
          phone: "15093164000",
          id: 0,
          title: "第二条信息",
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: "2019/11/06 15:01:48"
        },
        {
          avatar: "",
          name: "测试2",
          phone: "15093164001",
          id: 0,
          title: "第三条信息",
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: "2019/11/06 15:01:48"
        }
      ]
    };
  },
  watch: {
    now_page() {
      this.getData();
    }
  },
  created() {
    this.getData();
    this.getConfigList();
    this.getTradeClass();
    this.getProvinceList();
  },
  methods: {
    getData() {
      this.info_data = [];
      // ----------获取列表接口----------
      this.$http
        .get("/company/order/lists", {
          params: {
            page: this.now_page,
            rows: this.page_size,
            keywords: this.search_key,
            worker_id: this.worker_id,
            company: 1,
            trade_id: this.trade_id,
            province_id: this.province_id,
            city_id: this.city_id,
            county_id: this.district_id
          }
        })
        .then(res => {
          this.info_data = res.data.lists;
          this.total_page = res.data.page_total;
          this.total_count = res.data.total;
          console.log(this.info_data[0].picture_json);
        });
    },
    filterData() {
      if (
        (this.province_id && this.city_id && this.district_id) ||
        !this.province_id
      ) {
        this.now_page === 1 ? this.getData() : (this.now_page = 1);
      } else {
        this.$alert("请选择具体省/市/区县", "信息不完整", {
          confirmButtonText: "确定"
        });
      }
    },
    getTradeClass() {
      this.$http.get("/company/trade/lists").then(res => {
        this.trade_class = res.data;
      });
    },
    // create 时就创建省列表
    getProvinceList() {
      if (this.province_id === "") {
        this.$http.get("/company/region/lists").then(res => {
          this.province_list = res.data.lists;
        });
      } else {
      }
    },
    isClearProvinceId() {
      this.city_id = ''
      this.district_id = ''
      this.filterData()
    },
    getCityList(province) {
      if (province) {
        this.$http
          .get("/company/region/lists", {
            params: {
              parent_id: province
            }
          })
          .then(res => {
            this.city_list = res.data.lists;
          });
      }
      if (!province) {
      }
    },
    isClearCityId() {
      this.district_id = "";
    },
    getDistrictList(city) {
      this.$http
        .get("/company/region/lists", {
          params: {
            parent_id: city
          }
        })
        .then(res => {
          this.district_list = res.data.lists;
          console.log("district_list", this.district_list);
        });
    },
    getConfigList() {
      this.$http
        .get("/company/company/params", {
          params: {
            state: this.spread_state
          }
        })
        .then(res => {
          if (res.code) {
            this.spread_config = res.data.lists;
          }
        });
    },
    addOrEdit(row) {
      if (row.order_id) {
        this.item = row;
      } else {
        this.item = {};
      }
      this.is_edit_show = true;
    },
    browsePic(row) {
      this.item = row;
      this.is_pic_show = true;
    },
    spread(row) {
      this.is_spread_show = true;
      this.item = row;
    },
    closeDia(update) {
      this.is_edit_show = false;
      this.is_spread_show = false;
      this.is_pic_show = false;
      if (update) this.getData();
    },
    deleteRow(row) {
      this.$confirm("确定删除 " + row.title + " 吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          // ----------删除接口----------
          this.$http
            .post("/company/order/del", {
              order_id: row.order_id
            })
            .then(() => {
              this.getData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
<style lang="scss" scoped>
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
.img {
  width: 80px;
}
.demo-table-expand {
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>

