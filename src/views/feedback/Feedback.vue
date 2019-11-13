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
        <el-button @click="filterData"
          type="primary">搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="tableData" ref="tableData">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
              inline
              class="demo-table-expand">
              <el-form-item label="留言内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="会员信息"
          align="center"
          width="200">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.userImg"
              :name="row.userName"
              :phone="row.phone"></MemberInfo>
          </template>
        </el-table-column>

        <el-table-column label="发布时间"
          align="center">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>
        <!-- <el-table-column label="留言内容"
          align="center"
          min-width="300">
          <template slot-scope="{row}">{{row.content}}</template>
        </el-table-column> -->
        <el-table-column label="是否已读"
          align="center">
          <template slot-scope="{row}">{{row.isRead?"已读":"未读"}}</template>
        </el-table-column>

        <!-- <el-table-column label="回复内容"
          align="center"
          min-width="200">
          <template slot-scope="{row}">{{row.reply}}</template>
        </el-table-column> -->

        <el-table-column label="操作"
          align="center"
          min-width="200">
          <template slot-scope="{row}">
            <!-- <el-button size="mini"
              @click="reply(row)"
              type="primary">
              回复
              <i class="el-icon-edit"></i>
            </el-button> -->
            <el-button size="mini"
              @click="detailInfo(row)"
              type="primary">
              查看留言
            </el-button>
            <el-button size="mini"
              @click="delCarousel(row.id)"
              type="danger">
              删除
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Reply :item="item"
      v-if="replyShow"
      @close="closeReply"></Reply>
    <BasePagination :max="maxPage"
      :totalCount="totalCount"
      :now.sync="nowPage"></BasePagination>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import Reply from './components/Reply'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    MemberInfo,
    Reply,
    BasePagination
  },
  data() {
    return {
      centerDialogVisible: false,
      item: {},
      isEditeShow: false,
      replyShow: false,
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 1,
      searchKey: '',
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
      this.nowPage == 1 ? this.getData() : (this.nowPage = 1)
    },
    getData() {
      this.$http
        .get('/api/Suggestion/SystemList', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            searchKey: this.searchKey
          }
        })
        .then(res => {
          this.tableData = res.value.data
          this.maxPage = res.value.totalPage
          this.totalCount = res.value.totalCount
          // this.maxPage = Math.ceil(res.data.total / 10);
        })
    },
    // reply(data) {
    //   this.item = data
    //   this.replyShow = true
    // },
    detailInfo(row) {
      this.$refs.tableData.toggleRowExpansion(row)
    },
    edite(data) {
      this.item = data
      this.isEditeShow = true
    },
    closeDia(value) {
      this.isEditeShow = false
      if (value) this.getData()
    },
    closeReply(value) {
      this.replyShow = false
      if (value) this.getData()
    },
    delCarousel(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/Suggestion/Delete', {
              id: id
            })
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getData()
              }
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
img {
  width: 50px;
  height: 50px;
}
</style>