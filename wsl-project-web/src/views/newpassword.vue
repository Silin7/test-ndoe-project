<template>
<div class="newpassword-box">
  <mmy-componentsy></mmy-componentsy>
  <div class="newpassword-center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm repass-word">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="userName" readonly></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="div-button-60">
          <el-button type="primary" @click="submission()" class="button-60">修改</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
  import mmyComponents from '../components/mmy/index.vue'
  export default {
    components: {
      'mmy-componentsy': mmyComponents
    },
    mounted () {
      sessionStorage.setItem("logonStatus", "0")
      this.getInformation()
    },
    data() {
      var validateoldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else if (value !== this.password) {
          callback(new Error('密码输入错误'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value === this.password) {
          callback(new Error('不能使用原密码'));
        } else if (!/^[0-9A-Za-z]{6,}$/ .test(value)) {
          callback(new Error('密码长度不能低于6位'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userName: '',
        password: '',
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        rules: {
          oldPass: [
            { validator: validateoldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 获取本地存储信息
      getInformation() {
        let loginInformation = localStorage.getItem('loginInformation')
        loginInformation = JSON.parse(loginInformation)
        if (!loginInformation || loginInformation === null || loginInformation === '') {
          alert('账户丢失，前往注册页面进行注册')
              this.$router.push({ name: 'registerPage' })

        } else {
          this.userName = loginInformation.userName
          this.password = loginInformation.password
        }
      },
      submission() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.changePass()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changePass() {
        let loginInformation = { 'userName': this.userName, 'password': this.ruleForm.newPass }
        localStorage.setItem('loginInformation', JSON.stringify(loginInformation));
        this.$message({ message: '修改成功', type: 'success' });
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 1000);
      }
    }
  }
</script>
