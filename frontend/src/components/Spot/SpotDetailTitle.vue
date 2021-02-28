<template>
  <v-card-title class="py-1">
    <span class="ml-2">{{ spot.data.name }}</span>
    <v-spacer />
    <like-button :spot="spot" />
  </v-card-title>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import LikeButton from '@/components/Buttons/LikeButton.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  components: {
    LikeButton
  }
}
</script>
