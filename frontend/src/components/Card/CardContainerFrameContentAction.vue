<template>
  <div>
    <v-card-actions class="actions-padding-bottom">
      <v-spacer />
      <like-button :spot="spot" :type="type" />
      <v-spacer />
      <comment-button :spot="spot" :type="type" />
      <v-spacer />
    </v-card-actions>

    <v-card-actions class="actions-padding-top actions-padding-bottom">
      <v-spacer />
      <span>WiFiのある／なし</span>
      <v-spacer />
      <wifi-with-button :spot="spot" :type="type" />
      <v-spacer />
      <wifi-without-button :spot="spot" :type="type" />
      <v-spacer />
    </v-card-actions>

    <v-card-actions class="actions-padding-top">
      <v-spacer />
      <span>電源のある／なし</span>
      <v-spacer />
      <power-with-button :spot="spot" :type="type" />
      <v-spacer />
      <power-without-button :spot="spot" :type="type" />
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

<style scoped>
span {
  font-size: 0.8em;
}

.actions-padding-top {
  padding-top: 0px;
}

.actions-padding-bottom {
  padding-bottom: 0px;
}
</style>
