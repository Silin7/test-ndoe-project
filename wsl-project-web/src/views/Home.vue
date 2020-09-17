<template>
  <div class="home">
      <el-button type="primary" @click="get_url">get_url</el-button>
      <el-button type="success" @click="post_url">post_url</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    get_url() {
      this.$router.push({ name: 'get_url' })
    },
    post_url() {
      this.$router.push({ name: 'post_url' })
    }
  }
}
</script>
