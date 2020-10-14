<template>
<div class="newpassword-box">
  <mmy-componentsy></mmy-componentsy>
  <div class="newpassword-center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm repass-word">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="name"></el-input>
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
  import api from '@/api/api'
  import mmyComponents from '../components/mmy/index.vue'
  export default {
    components: {
      'mmy-componentsy': mmyComponents
    },
    mounted () {
    },
    data() {
      var validateoldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }else if (!/^[0-9A-Za-z]{6,}$/ .test(value)) {
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
        name: '',
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
      // 修改按钮
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
        let _this = this
        let data = { 'name': this.name, 'password': this.ruleForm.oldPass, 'newPassword': this.ruleForm.newPass, 'state': 1 }
        api.post_register(data, function(res) {
          if(res && res.data.code === 0) {
            let data2 = {
              'id': res.data.data.id,
              'newPass': _this.ruleForm.newPass,
            }
            api.post_register_change(data2, function(res2) {
              if (res2 && res2.data.code === 0) {
                console.log(res)
                _this.$message.success('操作成功');
                setInterval(() => {
                  _this.$router.push({'name': 'home'})
                },1000)
              } else {
                _this.$message.error(res2.data.msg)
              }
            })
          } else {
            _this.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>
