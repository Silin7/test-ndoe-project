<template>
<div class="newpassword-box">
  <mmy-componentsy></mmy-componentsy>
  <div class="newpassword-center">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm repass-word">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input type="password" v-model="ruleForm.newpassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="div-button-60">
          <el-button type="" @click="cancel" class="button-60">取 消 修 改</el-button>
          <el-button type="primary" @click="submission()" class="button-60">修 改 密 码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
  import api from '@/api/api'
  import mmyComponents from '@/components/mmy/index.vue'
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
        } else if (value !== this.ruleForm.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        name: '',
        ruleForm: {
          password: '',
          newpassword: '',
          checkPass: '',
        },
        rules: {
          password: [
            { validator: validateoldPass, trigger: 'blur' }
          ],
          newpassword: [
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
        let data = {
          name: this.name,
          password: this.ruleForm.password,
          newpassword: this.ruleForm.newpassword
        }
        api.changePassword(data, function (res) {
          if (res && res.data.code === 0) {
            _this.cancel()
            _this.$message.success(res.data.msg)
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      },
      // 取消修改
      cancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
.newpassword-box {
  height: 100vh;
  overflow: hidden;
}
.newpassword-center {
  position: absolute;
  top: 24%;
  left: 20%;
  height: 60vh;
  width: 50vw;
  border: 1px solid #cccccc;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  padding: auto 0;
}
.repass-word {
  width: 100%;
  margin: 0 auto;
  padding: 70px;
}
.div-button-60 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
}
.button-60 {
  width: 30%;
}
</style>
