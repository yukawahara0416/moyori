<template>
  <v-img
    referrerpolicy="strict-origin"
    class="img-container white--text align-end"
    :class="{
      imgHeight_big: $vuetify.breakpoint.mdAndUp,
      imgHeight_small: $vuetify.breakpoint.smAndDown
    }"
    :src="photo"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="success lighten-5" />
      </v-row>
    </template>

    <span class="buttons">
      <like-button :spot="spot" />
      <comment-button :spot="spot" />
    </span>
  </v-img>
</template>

<script>
import LikeButton from '@/components/Buttons/LikeButton.vue'
import CommentButton from '@/components/Buttons/CommentButton.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    LikeButton,
    CommentButton
  },

  computed: {
    photo() {
      if (this.spot.data.photo_url) return this.spot.data.photo_url
      if (this.spot.data.photo_reference) return this.spot.getPhotoUrl()
      if (this.spot.data.picture) return this.spot.data.picture
      if (this.filterImages.length > 0) return this.filterImages[0].image
      return require('@/assets/noimage.png')
    },

    filterImages() {
      return this.spot.comments.filter(comment => {
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
  height: 211px !important;
}
.img-container {
  position: relative;
}
.buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
