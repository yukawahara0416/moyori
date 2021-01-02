<template>
  <v-btn
    height="40px"
    width="40px"
    x-small
    class="pa-0"
    @click="panToLocation()"
  >
    <v-icon class="py-2">mdi-crosshairs-gps</v-icon>
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
