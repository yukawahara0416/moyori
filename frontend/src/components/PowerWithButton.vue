<template>
  <div>
    <v-btn icon @click="powerWithHandler()">
      wifi
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
