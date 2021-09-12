<template>
  <div style="height: 100vh; box-sizing:border-box; padding: 0 30vw; background-color: #C0BEB5">
    <el-container>
      <el-header class="main-header">
        <div class="headRightBox">
          <img class="txImg" src="@/assets/images/babyT.jpg">
          <div class="el-dropdown-Information">
            <div class="txAutograph">
              <div class="txAutographInfo1">L丶</div>
              <div class="txAutographInfo2">保持热爱奔赴山海，各自努力顶峰相见</div>
            </div>
          </div>
        </div>
        <div class="diaryPage-circle">
        </div>
      </el-header>
      <el-main class="main-container">
        <div class="block newDiary">
          <div class="xjDiary">
            <svg t="1588476762238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5915" width="32" height="32"><path d="M32 347.2h204.8v614.4H32zM32 80h204.8v235.2H32z" fill="#9DE8F7" p-id="5916"></path><path d="M0 48v944h268.8V48H0z m32 913.6V347.2h204.8v614.4H32z m204.8-646.4H32V80h204.8v235.2z" fill="#1A1718" p-id="5917"></path><path d="M368 347.2h204.8v614.4H368zM368 80h204.8v235.2H368z" fill="#FAD97F" p-id="5918"></path><path d="M336 48v944h268.8V48H336z m32 913.6V347.2h204.8v614.4H368z m204.8-646.4H368V80h204.8v235.2z" fill="#1A1718" p-id="5919"></path><path d="M931.2 297.6L910.4 64l-203.2 19.2 20.8 232zM988.8 940.8l-54.4-611.2-203.2 17.6L785.6 960z" fill="#F2385A" p-id="5920"></path><path d="M939.2 30.4L672 52.8l84.8 940.8L1024 971.2 939.2 30.4zM910.4 64l20.8 233.6-203.2 17.6-20.8-232L910.4 64z m24 265.6l54.4 611.2-203.2 19.2-54.4-612.8 203.2-17.6z" fill="#1A1718" p-id="5921"></path></svg>
            <span class="xjwz" @click="dialogadd">新增学生</span>
          </div>
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="num" label="学号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small" style="color: #9bc1f3; letter-spacing: 2px;">编辑</el-button>
              <el-button @click="delData(scope.row.id)" type="text" size="small" style="color: #F56C6C; letter-spacing: 2px;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 装饰 -->
    <template name="decorate">
      <img src="@/assets/images/qp01.png" alt="" class="diaryPageqp01">
      <img src="@/assets/images/qp02.png" alt="" class="diaryPageqp02">
      <img src="@/assets/images/qp03.png" alt="" class="diaryPageqp03">
    </template>

    <el-dialog :title="type === '01' ? '新增' : '修改'" :visible.sync="dialogVisible" width="30%">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="学号" required>
          <el-input v-model="formLabelAlign.num"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="type === '01'" type="primary" @click="dialogClick">确 定</el-button>
        <el-button v-if="type === '02'" type="primary" @click="editqd">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/stylesheets/system/addpage.scss'
  export default {
    mounted() {
      if (!this.$cookies.get('pass')) {
        this.$router.push({ name: 'home' })
        this.$message.error('当前登录信息失效，请重新登录')
      } else {
        this.formLabelAlign.cid = this.$route.query.id
        this.getStlistList(this.$route.query.id)
      }
    },
    data() {
      return {
        type: '01',
        dialogVisible: false,
        tableData: [],
        studentId: '',
        formLabelAlign: {
          cid: '',
          num: '',
          name: '',
        }
      }
    },
    methods: {
      // 列表
      getStlistList(cid) {
        let data = {
          page: '1',
          limit: '100',
          cid: cid
        }
        let _this = this
        api.stlistList(data, function (res) {
          if (res && res.data.code === 0) {
            _this.tableData = res.data.data
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      },
      dialogadd() {
        this.type = '01'
        this.dialogVisible = true
      },
      // 新增确定
      dialogClick() {
        let _this = this
        if (!this.formLabelAlign.num) {
          _this.$message.error('请填写学号')
          return
        }
        if (!this.formLabelAlign.name) {
          _this.$message.error('请填写姓名')
          return
        }
        api.stlistAdd(this.formLabelAlign, function (res) {
          if (res && res.data.code === 0) {
            _this.$message.success('新增成功')
            _this.getStlistList()
            _this.formLabelAlign.num = ''
            _this.formLabelAlign.name = ''
            _this.dialogVisible = false
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      },
      // 修改
      edit(item) {
        this.type = '02'
        this.studentId = item.id
        this.formLabelAlign.num = item.num
        this.formLabelAlign.name = item.name
        this.dialogVisible = true
      },
      // 修改确定
      editqd() {
        let _this = this
        let data = {
          id: this.studentId,
          num: this.formLabelAlign.num,
          name: this.formLabelAlign.name
        }
        console.log(data)
        api.stlistModify(data, function (res) {
          if (res && res.data.code === 0) {
            _this.$message.success('修改成功!')
            _this.getStlistList()
            _this.formLabelAlign.num = ''
            _this.formLabelAlign.name = ''
            _this.dialogVisible = false
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      },
      // 删除
      delData(id) {
        let _this = this
        this.$confirm('您确定要删除这条数据吗?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.stlistCancel(id, function (res) {
            if (res && res.data.code === 0) {
              _this.$message.success('删除成功!')
            _this.getStlistList()
            } else {
              _this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
        });
      },
    }
  }
</script>