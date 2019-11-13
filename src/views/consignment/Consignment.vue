<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="id"
            placeholder="订单号"
            @change="filterData"
            clearable />
        </div>
        <div>
          <el-select placeholder="订单状态"
            v-model="orderState"
            @change="filterData"
            clearable>
            <el-option v-for="item in orderStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="寄售状态"
            v-model="sellState"
            @change="filterData"
            clearable>
            <el-option v-for="item in sellStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <!-- <div>
          <el-select
            placeholder="会员信息"
            @change="filterData"
            clearable
          >
            <el-option
              v-for="item in payState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div> -->
        <!-- <div>
          <el-date-picker @change="filterData"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </div> -->
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="orderData"
        ref="orderData">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
              inline
              class="demo-table-expand">
              <el-form-item label="联系人：">
                <span>{{ props.row.contact }}</span>
              </el-form-item>
              <el-form-item label="联系电话：">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="收货地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="物流公司：">
                <span>{{ props.row.expressCompany }}</span>
              </el-form-item>
              <el-form-item label="物流单号：">
                <span>{{ props.row.expressNumber }}</span>
              </el-form-item>
              <el-form-item label="订单类型：">
                <span>{{ props.row.typeStr }}</span>
              </el-form-item>
              <el-form-item label="期数：">
                <span>{{ props.row.periodName }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column align="center"
          min-width="150"
          label="会员信息">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.memberPhoto"
              :name="row.memberName"
              :phone="row.memberPhone"></MemberInfo>
          </template>
        </el-table-column>
        <el-table-column label="排名"
          align="center"
          min-width="130">
          <template slot-scope="{row}"><strong>{{row.rank}}</strong></template>
        </el-table-column>
        <el-table-column label="订单号"
          align="center"
          min-width="120">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>

        <el-table-column label="商品名称"
          align="center">
          <template slot-scope="{row}">{{row.goodsName}}</template>
        </el-table-column>

        <el-table-column label="数量"
          align="center">
          <template slot-scope="{row}">{{row.goodsCount}}</template>
        </el-table-column>

        <el-table-column label="价格"
          align="center">
          <template slot-scope="{row}">{{row.price}}</template>
        </el-table-column>
        <el-table-column label="寄售价格"
          align="center">
          <template slot-scope="{row}">{{row.sellPrice}}</template>
        </el-table-column>
        <el-table-column label="订单状态"
          align="center">
          <template slot-scope="{row}">{{row.statusStr}}</template>
        </el-table-column>
        <el-table-column label="寄售状态"
          align="center">
          <template slot-scope="{row}">{{row.sellStatusStr}}</template>
        </el-table-column>
        <!-- <el-table-column label="创建时间"
          align="center"
          min-width="100">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间"
          align="center">
          <template slot-scope="{row}">{{row.endDate}}</template>
        </el-table-column> -->

        <el-table-column label="操作"
          min-width="180"
          align="center">
          <template slot-scope="{row}">
            <el-button @click="detailInfo(row)"
              size="mini"
              type="primary">
              详情
            </el-button>
            <el-button v-if="row.sellStatus < 0 && row.status === 10"
              @click="ship(row)"
              size="mini"
              type="primary">
              发货
            </el-button>
            <!-- <el-button v-if="row.status > 10"
              @click="wuliu(row)"
              size="mini"
              type="success">
              查看物流
            </el-button> -->

            <!-- <el-button @click="speedUp(row)"
              size="mini"
              type="success">
              芝麻提速记录
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <Details v-if="showDetails"
        :propitem="item"
        @close="showDetails=false"></Details>
      <SpeedUp v-if="showSpeedUp"
        :propitem="item"
        @close="showSpeedUp=false"></SpeedUp>
      <Wuliu v-if="showWuliu"
        :propitem="item"
        @close="showWuliu=false"></Wuliu>

      <DeliverGoods v-if="showFahuo"
        :goods="item"
        @close="closeDia"></DeliverGoods>

      <BasePagination :max="maxPage"
        :totalCount="totalCount"
        :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
import MemberInfo from '@/components/MemberInfo'
import Details from './components/Details'
import DeliverGoods from './components/DeliverGoods'
import SpeedUp from './components/SpeedUp'
import Wuliu from './components/Wuliu'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    MemberInfo,
    Details,
    DeliverGoods,
    SpeedUp,
    Wuliu,
    BasePagination
  },
  created() {
    this.sellState = this.$route.query.queryName === '寄卖中订单总数量' ? 0 : ''
    this.getData()
  },
  data() {
    return {
      orderState: '',
      sellState: '',
      showFahuo: false,
      showDetails: false,
      showSpeedUp: false,
      showWuliu: false,
      item: {},
      orderData: [],
      nowPage: 1,
      maxPage: 1,
      pageSize: 10,
      totalCount: 1,
      id: '',
      orderStatus: [],
      sellStatus: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  methods: {
    getData() {
      this.$http
        .get('/api/SellOrder/SellList', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            memberId: this.memberId,
            orderId: this.id,
            mobile: this.mobile,
            orderStatus: this.orderState,
            sellStatus: this.sellState
          }
        })
        .then(res => {
          this.orderData = res.value.data
          this.orderStatus = res.orderStatus
          this.sellStatus = res.sellStatus
          this.maxPage = res.value.totalPage
          this.totalCount = res.value.totalCount
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    speedUp(row) {
      this.item = row
      this.showSpeedUp = true
    },
    detailInfo(row) {
      // this.item = row
      // this.showDetails = true
      this.$refs.orderData.toggleRowExpansion(row)
    },
    // wuliu(row) {
    //   this.item = row
    //   this.showWuliu = true
    // },
    ship(data) {
      this.item = data
      this.showFahuo = true
    },
    closeDia(value) {
      this.showFahuo = false
      this.showWuliu = false
      this.showDetails = false
      if (value) this.getData()
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
<style lang= "scss" scoped>
.inp {
  margin-right: 10px;
  /* margin-top: -10px */
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>

