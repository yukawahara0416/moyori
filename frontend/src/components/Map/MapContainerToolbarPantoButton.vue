<template>
  <v-btn class="mx-2" data-test="btn1" @click="panToLocation">
    <v-icon>mdi-crosshairs-gps</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    panToLocation() {
      this.$emit('panto-location')
    }
  }
}
</script>
