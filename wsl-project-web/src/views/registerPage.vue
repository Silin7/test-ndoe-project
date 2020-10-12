<template>
<div class="newpassword-box">
  <mmy-componentsy></mmy-componentsy>
  <div class="newpassword-center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm repass-word">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
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
  import api from '@/api/api'
  import mmyComponents from '../components/mmy/index.vue'
  export default {
    components: {
      'mmy-componentsy': mmyComponents
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
          name: '',
          password: '',
          checkPass: '',
        },
        rules: {
          name: [
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
        let _this = this
        let registerInformation = { 'name': this.ruleForm.name, 'password': this.ruleForm.password }
        api.post_register(registerInformation, function(res) {
          if (res.data.code === 0) {
            _this.$confirm('用户名确定后将无法更改，您确定要注册吗?', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              api.post_register_inster(registerInformation, function(res2) {
                if (res2.data.code === 0) {
                  _this.$message({ message: '注册成功', type: 'success' });
                  setTimeout(() => {
                    _this.$router.push({ name: 'home' })
                  }, 1000);
                }
              })
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '取消注册'
              });
            });
          } else {
            _this.$message({ message: res.data.msg, type: 'error' });
          }
        })
        
      }
    }
  }
</script>
