<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords"
            placeholder="输入商品名称"
            @change="filterData"
            clearable />
        </div>
        <!-- <div>
          <el-cascader :options="fenlei" :props="prop_good" @change="filterData" placeholder="选择商品分类" clearable>
          </el-cascader>
        </div>
        <div>
          <el-select @change="filterData" placeholder="选择状态" clearable>
            <el-option
              v-for="item in shangjia"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-select @change="filterData" placeholder="推荐状态" clearable>
            <el-option
              v-for="item in tuijian"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <el-button @click="addGoods"
          class="add"
          type="primary">
          添加商品
        </el-button>
      </div>

      <el-table :data="goodsData">
        <el-table-column label="商品ID"
          align="center">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>
        <el-table-column label="商品缩略图"
          align="center"
          class="imgbox">
          <template slot-scope="{row}">
            <img :src="row.thumb"
              class="img">
          </template>
        </el-table-column>
        <el-table-column label="名称"
          min-width="120"
          align="center">
          <template slot-scope="{row}">{{row.name}}</template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="零售价"
          align="center">
          <template slot-scope="{row}">{{row.retailPrice}}</template>
        </el-table-column>
        <el-table-column label="批发价"
          align="center">
          <template slot-scope="{row}">{{row.wholesalePrice}}</template>
        </el-table-column>
        <el-table-column label="批发价所需优惠券"
          align="center"
          min-width="150">
          <template slot-scope="{row}">{{row.wholesaleCoupon}}</template>
        </el-table-column>
        <el-table-column label="批发价所需芝麻"
          align="center"
          min-width="150">
          <template slot-scope="{row}">{{row.wholesaleSesame}}</template>
        </el-table-column>
        <el-table-column label="本期库存"
          align="center">
          <template slot-scope="{row}">{{row.currentPeriodCount}}</template>
        </el-table-column>
        <el-table-column label="期次限购数量"
          align="center">
          <template slot-scope="{row}">{{row.periodLimit}}</template>
        </el-table-column>
        <el-table-column label="期次库存"
          align="center">
          <template slot-scope="{row}">{{row.periodCount}}</template>
        </el-table-column>
        <el-table-column label="操作"
          width="300"
          align="center">
          <template slot-scope="{row}">
            <el-button @click="edite(row)"
              size="mini"
              type="primary">
              编辑
            </el-button>
            <!-- <el-button @click="guige(row)" size="mini" type="success">
              规格
            </el-button> -->
            <!-- <el-button @click="xiangce(row)" size="mini" type="success">
              相册
            </el-button> -->
            <el-button @click="del(row)"
              size="mini"
              type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出对话框 -->
      <tianjia v-if="isAddShow"
        @close="closeDia"
        :fenlei="fenlei"></tianjia>
      <Edite v-if="isEditShow"
        @close="closeDia"
        :propitem="item"
        :fenlei="fenlei"></Edite>
      <BasePagination :max="totalPage"
        :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
// import shangpinxiangce from './components/goodsManage/shangpinxiangce'
import tianjia from './components/goodsManage/tianjia'
import Edite from './components/goodsManage/Edite'
// import Guige from './components/goodsManage/guige'
import BasePagination from '@/components/BasePagination'

export default {
  components: {
    tianjia,
    Edite,
    BasePagination
  },
  data() {
    return {
      prop_good: {
        value: 'cate_id',
        label: 'name',
        checkStrictly: true
      },
      isEditShow: false,
      isAddShow: false,
      keywords: '',
      goodsData: [],
      totalPage: 1,
      nowPage: 1,
      pageSize: 10,
      fenlei: [],
      leixing: [],
      shangjia: [],
      tuijian: [],
      item: {}
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getFenLei() {
      this.$http.get('').then(res => {
        var group = res.data.list.reduce((value, item) => {
          value[item.parent_id] = value[item.parent_id] || []
          value[item.parent_id].push(item)
          return value
        }, {})
        group[0].map(item => {
          if (group[item.cate_id]) item.children = group[item.cate_id]
        })
        this.fenlei = group[0]
      })
    },
    getData() {
      this.goodsData = []
      this.$http
        .get('/api/Goods/GoodsList', {
          params: {
            page: this.nowPage,
            pageSize: 10,
            SearchKey: this.keywords
          }
        })
        .then(res => {
          this.goodsData = res.value.data
          this.totalPage = res.value.totalPage
        })
    },
    filterData() {
      this.getData()
    },
    add() {
      this.dialogVisible = true
    },
    //添加报单商品
    addGoods() {
      this.isAddShow = true
    },
    edite(data) {
      this.item = data
      this.isEditShow = true
    },
    closeDia(value) {
      this.isEditShow = false
      this.isAddShow = false
      if (value) this.getData()
    },
    del(item) {
      this.$confirm('确定删除商品 ' + item.name + ' 吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/Goods/Delete', {
              goodsId: item.id
            })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getData()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
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
.img {
  width: 80px;
}
</style>

