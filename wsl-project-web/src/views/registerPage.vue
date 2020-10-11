<template>
<div class="newpassword-box">
  <mmy-componentsy></mmy-componentsy>
  <div class="newpassword-center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm repass-word">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="div-button-60">
          <el-button type="primary" @click="submission()" class="button-60">确认</el-button>
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
    mounted() {
      this.judgeAccount()
    },
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (!/^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/.test(value)) {
          callback(new Error('用户名应为4-16位字母,数字,汉字,下划线组成'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/^[0-9A-Za-z]{6,}$/.test(value)) {
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
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          password: '',
          checkPass: '',
        },
        rules: {
          userName: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 判断是否存在账户，如果存在账户，无法重新注册
      judgeAccount() {
        let judgeInformation = localStorage.getItem('loginInformation')
        if (judgeInformation) {
          this.$message({ message: '已存在账户，无法重新注册', type: 'warning' });
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 1000);
        }
      },
      // 注册确认按钮
      submission() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.createAccount()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 存储账户信息
      createAccount() {
        let loginInformation = { 'userName': this.ruleForm.userName, 'password': this.ruleForm.password }
        localStorage.setItem('loginInformation', JSON.stringify(loginInformation));
        this.$message({ message: '注册成功', type: 'success' });
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 1000);
      }
    }
  }
</script>
