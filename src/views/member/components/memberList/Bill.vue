<template>
  <el-dialog :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :title="form.name + ' 的充值记录'"
    width="58%"
    :center="true">

    <div :class="$style.header">
      <div :class="$style.search">
        <span>搜索：</span>
        <el-select v-model="chargeWay"
          clearable
          @change="filterData"
          placeholder="请选择金额来源类型">
          <el-option v-for="item in wayType"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="selectcontainer">
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
    </div>

    <el-tabs v-model="activeName"
      @tab-click="getTable">

      <el-tab-pane label="芝麻充值记录"
        name="first">
        <el-table :data="tableData"
          style="width: 100%">
          <el-table-column prop="memberName"
            label="会员名"
            width="150">
          </el-table-column>
          <el-table-column prop="memberMobile"
            label="会员电话"
            width="150">
          </el-table-column>
          <el-table-column prop="sesame"
            label="芝麻数"
            width="150">
          </el-table-column>
          <el-table-column prop="isIncomeStr"
            label="收入支出"
            width="150">
          </el-table-column>
          <el-table-column prop="wayStr"
            label="金额来源"
            width="150">
          </el-table-column>
          <el-table-column prop="createDate"
            label="充值时间"
            width="180">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="优惠券充值记录"
        name="second">
        <el-table :data="tableData"
          style="width: 100%">
          <el-table-column prop="memberName"
            label="会员名"
            width="150">
          </el-table-column>
          <el-table-column prop="memberMobile"
            label="会员电话"
            width="150">
          </el-table-column>
          <el-table-column prop="coupon"
            label="优惠券"
            width="150">
          </el-table-column>
          <el-table-column prop="isIncomeStr"
            label="收入支出"
            width="150">
          </el-table-column>
          <el-table-column prop="wayStr"
            label="金额来源"
            width="150">
          </el-table-column>
          <el-table-column prop="createDate"
            label="充值时间"
            width="180">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="奖金充值记录"
        name="third">
        <el-table :data="tableData"
          style="width: 100%">
          <el-table-column prop="memberName"
            label="会员名"
            width="150">
          </el-table-column>
          <el-table-column prop="memberMobile"
            label="会员电话"
            width="150">
          </el-table-column>
          <el-table-column prop="money"
            label="充值金额"
            width="150">
          </el-table-column>
          <el-table-column prop="isIncomStr"
            label="收入支出"
            width="150">
          </el-table-column>
          <el-table-column prop="wayStr"
            label="金额来源"
            width="150">
          </el-table-column>
          <el-table-column prop="createDate"
            label="充值时间"
            width="180">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <BasePagination :max="maxPage"
      :now.sync="nowPage"></BasePagination>
  </el-dialog>
</template>

<script>
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    BasePagination
  },
  watch: {
    // value() {
    //   this.getData()
    // },
    nowPage() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  props: ['form'],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      tableUrl: '/api/MemberAccount/SesameDetailListSystem',
      chargeWay: '',
      chargeWayText: 'sesameWay',
      wayType: [],
      searchMemberMobile: '',
      isDialog: true,
      data: [],
      formData: [],
      accountType: [],
      accountTypeText: '',
      cate_screen: [],
      value: '',
      nowPage: 1,
      maxPage: 1,
      pageSize: 10,
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
  computed: {
    paramsText() {
      return {
        page: this.nowPage,
        pageSize: this.pageSize,
        memberMobile: this.searchMemberMobile,
        memberId: this.form.id
      }
    }
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // },

    getTable(tab) {
      let allUrl = [
        {
          url: '/api/MemberAccount/SesameDetailListSystem',
          chargeWayText: 'sesameWay'
        },
        {
          url: '/api/MemberAccount/CouponDetailListSystem',
          chargeWayText: 'couponWay'
        },
        { url: '/api/MemberAccount/BnousList', chargeWayText: 'accountType' }
      ]
      let chargeWay = ['sesameWay', 'couponWay', 'accountType']
      this.chargeWay = ''
      if (tab.name === 'first') {
        this.tableUrl = allUrl[0].url
        this.chargeWayText = allUrl[0].chargeWayText
        this.filterData()
      } else if (tab.name === 'second') {
        this.tableUrl = allUrl[1].url
        this.chargeWayText = allUrl[1].chargeWayText
        this.filterData()
      } else {
        this.tableUrl = allUrl[2].url
        this.chargeWayText = allUrl[2].chargeWayText
        this.filterData()
      }
    },

    getData() {
      this.tableData = []
      this.$http
        .get(this.tableUrl, {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            memberMobile: this.searchMemberMobile,
            memberId: this.form.id,
            sesameWay: this.chargeWay,
            couponWay: this.chargeWay,
            accountType: this.chargeWay
          }
        })
        .then(res => {
          this.tableData = res.value.data
          this.maxPage = res.value.totalPage
          this.wayType = res[this.chargeWayText]
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    close() {
      this.$emit('close')
    }
  }
}
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
<style>
.inp {
  border: none;
  height: 30px;
}
</style>



