<template>
  <v-slide-group class="pa-4" show-arrows>
    <v-slide-item v-for="(photo, id) in photos" :key="id">
      <spot-show-dialog-image-slide-dialog :photo="photo" />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import SpotShowDialogImageSlideDialog from '@/components/Spot/SpotShowDialogImageSlideDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotShowDialogImageSlideDialog
  },

  computed: {
    photos() {
      return this.spot.detail.photos
    }
  }
}
</script>

<style></style>
