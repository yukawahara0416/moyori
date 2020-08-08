<template>
  <v-card-title class="nowrap">
    <p>{{ spot.marker.name }}</p>
  </v-card-title>
</template>

<script>
export default {
  props: {
    spot: Object
  }
}
</script>

<style scoped>
.nowrap p {
  white-space: nowrap;
  overflow: hidden;
}
</style>
