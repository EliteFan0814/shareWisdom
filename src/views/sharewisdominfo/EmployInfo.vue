<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="SearchKey"
            placeholder="输入标题内容"
            @change="filterData"
            clearable />
        </div>
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <el-button @click="addOrEdit"
          class="add"
          type="primary">
          发布新信息
        </el-button>
      </div>

      <el-table :data="infoData">
        <el-table-column label="发布者"
          align="center">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.avatar"
              :name="row.name"
              :phone="row.phone"></MemberInfo>
          </template>
        </el-table-column>
        <el-table-column label="信息ID"
          prop="id"
          align="center"
          class="imgbox">
        </el-table-column>
        <el-table-column label="信息标题"
          prop="title"
          min-width="120"
          align="center">
        </el-table-column>
        </el-table-column>
        <el-table-column label="创建时间"
          prop="createdDate"
          align="center">
        </el-table-column>
        <el-table-column label="操作"
          width="300"
          align="center">
          <template slot-scope="{row}">
            <el-button @click="addOrEdit(row)"
              size="mini"
              type="primary">
              查看 | 修改
            </el-button>
            <el-button @click="deleteRow(row)"
              size="mini"
              type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出 添加|编辑 器 -->
      <AddOrEdit v-if="isEditShow"
        :rowInfo="item"
        @close="closeDia"></AddOrEdit>
      <BasePagination :max="totalPage"
        :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
import MemberInfo from '@/components/MemberInfo'
import AddOrEdit from './components/AddOrEdit'
import BasePagination from '@/components/BasePagination'

export default {
  components: {
    MemberInfo,
    AddOrEdit,
    BasePagination
  },
  data() {
    return {
      isEditShow: false,
      SearchKey: '',
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      item: {},
      infoData: [
        {
          avatar: '',
          name: '',
          phone: '',
          id: 0,
          title: '第一条信息',
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: '2019/11/06 15:01:48'
        },
        {
          avatar: '',
          name: '测试1',
          phone: '15093164000',
          id: 0,
          title: '第二条信息',
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: '2019/11/06 15:01:48'
        },
        {
          avatar: '',
          name: '测试2',
          phone: '15093164001',
          id: 0,
          title: '第三条信息',
          content: `桃花坞里桃花庵，桃花庵下桃花仙；桃花仙人种桃树，又摘桃花卖酒钱。 
                        酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。 
                        但愿老死花酒间，不愿鞠躬车马前；车尘马足富者趣，酒盏花枝贫者缘。 
                        若将富贵比贫贱，一在平地一在天；若将贫贱比车马，他得驱驰我得闲。`,
          createdDate: '2019/11/06 15:01:48'
        }
      ]
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      this.infoData = []
      // ----------获取列表接口----------
      // this.$http
      //   .get('/api/Goods/GoodsList', {
      //     params: {
      //       page: this.nowPage,
      //       pageSize: 10,
      //       SearchKey: this.SearchKey
      //     }
      //   })
      //   .then(res => {
      //     this.infoData = res.value.data
      //     this.totalPage = res.value.totalPage
      //   })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    addOrEdit(row) {
      this.item = row
      this.isEditShow = true
    },
    closeDia(update) {
      this.isEditShow = false
      if (update) this.getData()
    },
    deleteRow(row) {
      this.$confirm('确定删除商品 ' + row.name + ' 吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          // ----------删除接口----------
          // this.$http
          //   .post('/api/Goods/Delete', {
          //     goodsId: row.id
          //   })
          //   .then(() => {
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     })
          //     this.getData()
          //   })
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

