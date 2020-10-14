<template>
  <v-card flat outlined class="mb-2 py-2">
    <v-slide-group show-arrows>
      <v-slide-item>
        <v-card class="d-flex mx-2" flat outlined tile width="100px">
          <v-img
            aspect-ratio="1"
            :src="require('@/assets/noimage.png')"
          ></v-img>
        </v-card>
      </v-slide-item>
      <v-slide-item v-for="(photo, id) in photos" :key="id">
        <spot-show-dialog-image-slide-dialog :photo="photo" />
      </v-slide-item>
    </v-slide-group>
  </v-card>
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
