<template>
  <div class="home">
    <el-form :model="dataForm" status-icon ref="dataForm" label-width="100px" class="demo-dataForm">
      <el-form-item label="用户名" prop="pass">
        <el-input type="tetx" v-model="dataForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="dataForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
        <el-button @click="resetForm('dataForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    data() {
      return {
        dataForm: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let req = {
              name: this.dataForm.name,
              password: this.dataForm.password
            }
            api.post_register(req, function (res) {
              if (res && res.data.code === 0) {
                alert('注册成功')
              } else {
                alert('注册失败')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>