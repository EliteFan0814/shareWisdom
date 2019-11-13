<template>
  <div>
    <el-card>

      <div slot="header"
        class="header">
        <div class="search">
          <span>搜索：</span>
          <el-input v-model="memberMobile"
            placeholder="请输入会员账号"
            @change="filterData"
            clearable />
        </div>
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>

      <div class="body">
        <el-table :data="tableData"
          style="width: 100%"
          row-key="memberId"
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'childCount'}">
          <el-table-column align="center"
            width="80"
            label="团队图谱">
          </el-table-column>
          <el-table-column align="center"
          min-width="120"
          label="会员信息">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.memberPhoto"
              :name="row.memberName"
              :phone="row.memberMobile"></MemberInfo>
          </template>
        </el-table-column>
          <el-table-column align="center"
            prop="childCount"
            label="直推人数">
          </el-table-column>
          <el-table-column align="center"
            prop="groupCount"
            label="团队人数">
          </el-table-column>
          <el-table-column align="center"
            prop="groupMoney"
            label="团队业绩">
          </el-table-column>
        </el-table>
      </div>
      <BasePagination :max="totalPage"
        :totalCount="totalCount"
        :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
export default {
  components: { MemberInfo, BasePagination },
  data() {
    return {
      memberMobile: '',
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      totalCount: 1,
      memberId: '',
      MyGroupId: '',
      tableData: [],
      groupChildren: []
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
    getData() {
      this.$http
        .get('/api/Member/TeamMap', {
          params: {
            memberMobile: this.memberMobile
          }
        })
        .then(res => {
          this.tableData = res.value.data
          this.totalCount = res.value.totalCount
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    load(row, treeNode, resolve) {
      this.getChildren(row).then(res => {
        resolve(res)
      })
    },
    getChildren(row) {
      return new Promise((resolve, reject) => {
        if (row.childCount > 0) {
          this.$http
            .get('/api/Member/TeamMap', { params: { memberId: row.memberId } })
            .then(res => {
              resolve(res.value.data)
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: '获取子账户失败',
                type: 'warning'
              })
            })
        }
      })
    }
    // getAllChildren(data) {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].childCount > 0) {
    //       this.$http
    //         .get('/api/Member/TeamMap', {
    //           params: {
    //             memberId: data[i].id
    //           }
    //         })
    //         .then(res => {
    //           data[i].children = res.value.data
    //           this.getAllChildren(data[i].children)
    //         })
    //         .catch(err => {
    //           this.$message({
    //             showClose: true,
    //             message: '获取子账户失败',
    //             type: 'warning'
    //           })
    //         })
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
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
}

.body {
  width: 100%;
}
</style>