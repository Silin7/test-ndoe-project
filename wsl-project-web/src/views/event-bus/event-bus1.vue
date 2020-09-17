
<template>
  <div>
    <button @click="clickme">组件1</button>
  </div>
</template>

<script>
import EventBus from '../../api/eventBus.js'
export default {
  methods:{
    clickme() {
      EventBus.$emit("EventBus",100)
    }
  }
}
</script>
