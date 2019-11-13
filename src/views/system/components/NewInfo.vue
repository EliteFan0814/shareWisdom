<template>
  <el-dialog title="新增参数"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :center="true"
    @close="close">
    <el-form label-position="left"
      label-width="100px"
      :rules="rules"
      :model="item"
      ref="item">
      <el-form-item label="所属组"
        prop="vargroup">
        <el-input class="inp"
          v-model="item.vargroup"></el-input>
      </el-form-item>
      <el-form-item label="变量类型"
        prop="vartype">
        <el-input class="inp"
          v-model="item.vartype"></el-input>
      </el-form-item>
      <el-form-item label="变量名称"
        prop="varname">
        <el-input class="inp"
          v-model="item.varname"></el-input>
      </el-form-item>
      <el-form-item label="变量值"
        prop="varvalue">
        <el-input class="inp"
          v-model="item.varvalue"></el-input>
      </el-form-item>
      <el-form-item label="参数说明"
        prop="varinfo">
        <el-input class="inp"
          v-model="item.varinfo"></el-input>
      </el-form-item>
      <el-form-item label="排序"
        prop="orderid">
        <el-input class="inp"
          v-model="item.orderid"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      item: {
        varname: '',
        varinfo: '',
        vargroup: '',
        vartype: '',
        varvalue: '',
        orderid: ''
      },
      dialogVisible: true,
      rules: {
        vargroup: [
          {
            required: true,
            message: '请输入所属组'
          }
        ],
        vartype: [
          {
            required: true,
            message: '请输入变量类型'
          }
        ],
        varname: [
          {
            required: true,
            message: '请输入变量名称'
          }
        ],
        varvalue: [
          {
            required: true,
            message: '请输入变量值'
          }
        ],
        varinfo: [
          {
            required: true,
            message: '请输入参数说明'
          }
        ],
        orderid: [
          {
            required: true,
            message: '请输入排序'
          }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.item.validate(valid => {
        if (!valid) return
        let params = new URLSearchParams()
        params.append('varname', this.item.varname)
        params.append('varinfo', this.item.varinfo)
        params.append('vargroup', this.item.vargroup)
        params.append('vartype', this.item.vartype)
        params.append('varvalue', this.item.varvalue)
        params.append('orderid', this.item.orderid)
        this.$http.post('/manage/web_config/add', params).then(res => {
          if (res.code == 1) {
            this.dialogVisible = false
          }
        })
      })
    }
  }
}
</script>

