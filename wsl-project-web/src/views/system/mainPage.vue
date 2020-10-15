<template>
  <div style="height: 100%; box-sizing:border-box; padding: 0 30vw; background-color: #C0BEB5">
    <el-container>
      <!-- <el-header>：顶栏容器 -->
      <el-header class="main-header">
        <!-- 头部头像 -->
        <el-dropdown :show-timeout="0" placement="bottom">
          <div class="headRightBox">
            <span class="el-dropdown-link">
              <img class="txImg" src="~@/assets/images/tx.jpeg">
            </span>
            <span class="el-dropdown-Information">
              <span class="txName">{{userName}}</span>
              <span class="txAutograph">保持热爱奔赴山海，各自努力顶峰相见</span>
            </span>
          </div>
        </el-dropdown>
        <div class="diaryPage-circle"></div>
      </el-header>
      <!-- <el-main>：主要区域容器 -->
      <el-main class="main-container">
        <div class="block newDiary">
          <div class="xjDiary">
            <svg t="1588476762238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5915" width="32" height="32"><path d="M32 347.2h204.8v614.4H32zM32 80h204.8v235.2H32z" fill="#9DE8F7" p-id="5916"></path><path d="M0 48v944h268.8V48H0z m32 913.6V347.2h204.8v614.4H32z m204.8-646.4H32V80h204.8v235.2z" fill="#1A1718" p-id="5917"></path><path d="M368 347.2h204.8v614.4H368zM368 80h204.8v235.2H368z" fill="#FAD97F" p-id="5918"></path><path d="M336 48v944h268.8V48H336z m32 913.6V347.2h204.8v614.4H368z m204.8-646.4H368V80h204.8v235.2z" fill="#1A1718" p-id="5919"></path><path d="M931.2 297.6L910.4 64l-203.2 19.2 20.8 232zM988.8 940.8l-54.4-611.2-203.2 17.6L785.6 960z" fill="#F2385A" p-id="5920"></path><path d="M939.2 30.4L672 52.8l84.8 940.8L1024 971.2 939.2 30.4zM910.4 64l20.8 233.6-203.2 17.6-20.8-232L910.4 64z m24 265.6l54.4 611.2-203.2 19.2-54.4-612.8 203.2-17.6z" fill="#1A1718" p-id="5921"></path></svg>
            <span class="xjwz" v-if="!isNew" @click="isNew = !isNew">新建日记</span>
            <span class="xjwz" v-if="isNew" @click="isNew = !isNew">取消新建</span>
          </div>
          <el-date-picker
            v-if="isNew"
            class="xjDate"
            v-model="newDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="journal-content" v-if="isNew">
          <el-input
            style="opacity: 0.6;"
            type="textarea"
            :rows="10"
            maxlength="600"
            v-model="textarea"
            autosize>
          </el-input>
          <div class="seveDiary">
            <el-button type="danger" plain @click="seveDiary">保存</el-button>
          </div>
        </div>
        <div class="diaryList" v-if="!isNew">
          <div class="diaryListItem" v-for="(item, index) in dataList" :key="index" v-if="index < Nbars">
            <span class="listItemSpan1">{{item.key|formatDate}}</span>
            <span class="listItemSpan2">{{item.val}}</span>
          </div>
          <el-link type="warning" class="seeMore">查看更多</el-link>
        </div>
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
  import '@/stylesheets/system/diaryPage.scss'
  export default {
    mounted() {
      this.getDateList()
    },
    data() {
      return {
        Nbars: 6,
        isNew: false,
        userName: '',
        newDate: '',
        textarea: '',
        dataList: []
      }
    },
    filters: {
      formatDate(value) {
        if (value == null) {
          return ''
        } else {
          let date = new Date(Number(value))
          let y = date.getFullYear()// 年
          let MM = date.getMonth() + 1// 月
          MM = MM < 10 ? ('0' + MM) : MM
          let d = date.getDate()// 日
          d = d < 10 ? ('0' + d) : d
          let h = date.getHours()// 时
          h = h < 10 ? ('0' + h) : h
          let m = date.getMinutes()// 分
          m = m < 10 ? ('0' + m) : m
          let s = date.getSeconds()// 秒
          s = s < 10 ? ('0' + s) : s
          return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
        }
      }
    },
    methods: {
      // 从localStorage中获取数据列表
      getDateList() {
        // 获取长度
        var len = localStorage.length
        // 定义数据集
        var arr = new Array()
        for(var i = 0; i < len; i++) {
          // 获取key 索引从0开始
          var getKey = localStorage.key(i)
          // 获取key对应的值
          var getVal = localStorage.getItem(getKey)
          // 放进数组
          arr[i] = {
            'key': getKey,
            'val': getVal,
          }
        }
        arr.forEach(item => {
          if (/^\d{1,13}$/ .test(item.key)) {
            this.dataList.push(item)
          }
        })
      },
      // 保存日记
      seveDiary() {
        if (this.newDate === '' || this.newDate === null || this.newDate === undefined) {
          this.$message({
            message: '请选择日期',
            type: 'warning'
          })
          return false
        } else if (this.textarea === '' || this.textarea === null || this.textarea === undefined) {
          this.$message({
            message: '请填写日记内容',
            type: 'warning'
          })
          return false
        } else {
          let localStorageName = Date.parse(this.newDate).toString()
          let localStorageContent = this.textarea
          localStorage.setItem(localStorageName, localStorageContent)
          this.getDateList()
          this.isNew = false
        }
      },
      
    }
  }
</script>