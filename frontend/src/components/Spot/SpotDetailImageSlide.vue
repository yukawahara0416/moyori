<template>
  <v-card flat outlined class="mb-2 py-2">
    <v-slide-group show-arrows>
      <v-slide-item v-if="photos.length < 1">
        <v-card class="d-flex mx-2" flat outlined tile width="100px">
          <v-img
            aspect-ratio="1"
            :src="require('@/assets/noimage.png')"
          ></v-img>
        </v-card>
      </v-slide-item>

      <v-slide-item v-for="(photo, id) in photos" :key="id" v-else>
        <spot-detail-image-slide-dialog :photo="photo" />
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>

<script>
import SpotDetailImageSlideDialog from '@/components/Spot/SpotDetailImageSlideDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotDetailImageSlideDialog
  },

  computed: {
    photos() {
      let array = []
      if (this.spot.picture) {
        array = array.concat(this.spot.picture)
      }
      array = array.concat(this.imageUrls, this.photoUrls)
      return array
    },

    photoUrls() {
      let array = []
      if (this.spot.detail.photos) {
        for (let i = 0; i < this.spot.detail.photos.length; i++) {
          array.push(this.spot.detail.photos[i].getUrl())
        }
      }
      return array
    },

    imageUrls() {
      const filtered = this.spot.comments.filter(function(comment) {
        return comment.image !== null
      })
      let array = []
      for (let i = 0; i < filtered.length; i++) {
        array.push(filtered[i].image)
      }
      return array
    }
  }
}
</script>
