<template>
  <div class="bs_bx page_box">
    <el-container>
      <!-- <el-header>：顶栏容器 -->
      <el-header class="main-header">
        <!-- 头部左侧介绍 -->
        <div class="headLiftBox"></div>
        <!-- 头部右侧头像 -->
        <el-dropdown :show-timeout="0" placement="bottom">
          <div class="headRightBox">
            <span class="el-dropdown-link">
              <img class="txImg" src="~@/assets/images/tx.jpeg">
            </span>
            <span>{{userName}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changePass">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- <el-main>：主要区域容器 -->
      <el-main class="main-container">
          11111111
      </el-main>
      <!-- <el-footer>：底栏容器 -->
      <el-footer class="main-footer">Footer</el-footer>
    </el-container>
    <!-- 装饰 -->
    <template name="decorate">
      <img src="@/assets/images/qp01.png" alt="" class="diaryPageqp01">
      <img src="@/assets/images/qp02.png" alt="" class="diaryPageqp02">
      <img src="@/assets/images/qp03.png" alt="" class="diaryPageqp03">
    </template>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.getUserName()
    },
    data() {
      return {
        userName: '',
      }
    },
    methods: {
      // 获取头像用户名
      getUserName() {
        this.userName = JSON.parse(localStorage.getItem('loginInformation')).userName
      },
      // 修改密码
      changePass() {
        this.$router.push({'name': 'newpassword'})
      },
      // 退出
      signOut() {
        this.$router.push({'name': 'home'})
      },
      game2048() {
        this.$router.push({'name': 'game2048'})
      }
    }
  };
</script>

<style>
  .page_box {
    height: 100%;
    box-sizing:border-box;
    padding: 0 20vw;
    background-color: #C0BEB5;
  }
  .diaryPageqp01 {
    position: absolute;
    top: 10%;
    left: 80px;
  }
  .diaryPageqp02 {
    position: absolute;
    top: 30%;
    right: 0px;
  }
  .diaryPageqp03 {
    position: absolute; 
    top: 60%;
    left: 20px;
  }
</style>
