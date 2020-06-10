<template>
  <div>
    <v-btn icon @click="powerWithoutHandler()">
      wifinone
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    spot: Object,
    id: Number
  }
}
</script>

<style></style>
