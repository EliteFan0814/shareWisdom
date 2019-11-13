<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="memberMobile"
            placeholder="请输入账号"
            clearable
            @change="filterData" />
        </div>
        <!-- <div>
          <el-input v-model="memberName"
            placeholder="请输入会员名称"
            clearable
            @change="filterData" />
        </div>-->
        <!-- <div>
          <el-select v-model="status"
            placeholder="请选择状态"
            @change="filterData"
            clearable>
            <el-option v-for="item in status_screen"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>-->
        <div>
          <el-select v-model="wayType"
            placeholder="请选择提现方式"
            @change="filterData"
            clearable>
            <el-option v-for="item in outOrderWay"
              :key="item.value"
              :label="item.name"
              :value="item.value" />
          </el-select>
        </div>
        <!-- <div>
          <el-date-picker v-model="dates"
            clearable
            @change="filterData"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">>
          </el-date-picker>
        </div>-->
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="withdrawList">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
              inline
              class="demo-table-expand">
              <el-form-item label="提现账号(卡号)：">
                <span>{{ props.row.carId }}</span>
              </el-form-item>
              <el-form-item label="账号类型：">
                <span>{{ props.row.bankName }}</span>
              </el-form-item>
              <el-form-item label="审核时间：">
                <span>{{ props.row.aduitDate }}</span>
              </el-form-item>
              <el-form-item label="驳回原因：">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center"
          min-width="120"
          label="会员信息">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.memberThumb"
              :name="row.memberName"
              :phone="row.memberMobile"></MemberInfo>
          </template>
        </el-table-column>
        <el-table-column label="提现金额"
          align="center">
          <template slot-scope="{row}">{{row.money}}</template>
        </el-table-column>

        <el-table-column label="手续费"
          align="center">
          <template slot-scope="{row}">{{row.handlingFee}}</template>
        </el-table-column>

        <el-table-column label="实际金额"
          align="center">
          <template slot-scope="{row}">{{row.trueOut}}</template>
        </el-table-column>

        <el-table-column label="提现方式"
          align="center">
          <template slot-scope="{row}">{{row.wayStr}}</template>
        </el-table-column>

        <!-- <el-table-column label="提现信息"
          align="center">
          <template slot-scope="{row}">{{row.bank!=""?row.bank:""}}</template>
        </el-table-column> -->

        <el-table-column label="提现状态"
          align="center">
          <template slot-scope="{row}">{{row.statusStr}}</template>
        </el-table-column>

        <el-table-column label="申请时间"
          min-width="110"
          align="center">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>
        <!-- <el-table-column label="审核时间"
          min-width="110"
          align="center">
          <template slot-scope="{row}">xxxxxxxx</template>
        </el-table-column>-->
        <el-table-column label="提现操作"
          width="160px"
          align="center">
          <template slot-scope="{row}">
            <el-button size="mini"
              v-if="row.status === -10"
              type="info"
              disabled>已驳回</el-button>
            <el-button size="mini"
              v-else-if="row.status === 10"
              type="success"
              disabled>已提现</el-button>
            <template v-else>
              <el-button @click="open(row, 'Y')"
                size="mini"
                type="primary">同意</el-button>
              <el-button @click="open(row, 'N')"
                size="mini"
                type="danger">驳回</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <BasePagination :max="maxPage"
        :totalCount="totalCount"
        :now.sync="nowPage"></BasePagination>
    </el-card>
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
      memberMobile: '',
      memberName: '',
      status_screen: [],
      status: '',
      outOrderWay: [],
      wayType: '',
      type: '',
      dates: [],
      withdrawList: [
        {
          id: 1,
          store_id: 1,
          type: 'ALI',
          bank: '11122220000111',
          account: '15236660020',
          memberName: '苹果',
          contact: '15236660020',
          apply_amount: '100.00',
          taxfee: '5.00',
          real_amount: '95.00',
          status: 0,
          remark: null,
          create_time: '2019-08-06 15:54:56',
          check_time: '2019-08-06 15:58:41',
          store_info: {
            name: '东翔啤串5营',
            account: '15236660020'
          },
          type_str: '支付宝',
          status_str: '成功'
        }
      ],
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 10
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
        .get('/api/MemberOut/WithdrawListSystem', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            wayType: this.wayType,
            mobile: this.memberMobile
          }
        })
        .then(res => {
          this.withdrawList = res.value.data
          this.maxPage = res.value.totalPage
          this.outOrderWay = res.outOrderWay
          this.totalCount = res.value.totalCount
        })
    },
    filterData() {
      this.getData()
      // this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    open(data, state) {
      if (state === 'Y') {
        this.$confirm(
          '确定通过 ' + data.memberName + ' 的提现请求吗?',
          '通过',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }
        )
          .then(res => {
            // let params = new URLSearchParams();
            // params.append("id", data.id);
            this.$http
              .post('/api/MemberOut/AuditOrder', {
                orderId: data.id,
                result: true
              })
              .then(res => {
                if (res.success) {
                  this.$message({
                    message: '已同意提现请求',
                    type: 'success'
                  })
                  this.getData()
                }
              })
          })
          .catch(() => {
            this.$message('已取消！')
          })
      } else {
        this.$prompt(
          '请输入驳回原因 ',
          '驳回 ' + data.memberName + ' 的提现请求吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true,
            inputPattern: /\S/,
            inputErrorMessage: '请输入驳回原因'
          }
        )
          .then(({ value }) => {
            // let params = new URLSearchParams();
            // params.append("id", data.id);
            // params.append("reason", value);
            this.$http
              .post('/api/MemberOut/AuditOrder', {
                orderId: data.id,
                result: false,
                remark: value
              })
              .then(res => {
                if (res.success) {
                  this.$message({
                    message: '成功驳回提现请求',
                    type: 'success'
                  })
                  this.getData()
                }
              })
          })
          .catch(() => {
            this.$message('已取消！')
          })
      }
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
      margin-right: 10px;
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 900px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>