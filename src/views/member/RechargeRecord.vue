<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="searchKey"
            placeholder="请输入会员名称"
            @change="filterData"
            clearable />
        </div>
        <div>
          <el-input v-model="mobile"
            placeholder="请输入账号"
            @change="filterData"
            clearable />
        </div>
        <el-select placeholder="充值类型"
          v-model="systemChargeTypeValue"
          @change="filterData"
          clearable>
          <el-option v-for="item in systemChargeType"
            :key="item.value"
            :label="item.name"
            :value="item.value"></el-option>
        </el-select>
        <!-- <div>
          <el-date-picker
          @change="filterData"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div> -->
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="memberList">
       <el-table-column align="center"
       width="200"
          label="会员信息">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.memberPhoto"
              :name="row.memberName"
              :phone="row.memberMobile"></MemberInfo>
          </template>
        </el-table-column>
        <el-table-column label="充值类型"
          align="center">
          <template slot-scope="{row}">{{row.chargeTypeStr}}</template>
        </el-table-column>
        <el-table-column label="充值金额"
          align="center">
          <template slot-scope="{row}">{{row.chargeValue}}</template>
        </el-table-column>
        <el-table-column label="充值时间"
          align="center">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>

      </el-table>
    </el-card>
    <BasePagination :max="maxPage"
      :totalCount="totalCount"
      :now.sync="nowPage"></BasePagination>
  </div>
</template>
<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    MemberInfo,
    BasePagination
  },
  created() {
    this.getData()
  },
  data() {
    return {
      item: {},
      searchKey: '',
      mobile: '',
      dates: [],
      memberList: [],
      systemChargeType: [],
      systemChargeTypeValue: '',
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 1
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
        .get('/api/MemberCharge/RechargeList', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            searchKey: this.searchKey,
            mobile: this.mobile,
            systemChargeType: this.systemChargeTypeValue
          }
        })
        .then(res => {
          this.memberList = res.value.data
          this.maxPage = res.value.totalPage
          this.totalCount = res.value.totalCount
          this.systemChargeType = res.systemChargeType
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
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
el-table-column {
  height: 50px;
}
</style>
