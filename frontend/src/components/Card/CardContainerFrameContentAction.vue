<template>
  <div>
    <v-card-actions class="actions-padding-bottom">
      <v-spacer />
      <like-button :spot="spot" />
      <v-spacer />
      <comment-index-show-button :spot="spot" />
      <v-spacer />
    </v-card-actions>

    <v-card-actions class="actions-padding-top actions-padding-bottom">
      <v-spacer />
      <span>WiFiのある／なし</span>
      <v-spacer />
      <wifi-with-button :spot="spot" />
      <v-spacer />
      <wifi-without-button :spot="spot" />
      <v-spacer />
    </v-card-actions>

    <v-card-actions class="actions-padding-top">
      <v-spacer />
      <span>電源のある／なし</span>
      <v-spacer />
      <power-with-button :spot="spot" />
      <v-spacer />
      <power-without-button :spot="spot" />
      <v-spacer />
    </v-card-actions>

    <v-card-actions>
      <v-spacer />
      <spot-detail-show-button :spot="spot" />
      <v-spacer />
    </v-card-actions>
  </div>
</template>

<script>
import LikeButton from '@/components/Card/Buttons/LikeButton.vue'
import CommentIndexShowButton from '@/components/Card/Buttons/CommentIndexShowButton.vue'
import WifiWithButton from '@/components/Card/Buttons/WifiWithButton.vue'
import WifiWithoutButton from '@/components/Card/Buttons/WifiWithoutButton.vue'
import PowerWithButton from '@/components/Card/Buttons/PowerWithButton.vue'
import PowerWithoutButton from '@/components/Card/Buttons/PowerWithoutButton.vue'
import SpotDetailShowButton from '@/components/Card/Buttons/SpotDetailShowButton.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    LikeButton,
    CommentIndexShowButton,
    WifiWithButton,
    WifiWithoutButton,
    PowerWithButton,
    PowerWithoutButton,
    SpotDetailShowButton
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
