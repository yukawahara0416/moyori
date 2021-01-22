<template>
  <v-card flat outlined class="mb-2 py-2">
    <v-slide-group show-arrows>
      <v-slide-item v-if="images.length < 1">
        <v-card class="d-flex mx-2" flat outlined tile width="70px">
          <v-img
            aspect-ratio="1"
            referrerpolicy="strict-origin"
            :src="require('@/assets/noimage.png')"
          ></v-img>
        </v-card>
      </v-slide-item>

      <v-slide-item v-else v-for="(photo, id) in images" :key="id">
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
    images() {
      return [...this.postImage, ...this.commentImages, ...this.gmapImages]
    },

    commentImages() {
      let arry = []

      const filtered = this.spot.comments.filter(comment => {
        return comment.image !== null
      })
      for (let i = 0; i < filtered.length; i++) {
        arry.push(filtered[i].image)
      }

      return arry
    },

    gmapImages() {
      let arry = []

      if (!this.spot.data.image && !this.spot.data.photos) return arry

      if (this.spot.data.photos) {
        for (let i = 0; i < this.spot.data.photos.length; i++) {
          arry = [...arry, this.spot.data.photos[i].getUrl()]
        }
        return arry
      }

      if (this.spot.data.image) arry = [...arry, this.spot.data.image]

      return arry
    }
  }
}
</script>
