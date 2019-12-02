<template>
  <el-dialog :title="rowInfo.recruit_id?'编辑当前用工信息':'发布用工信息'" :visible.sync="isDialog" :close-on-click-modal="false" @close="close" :center="true" width="50%">
    <el-form :rules="rules" :model="innerRowInfo" ref="rowInfo" label-position="right" label-width="12%">
      <el-form-item label="标题：" prop="title">
        <el-input placeholder="请输入标题" v-model="innerRowInfo.title"></el-input>
      </el-form-item>

      <!-- <div class="about-job"> -->
      <el-form-item label="工种：" prop="worker_id">
        <el-select v-model="innerRowInfo.worker_id" placeholder="请选择工种">
          <el-option v-for="item in worker_class" :key="item.worker_id" :label="item.name" :value="item.worker_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工期：" prop="type">
        <el-select v-model="innerRowInfo.type" placeholder="请选择工期">
          <el-option label="长期" value="长期"></el-option>
          <el-option label="短期" value="短期"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪资：" prop="salary">
        <el-input style="width:165px;" placeholder="请输入薪资" v-model="innerRowInfo.salary"></el-input>&nbsp;(元)&nbsp;每{{innerRowInfo.type==='长期'?'月':'天'}}
      </el-form-item>
      <!-- </div> -->

      <el-form-item label="所需人数" prop="number">
        <el-input placeholder="请输入所需人数" v-model="innerRowInfo.number"></el-input>
      </el-form-item>

      <el-form-item label="公司名称：" prop="company_name">
        <el-input placeholder="请输入公司名称" v-model="innerRowInfo.company_name"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="linkman">
        <el-input placeholder="请输入联系人" v-model="innerRowInfo.linkman"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="phone">
        <el-input placeholder="请输入联系电话" v-model="innerRowInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="职位：" prop="position">
        <el-input placeholder="请输入职位" v-model="innerRowInfo.position"></el-input>
      </el-form-item>
      <el-form-item label="公司地址：" prop="map_location">
        <Amap @getPosition="readPosition" :th_position="rowInfo" :user_id="rowInfo.recruit_id" :what_class="'recruit'"></Amap>
      </el-form-item>
    </el-form>
    <span slot="footer" align="right" class="dialog-footer">
      <el-button @click="isDialog= false">取 消</el-button>
      <el-button type="primary" @click="submit('rowInfo')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Editor from '@/components/RichText'
import Amap from '@/components/amap'
export default {
  components: {
    Editor,
    Amap
  },
  props: ['rowInfo', 'worker_class'],
  created() {
    if (this.rowInfo.recruit_id) {
      this.innerRowInfo = JSON.parse(JSON.stringify(this.rowInfo))
    }
  },
  data() {
    return {
      innerRowInfo: {
        title: '',
        worker_id: '',
        number: '',
        type: '',
        salary: '',
        company_name: '',
        linkman: '',
        phone: '',
        position: ''
      },
      isDialog: true,
      rules: {
        title: [{ required: true, message: '请输入标题' }],
        worker_id: [{ required: true, message: '请选择工种' }],
        type: [{ required: true, message: '请选择工期类型' }],
        number: [{ required: true, message: '请输入电话' }],
        salary: [{ required: true, message: '请输入薪水' }],
        company_name: [{ required: true, message: '请输入公司名称' }],
        linkman: [{ required: true, message: '请输入联系人' }],
        phone: [{ required: true, message: '请输入电话' }],
        position: [{ required: true, message: '请输入职位' }]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    readPosition(location_info) {
      Object.assign(this.innerRowInfo, location_info)
      console.log('父组件', this.innerRowInfo)
    },
    submit(refName) {
      console.log(this.innerRowInfo)
      // 判断如果当前是添加信息的话，判断amap组件是否选择了地址
      if (!this.rowInfo.recruit_id) {
        if (!this.innerRowInfo.is_click) {
          this.$alert('请定位公司地址', '请输入地址', {
            confirmButtonText: '确定'
          })
          return
        }
      }
      // 否则就是修改当前信息，那么就不需要判断amap组件是否选择地址
      this.$refs[refName].validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('title', this.innerRowInfo.title)
        params.append('worker_id', this.innerRowInfo.worker_id)
        params.append('number', this.innerRowInfo.number)
        params.append('type', this.innerRowInfo.type)
        params.append('salary', this.innerRowInfo.salary)
        params.append('company_name', this.innerRowInfo.company_name)
        params.append('linkman', this.innerRowInfo.linkman)
        params.append('phone', this.innerRowInfo.phone)
        params.append('add_lon', this.innerRowInfo.add_lon)
        params.append('add_lat', this.innerRowInfo.add_lat)
        params.append('address', this.innerRowInfo.address)
        params.append('position', this.innerRowInfo.position)
        params.append('province_id', this.innerRowInfo.province_id)
        params.append('city_id', this.innerRowInfo.city_id)
        params.append('county_id', this.innerRowInfo.county_id)
        // ----------查看修改文章接口----------
        if (this.innerRowInfo.recruit_id) {
          params.append('recruit_id', this.innerRowInfo.recruit_id)
          this.$http.post('/company/recruit/edit', params).then(res => {
            if (res.code) {
              console.log(res)
              // this.$message({
              //   type: 'success',
              //   message: '修改成功!'
              // })
              this.$emit('close', '1')
            }
          })
        } else {
          // ----------添加新文章接口----------
          this.$http.post('/company/recruit/apply', params).then(res => {
            console.log(res)
            if (res.code) {
              this.$emit('close', '1')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  border: 1px dashed #888;
  width: 200px;
  height: 200px;
  line-height: 200px;
}
.el-form-item__error {
  padding-left: 110px;
}
.block {
  width: 70%;
  margin-left: 80px;
}
img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.el-form-item {
  margin-bottom: 20px;
  .el-input {
    width: 90%;
  }
}

.inner-input {
  display: inline-block;
  width: 20%;
}
i {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border: 1px dashed black;
  display: block;
}
.quillEditor {
  margin-bottom: 50px;
  margin-right: 10%;
  height: 400px;
}
.ship {
  margin-left: 30px;
}
.amap-box {
  width: 90%;
  height: 300px;
}
// .about-job{
//   border: 1px solid red;
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   > * {
//     width: 30%;
//     border: 1px solid green;
//     display: flex;
//     justify-content: flex-end;
//     white-space: nowrap;
//     align-items: center;
//     /deep/ input {
//       // border: 1px solid red;
//       width: 200px;
//     }
//   }
// }
</style>


