<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords" placeholder="关键词" @change="filterData" clearable/>
        </div>
        <div :class="$style.search">
          <el-cascader v-model="classid" :options="classList" :props="prop_good" @change="filterData" placeholder="栏目筛选" :show-all-levels="true"  clearable>
          </el-cascader>
          <!-- <el-input v-model="classname" placeholder="栏目" clearable/> -->
        </div>
        <div class="selectcontainer">
          <el-select v-model="value5" placeholder="状态筛选" @change="filterData" clearable>
            <el-option
              v-for="item in vStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        
        <el-button @click="addList" type="primary" class="add">
          添加列表信息
        </el-button>
      </div>
      <el-table :data="tableData">

        <el-table-column label="ID" align="center" min-width="40">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>
        <el-table-column label="缩略图" align="center">
          <template slot-scope="{row}">
            <img :src="row.picurl">
          </template>
        </el-table-column>
        
        <el-table-column label="标题" align="center" min-width="100">
          <template slot-scope="{row}">{{row.title}}</template>
        </el-table-column>
        <el-table-column label="栏目" align="center">
          <template slot-scope="{row}">{{row.classname}}</template>
        </el-table-column>
        <el-table-column label="点击次数" align="center">
          <template slot-scope="{row}">{{row.hits}}</template>
        </el-table-column>

        <el-table-column label="排序" align="center">
          <template slot-scope="{row}">{{row.orderid}}</template>
        </el-table-column>

        <el-table-column label="更新时间" align="center" min-width="100">
          <template slot-scope="{row}">{{row.posttime_str}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
          <el-button size="mini" @click="changeStatus(row)" :type="row.checkinfo == 1 ? 'success' : 'info'">
            {{row.checkinfo_str}}
          </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template slot-scope="{row}">
            <el-button @click="details(row)" size="mini" type="primary">
              编辑
            </el-button>
            <el-button @click="photo(row)" size="mini" type="success">
              相册
            </el-button>
            <el-button @click="del(row)" size="mini" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Details v-if="isShowDetail" @close="closeDia" :form="form" :list="classList"></Details>
      <AddList v-if="isStatistics" @close="closeDia" :form="form" :list="classList"></AddList>
      <Photos v-if="isPhoto" @close="closeDia" :form="form"></Photos>
      <BasePagination :max="maxPage" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>
<script>
import Details from "./components/business_c/Details";
import AddList from "./components/business_c/AddList";
import Photos from "./components/business_c/Photos";
import BasePagination from "@/components/BasePagination";
export default {
  components: {
    Details,
    AddList,
    Photos,
    BasePagination
  },
  created() {
    this.getData();
    this.getClassList();
  },
  data() {
    return {
      prop_good:{ 
        checkStrictly : true,
        children: 'child'
      },
      value: "",
      classid: "",
      value5: "",
      status: "",
      keywords: "",
      form: {},
      isPhoto: false,
      isShowDetail: false,
      isStatistics: false,
      tableData: [],
      vipGrade: [
        // {value: true,label: '推荐'},
        // {value: false,label: '不推荐'}
      ],
      classList:[],
      vStatus: [],
      maxPage: 1,
      nowPage: 1
    };
  },
  watch: {
    nowPage() {
      this.getData();
    }
  },
  methods: {
    closeDia(value){
      if(value)this.getData()
      this.isShowDetail = false;
      this.isStatistics = false;
      this.isPhoto=false;
    },
    getClassList(){
      this.$http.get("/manage/Info_class/lists",{
          params: {
            //type: 3,
            style: 'tree',
          }
        }).then(res => {
          this.classList = this.checkDisabled(res.data.list);
          this.st
        });
    },
    checkDisabled(list){
      list.map(one => {
        if(one.infotype != 3){
          one.disabled = true;
        }
        if(one.child){
          this.checkDisabled(one.child);
        }
      });
      return list;
    },
    getData() {
      this.$http.get("/manage/info_list/lists", {
          params: {
            page: this.nowPage,
            rows: 10,
            checkinfo: this.value5,
            classid: this.classid[this.classid.length-1],
            keywords: this.keywords
          }
        })
        .then(res => {
          this.tableData = res.data.list;
          this.vStatus = res.data.checkinfo_screen;
          this.maxPage = Math.ceil(res.data.total / 8);
        });
        
    },
    addList() {
      this.isStatistics = true;
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
    },
    photo(data) {
      this.isPhoto = true;
      this.form = data;
    },
    del(data){
      
      this.$confirm("确定要删除吗？", "提示？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", data.id);
          this.$http.post("/manage/info_list/del", params).then(res => {
            if (res.code == 1) {
              this.getData()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    },
           
    details(data){
      this.isShowDetail = true;
      this.form = data;
    },
    changeStatus(row) {
      let params = new URLSearchParams();
      params.append("id", row.id);
      this.$http.post("/manage/info_list/check", params).then(res => {
        if (res.code == 1) {
          this.getData();
        }
      });
      // row.status == 1 ?(row.status = 0, row.status_str = '不显示') : (row.status = 1 , row.status_str = '显示')
    },
    oFill() {
      this.isRefillShow = false;
      // this.getData()
    }
  }
};
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
<style scoped>
img {
  width: 50px;
  height: 50px;
}
.add {
  margin-left: auto;
}
</style>
