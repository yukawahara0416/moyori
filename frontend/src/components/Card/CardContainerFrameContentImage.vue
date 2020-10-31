<template>
  <v-col class="py-0" cols="5" md="12">
    <v-img
      class="white--text align-end"
      :class="{
        imgHeight_big: $vuetify.breakpoint.mdAndUp,
        imgHeight_small: $vuetify.breakpoint.smAndDown
      }"
      :src="image"
    />
  </v-col>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    image() {
      if (this.spot.picture) {
        return this.spot.picture
      } else if (this.filterImages.length > 0) {
        return this.filterImages[0].image
      } else if (this.spot.marker.image) {
        return this.spot.marker.image
      } else {
        return require('@/assets/noimage.png')
      }
    },

    filterImages() {
      return this.spot.comments.filter(function(comment) {
        return comment.image !== null
      })
    }
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
