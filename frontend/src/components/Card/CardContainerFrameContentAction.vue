<template>
  <v-card-actions>
    <like-button :spot="spot" :type="type" />
    <wifi-with-button :spot="spot" :type="type" />
    <wifi-without-button :spot="spot" :type="type" />
    <power-with-button :spot="spot" :type="type" />
    <power-without-button :spot="spot" :id="id" :type="type" />
    <!-- <comment-button :spot="spot" :id="id" :type="type" /> -->
    <!-- <show-button :spot="spot" :id="id" :type="type" /> -->
  </v-card-actions>
</template>

<script>
import LikeButton from '@/components/Buttons/LikeButton.vue'
import WifiWithButton from '@/components/Buttons/WifiWithButton.vue'
import WifiWithoutButton from '@/components/Buttons/WifiWithoutButton.vue'
import PowerWithButton from '@/components/Buttons/PowerWithButton.vue'
import PowerWithoutButton from '@/components/Buttons/PowerWithoutButton.vue'

export default {
  props: {
    spot: Object,
    id: Number,
    type: String
  },

  components: {
    LikeButton,
    WifiWithButton,
    WifiWithoutButton,
    PowerWithButton,
    PowerWithoutButton
  }
}
</script>
