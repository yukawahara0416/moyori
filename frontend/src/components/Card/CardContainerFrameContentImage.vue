<template>
  <v-col class="py-0" cols="5" md="12">
    <v-img
      class="white--text align-end"
      :class="{
        imgHeight_big: $vuetify.breakpoint.mdAndUp,
        imgHeight_small: $vuetify.breakpoint.smAndDown
      }"
      :src="
        spot.marker.image ? spot.marker.image : require('@/assets/noimage.png')
      "
    />
  </v-col>
</template>

<script>
export default {
  props: {
    spot: Object
  }
}
</script>

<style scoped>
.imgHeight_big {
  height: 150px !important;
}
.imgHeight_small {
  height: 100% !important;
}
</style>
