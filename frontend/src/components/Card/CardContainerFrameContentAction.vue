<template>
  <v-card-actions>
    <like-button :spot="spot" :id="id" :type="type" />
    <!-- <wifi-with-button :spot="s" :id="id" /> -->
    <!-- <wifi-without-button :spot="s" :id="id" /> -->
    <!-- <power-with-button :spot="s" :id="id" /> -->
    <!-- <power-without-button :spot="s" :id="id" /> -->
    <!-- <comment-button :spot="s" :id="id" /> -->
    <!-- <show-button :spot="s" :id="id" /> -->
  </v-card-actions>
</template>

<script>
import LikeButton from '@/components/LikeButton.vue'

export default {
  props: {
    spot: Object,
    id: Number,
    type: String
  },

  components: {
    LikeButton
  }
}
</script>
