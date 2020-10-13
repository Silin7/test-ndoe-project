<template>
  <div style="height: 100vh; box-sizing:border-box; padding: 0 200px; background-color: #ccc">
    <el-container>
      <!-- <el-header>：顶栏容器 -->
      <el-header class="main-header">
        <!-- 头部左侧介绍 -->
        <div class="headLiftBox"></div>
        <!-- 头部右侧头像 -->
        <el-dropdown :show-timeout="0" placement="bottom">
          <div class="headRightBox">
            <span class="el-dropdown-link">
              <img class="txImg" src="~@/assets/头像/tx.jpeg">
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