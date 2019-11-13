<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <el-button @click="add()"
            class="add"
            type="primary">
            添加
          </el-button>
        </div>
      </div>
      <el-table :data="tableData">
        <!-- <el-table-column label="ID" align="center">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column> -->
        <el-table-column label="文章ID"
          align="center"
          min-width="200">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>
        <el-table-column label="标题"
          align="center"
          min-width="200">
          <template slot-scope="{row}">{{row.title}}</template>
        </el-table-column>
        <el-table-column label="创建时间"
          align="center"
          min-width="200">
          <template slot-scope="{row}">{{row.createDate}}</template>
        </el-table-column>
        <el-table-column label="操作"
          align="center"
          min-width="200">
          <template slot-scope="{ row }">
            <el-button type="primary"
              size="mini"
              @click="edite(row)">查看 | 修改</el-button>
            <el-button type="danger"
              size="mini"
              @click="del(row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <EditProblem v-if="isEditeShow"
      :item="item"
      @close="closeDia"></EditProblem>
    <BasePagination :max="maxPage"
      :totalCount="totalCount"
      :now.sync="nowPage"></BasePagination>
  </div>
</template>

<script>
import EditProblem from './components/EditProblem'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    EditProblem,
    BasePagination
  },
  data() {
    return {
      item: {},
      isEditeShow: false,
      index: 3,
      nowPage: 1,
      pageSize: 10,
      maxPage: 1,
      totalCount: 10,
      type: 'platform_placard',
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/api/Article/List', {
          params: {
            page: this.nowPage,
            pageSize: this.pageSize,
            type: this.type
          }
        })
        .then(res => {
          this.tableData = res.value.data
          this.maxPage = res.value.totalPage
          this.totalCount = res.value.totalCount
          // this.maxPage = Math.ceil(res.data.total / 10);
        })
    },
    add() {
      this.item = {}
      this.isEditeShow = true
    },
    edite(data) {
      this.item = data
      this.isEditeShow = true
    },
    del(data) {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/Article/Delete', {
              id: data.id
            })
            .then(res => {
              if (res.success) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getData()
              }
            })
        })
        .catch(() => {
          this.$message('已取消删除！')
        })
    },
    closeDia(value) {
      this.isEditeShow = false
      if (value) this.getData()
    },
    addOne(name, cate, textarea) {
      this.tableData.push({ index, name, cate, textarea })
      index++
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
  }
}
</style>