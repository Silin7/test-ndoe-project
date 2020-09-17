<template>
  <div>
    <h1>{{data}}</h1>
    <h2>来自另一个组件的参数：{{fromOther}}</h2>
  </div>
</template>

<script>
import EventBus from '../../api/eventBus.js'
export default {
  mounted() {
    EventBus.$on("EventBus",this.eventMethode)
  },
  data() {
    return {
      data: false,
      fromOther: ''
    }
  },
  methods:{
    eventMethode(val) {
      this.data = !this.data
      if (val) {
        this.fromOther = val
      }
    }
  }
}
</script>
