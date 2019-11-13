<template>
  <div>
    <el-card>
      <div
        slot="header"
        :class="$style.header"
      >
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input placeholder="关键词" v-model="keywords" @change="filterChange" clearable></el-input>
        </div>
          <el-button type="primary">搜索</el-button>
          <el-button
            class="edit"
            @click="onNew"
            type="primary"
          >
            新增参数
          </el-button>

        <div space></div>
      </div>
      <el-table :data="sysData">
        <el-table-column
          label="变量名称"
          align="center"
        >
          <template slot-scope="{row}">{{row.varname}}
          </template>
        </el-table-column>
        <el-table-column
          label="变量值"
          align="center"
        >
          <template slot-scope="{row}">
            <el-input
              v-if="row.isShow == true"
              v-model="row.varvalue"
            ></el-input>
            <span v-else>{{row.varvalue}}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="参数说明"
          align="center"
        >
          <template slot-scope="{row}">
            <el-input
              v-if="row.isShow == true"
              v-model="row.varinfo"
            ></el-input>
            <span v-else>{{row.varinfo}}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="排序"
          align="center"
        >
          <template slot-scope="{row}">
            <el-input
              v-if="row.isShow == true"
              v-model="row.orderid"
            ></el-input>
            <span v-else>{{row.orderid}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="备注"
          align="center"
        >
          <template slot-scope="{row}">{{row.remark}}</template>
        </el-table-column> -->
        <el-table-column
          label="操作"
          min-width="100px"
          align="center"
        >
          <template slot-scope="{row}">
            <div v-if="row.isShow">
              <el-button
                @click="checkOne(row,'Y')"
                size="mini"
                type="success"
              >
                确定
                <i class="el-icon-check"></i>
              </el-button>
              <el-button
                @click="checkOne(row)"
                size="mini"
                type="warning"
              >
                取消
                <i class="el-icon-close"></i>
              </el-button>
            </div>
            <div v-else>
              <el-button
                @click="edite(row)"
                size="mini"
                type="primary"
              >
                编辑
                <i class="el-icon-edit"></i>
              </el-button>
              <!-- <el-button
                @click="oDel(row)"
                size="mini"
                type="danger"
              >
                删除
                <i class="el-icon-delete"></i>
              </el-button> -->
            </div>

          </template>
        </el-table-column>
      </el-table>
      <NewInfo
        v-if="isNewInfo"
        @close="add"
      ></NewInfo>
      <Edit
        v-if="isEditShow"
        @close="editInfo"
        :item="item"
      ></Edit>
      <BasePagination
        :max="maxPage"
        :now.sync="nowPage"
      ></BasePagination>
    </el-card>
  </div>
</template>

<script>
import NewInfo from "./components/NewInfo";
import Edit from "./components/Edit";
import BasePagination from "@/components/BasePagination";

export default {
  components: {
    NewInfo,
    Edit,
    BasePagination
  },
  created () {
    this.getData();
  },
  data () {
    return {
      item: {},
      keywords: "",
      isEditShow: false,
      isNewInfo: false,
      sysData: [],
      maxPage: 1,
      nowPage: 1,
      text: true
    };
  },
  watch: {
    nowPage () {
      this.getData();
    }
  },
  methods: {
    getData () {
      this.$http
        .get("/manage/web_config/lists", {
          params: {
            page: this.nowPage,
            rows: 10,
            keywords: this.keywords
          }
        })
        .then(res => {
          res.data.list.map(item => {
            item.isShow = false
          });
          this.sysData = res.data.list
          this.maxPage = res.data.page_total
        }); 
             
    },
    filterChange () {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1);
    },
    onNew () {
      this.isNewInfo = true;
    },
    edite (row) {
      row.isShow = true      
    },
    checkOne (row, type) {
      if(type == 'Y'){
        let params = new URLSearchParams();
        //params.append("id", row.id);
        params.append("varname", row.varname);
        params.append("varinfo", row.varinfo);
        params.append("vargroup", row.vargroup);
        params.append("vartype", row.vartype);
        params.append("varvalue", row.varvalue);
        params.append("orderid", row.orderid);
        this.$http.post("/manage/web_config/edit", params).then(res => {
          if (res.code == 1) {
            this.getData()
          }
        });
      }else{
        this.$message.info('已取消修改')
        row.isShow = false;
      }
      
    },
    oDel (data) {
      this.$confirm("是否删除" + data.name + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: "true"
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", data.id);
          this.$http.post("/manage/param/del", params).then(res => {
            if (res.code == 1) {
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editInfo () {
      this.isEditShow = false;
      this.getData();
    },
    add () {
      this.isNewInfo = false;
      this.getData();
    }
  }
};
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
<style >
.edit {
  display: inline-block;
  position: absolute;
  right: 40px;
}
el-input {
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>


