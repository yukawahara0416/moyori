<template>
  <v-card-title class="nowrap">
    <p class="ma-0">{{ spot.data.name }}</p>
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
  text-overflow: ellipsis;
}
</style>
