<template>
  <v-card>
    <v-toolbar color="primary" dense flat>
      <v-toolbar-title class="white--text">スポット詳細</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="closeDialog">
        <v-icon class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-title>
      {{ spot.marker.name }}
    </v-card-title>

    <v-card-text>
      <spot-show-dialog-address :spot="spot" />
      <spot-show-dialog-phone :spot="spot" />
      <spot-show-dialog-website :spot="spot" />
      <spot-show-dialog-business-panel :spot="spot" />
      <spot-show-dialog-wifi-panel :spot="spot" />
      <spot-show-dialog-power-panel :spot="spot" />
      <spot-show-dialog-image-slide :spot="spot" />
      <spot-show-dialog-comment-panel :spot="spot" :type="type" />
    </v-card-text>

    <v-card-actions v-if="isOwnPosted">
      <v-spacer />
      <spot-edit-dialog :spot="spot" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotShowDialogAddress from '@/components/Spot/SpotShowDialogAddress.vue'
import SpotShowDialogPhone from '@/components/Spot/SpotShowDialogPhone.vue'
import SpotShowDialogWebsite from '@/components/Spot/SpotShowDialogWebsite.vue'
import SpotShowDialogBusinessPanel from '@/components/Spot/SpotShowDialogBusinessPanel.vue'
import SpotShowDialogWifiPanel from '@/components/Spot/SpotShowDialogWifiPanel.vue'
import SpotShowDialogPowerPanel from '@/components/Spot/SpotShowDialogPowerPanel.vue'
import SpotShowDialogImageSlide from '@/components/Spot/SpotShowDialogImageSlide.vue'
import SpotShowDialogCommentPanel from '@/components/Spot/SpotShowDialogCommentPanel.vue'
import SpotEditDialog from '@/components/Spot/SpotEditDialog.vue'

export default {
  props: {
    spot: Object,
    type: String,
    dialog: Boolean
  },

  components: {
    SpotShowDialogAddress,
    SpotShowDialogPhone,
    SpotShowDialogWebsite,
    SpotShowDialogBusinessPanel,
    SpotShowDialogWifiPanel,
    SpotShowDialogPowerPanel,
    SpotShowDialogImageSlide,
    SpotShowDialogCommentPanel,
    SpotEditDialog
  },

  computed: {
    ...mapGetters(['headers', 'currentUser']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    },

    isOwnPosted() {
      if (this.isLoggedIn) {
        if (this.spot.detail.formatted_address) {
          return false
        } else if (this.spot.data.user_id !== this.currentUser.data.id) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
