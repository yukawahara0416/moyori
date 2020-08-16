<template>
  <v-card-text class="text--primary nowrap">
    <p>{{ spot.marker.address }}</p>
  </v-card-text>
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
