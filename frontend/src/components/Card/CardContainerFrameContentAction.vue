<template>
  <div>
    <v-card-actions>
      <v-spacer />

      <like-button :spot="spot" :type="type" />
      <wifi-with-button :spot="spot" :type="type" />
      <wifi-without-button :spot="spot" :type="type" />
      <power-with-button :spot="spot" :type="type" />
      <power-without-button :spot="spot" :type="type" />
      <comment-button :spot="spot" :type="type" />

      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <show-button :spot="spot" :type="type" />
      <v-spacer />
    </v-card-actions>
  </div>
</template>

<script>
import LikeButton from '@/components/Buttons/LikeButton.vue'
import WifiWithButton from '@/components/Buttons/WifiWithButton.vue'
import WifiWithoutButton from '@/components/Buttons/WifiWithoutButton.vue'
import PowerWithButton from '@/components/Buttons/PowerWithButton.vue'
import PowerWithoutButton from '@/components/Buttons/PowerWithoutButton.vue'
import CommentButton from '@/components/Buttons/CommentButton.vue'
import ShowButton from '@/components/Buttons/ShowButton.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    LikeButton,
    WifiWithButton,
    WifiWithoutButton,
    PowerWithButton,
    PowerWithoutButton,
    CommentButton,
    ShowButton
  }
}
</script>
