<template>
  <el-dialog :title="rowInfo.title?'编辑当前职位':'发布新职位'"
    :visible.sync="isDialog"
    :close-on-click-modal="false"
    @close="close"
    :center="true"
    width="50%">
    <el-form :rules="rules"
      :model="innerRowInfo"
      ref="rowInfo"
      label-position="right"
      label-width="12%">
      <el-form-item label="标题："
        prop="title">
        <el-input placeholder="请输入标题"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="工种："
        prop="worker_id">
        <el-select v-model="rules.region"
          placeholder="请选择工种">
          <el-option v-for="item in worker_class"
            :label="item.name"
            :value="item.worker_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所需人数"
        prop="number">
        <el-input placeholder="请输入所需人数"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="薪资"
        prop="salary">
        <el-input placeholder="请输入薪资"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="公司名称"
        prop="company_name">
        <el-input placeholder="请输入公司名称"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="联系人"
        prop="linkman">
        <el-input placeholder="请输入联系人"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="联系电话"
        prop="phone">
        <el-input placeholder="请输入联系电话"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="职位"
        prop="position">
        <el-input placeholder="请输入职位"
          v-model="innerRowInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="公司地址："
        prop="map_location">
        <Amap @getPosition="readPosition"></Amap>
      </el-form-item>
    </el-form>
    <span slot="footer"
      align="right"
      class="dialog-footer">
      <el-button @click="isDialog= false">取 消</el-button>
      <el-button type="primary"
        @click="submit('rowInfo')">确 定</el-button>
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
        salary: '',
        company_name: '',
        linkman: '',
        phone: '',
        position: '',
      },
      isDialog: true,
      rules: {
        title: [{ required: true, message: '请输入标题' }],
        worker_id: [{ required: true, message: '请选择工种' }],
        number: [{ required: true, message: '请输入电话' }],
        salary: [{ required: true, message: '请输入薪水' }],
        company_name: [{ required: true, message: '请输入公司名称' }],
        linkman: [{ required: true, message: '请输入联系人' }],
        phone: [{ required: true, message: '请输入电话' }],
        position: [{ required: true, message: '请输入职位' }],
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    readPosition(location_info) {
      Object.assign(this.innerRowInfo,location_info)
      console.log('父组件', this.innerRowInfo)
    },
    submit(refName) {
      this.$refs[refName].validate(valid => {
        if (!valid) return
        let params = new FormData()
        params.append('title', this.innerRowInfo.title)
        params.append('Content', this.innerRowInfo.content)
        // ----------查看修改文章接口----------
        if (this.innerRowInfo.id) {
          // params.append('id', this.innerRowInfo.id)
          // this.$http.post('/api/Goods/Modify', params).then(res => {
          //   if (res.success) {
          //     this.$message({
          //       type: 'success',
          //       message: '修改成功!'
          //     })
          //     this.$emit('close', '1')
          //   }
          // })
        } else {
          // ----------添加新文章接口----------
          // this.$http.post('/api/Goods/Create', params).then(res => {
          //   if (res.success) {
          //     this.$message({
          //       type: 'success',
          //       message: '添加成功!'
          //     })
          //     this.$emit('close', '1')
          //   }
          // })
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
</style>


