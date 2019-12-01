<template>
  <div>
    <el-card>
      <div slot="header"
        :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-select v-model="bill_class"
            @clear="filterData"
            placeholder="选择账单类型"
            clearable>
            <el-option v-for="item in bill_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button @click="filterData"
          type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <!-- <span class="add">当前余额：{{nowBalance}}</span> -->
        <!-- <el-button @click="addOrEdit"
          class="add"
          type="primary">
          发布新信息
        </el-button> -->
      </div>

      <el-table :data="infoData">
        <!-- <el-table-column label="账号"
          align="center">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.avatar"
              :name="row.name"
              :phone="row.phone"></MemberInfo>
          </template>
        </el-table-column> -->
        <el-table-column label="账单类型"
          prop="class_str"
          align="center"
          class="imgbox">
        </el-table-column>
        <el-table-column label="账单金额(元)"
          prop="amount"
          align="center"
          class="imgbox">
        </el-table-column>
        <el-table-column label="创建时间"
          prop="create_time"
          align="center"
          class="imgbox">
        </el-table-column>
        <el-table-column label="备注"
          prop="remark"
          min-width="120"
          align="center">
        </el-table-column>
        <!-- <el-table-column label="创建时间"
          prop="createdDate"
          align="center">
        </el-table-column>
        <el-table-column label="操作"
          width="300"
          align="center">
          <template slot-scope="{row}">
            <el-button @click="deleteRow(row)"
              size="mini"
              type="danger">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
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
  components: {
    MemberInfo,
    BasePagination
  },
  data() {
    return {
      isEditShow: false,
      SearchKey: '',
      nowBalance: 88888,
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      totalCount: 1,
      item: {},
      bill_class: '',
      bill_list: [],
      infoData: [
        {
          avatar: '',
          name: '测试0',
          phone: '15093105410',
          id: 1,
          amount: 0,
          amountType: '转入',
          title: '第一条账单',
          createdDate: '2019/11/06 15:01:48'
        },
        {
          avatar: '',
          name: '测试1',
          phone: '15093164000',
          id: 2,
          amount: 12300,
          amountType: '借贷',
          title: '第二条账单',
          createdDate: '2019/11/06 15:01:48'
        },
        {
          avatar: '',
          name: '测试2',
          phone: '15093164001',
          id: 3,
          amount: 7982.0,
          amountType: '转出',
          title: '第三条账单',
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
    this.getData()
  },
  methods: {
    getData() {
      this.infoData = []
      // ----------获取列表接口----------
      this.$http
        .get('/company/company_bill/lists', {
          params: {
            page: this.nowPage,
            rows: 10,
            class: this.bill_class,
            starttime: this.start_time,
            endtime: this.end_time
          }
        })
        .then(res => {
          console.log(res)
          this.infoData = res.data.list
          this.totalPage = Number(res.data.page)
          this.totalCount = res.data.total
          this.bill_list = res.data.class_screen
        })
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
      this.$confirm('确定删除账单 ' + row.name + ' 吗?', '提示', {
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

