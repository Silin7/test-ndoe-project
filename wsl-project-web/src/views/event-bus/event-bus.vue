<template>
  <div>
    <event-bus1></event-bus1>
    <event-bus2></event-bus2>
  </div>
</template>

<script>
import EventBus from '../../api/eventBus.js'
import eventBus1 from './event-bus1.vue'
import eventBus2 from './event-bus2.vue'
export default {
  components: {
    'event-bus1': eventBus1,
    'event-bus2': eventBus2,
  }
}
</script>
