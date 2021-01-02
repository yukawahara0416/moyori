<template>
  <v-card-title class="py-1">
    <span class="ml-2">{{ spot.data.name }}</span>
    <v-spacer />
    <like-button :spot="spot" />
  </v-card-title>
</template>

<script>
import LikeButton from '@/components/Buttons/LikeButton.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    LikeButton
  }
}
</script>
