<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="searchKey"
            placeholder="请输入用户登录名"
            @change="filterData"
            clearable />
        </div>
        <el-button @click="filterData"
          type="primary">搜索
          <i class="el-icon-search"></i>
        </el-button>
        <!-- <el-button @click="addSystemUser"
          class="add"
          type="primary">
          添加系统用户
        </el-button> -->
      </div>
      <el-table :data="tableData">
        <el-table-column label="登录名"
          align="center"
          min-width="100">
          <template slot-scope="{row}">{{row.loginName}}</template>
        </el-table-column>
        <el-table-column label="昵称"
          align="center"
          min-width="150">
          <template slot-scope="{row}">{{row.name}}</template>
        </el-table-column>
        <el-table-column label="电话"
          align="center"
          min-width="120">
          <template slot-scope="{row}">{{row.mobile}}</template>
        </el-table-column>
        <el-table-column label="角色"
          align="center"
          min-width="120">
          <template slot-scope="{row}">{{row.userTypeStr}}</template>
        </el-table-column>
        <el-table-column label="状态"
          align="center"
          min-width="120">
          <template slot-scope="{row}">{{row.isLockedStr}}</template>
        </el-table-column>
        <el-table-column label="上次登陆时间"
          align="center"
          min-width="120">
          <template slot-scope="{row}">{{row.lastLogin}}</template>
        </el-table-column>
        <el-table-column label="操作"
          align="center"
          min-width="200">
          <template slot-scope="{row}">
            <el-button size="mini"
              type="primary"
              @click="edit(row)">编辑</el-button>
            <el-button size="mini"
              type="warning"
              @click="resetPwd(row)">重置密码</el-button>
            <el-button size="mini"
              :type="row.isLocked?'info':'danger'"
              @click="lock(row)">{{row.isLocked?'解锁':'锁定'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ResetPwd v-if="showResetPwd"
        :item="item"
        @close="closeDia"></ResetPwd>
      <EditUser v-if="isEditeShow"
        :item="item"
        @close="closeDia"></EditUser>
      <BasePagination :max="maxPage"
        :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import ResetPwd from './components/ResetPwd'
import EditUser from './components/EditUser'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    ResetPwd,
    EditUser,
    BasePagination
  },
  data() {
    return {
      item: {},
      isEditeShow: false,
      showResetPwd: false,
      searchKey: '',
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  methods: {
    filterData() {
      this.nowPage == 1 ? this.getData() : this.nowPage = 1;
    },
    getData() {
      this.$http
        .get('/api/SystemUser/List', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            searchKey: this.searchKey
          }
        })
        .then(res => {
          this.tableData = res.value.data
          this.maxPage = res.value.totalPage
          // this.maxPage = Math.ceil(res.data.total / 10);
        })
    },
    // addSystemUser(){
    //   this.item = {}
    //   this.isEditeShow = true
    // },
    edit(row) {
      this.item = row
      this.isEditeShow = true
    },
    resetPwd(data) {
      this.item = data
      this.showResetPwd = true
    },
    lock(row) {
      if (row.isLocked) {
        this.$confirm('确定要解锁该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$http
              .post('/api/SystemUser/UnLock', {
                userId: row.id
              })
              .then(res => {
                if (!res.errCode) {
                  this.$message.success('该用户已解锁')
                  this.getData()
                }
              })
          })
          .catch(() => {
            this.$message.info('取消解锁用户')
          })
      } else {
        this.$confirm('确定要锁定该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$http
              .post('/api/SystemUser/Locked', {
                userId: row.id
              })
              .then(res => {
                if (!res.errCode) {
                  this.$message.success('该用户已锁定')
                  this.getData()
                }
              })
          })
          .catch(() => {
            this.$message.info('取消锁定用户')
          })
      }
    },
    closeDia(value) {
      this.showResetPwd = false
      this.isEditeShow = false
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
<style scoped>
  .add {
  display: inline-block;
  position: absolute;
  right: 40px;
}
</style>