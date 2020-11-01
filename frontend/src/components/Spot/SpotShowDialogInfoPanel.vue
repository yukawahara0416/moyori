<template>
  <v-card flat outlined class="mb-2">
    <v-card-text>
      <spot-show-dialog-info-panel-address :spot="spot" />
      <spot-show-dialog-info-panel-phone :spot="spot" />
      <spot-show-dialog-info-panel-website :spot="spot" />
      <spot-show-dialog-info-panel-business :spot="spot" />
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
import SpotShowDialogInfoPanelAddress from '@/components/Spot/SpotShowDialogInfoPanelAddress.vue'
import SpotShowDialogInfoPanelPhone from '@/components/Spot/SpotShowDialogInfoPanelPhone.vue'
import SpotShowDialogInfoPanelWebsite from '@/components/Spot/SpotShowDialogInfoPanelWebsite.vue'
import SpotShowDialogInfoPanelBusiness from '@/components/Spot/SpotShowDialogInfoPanelBusiness.vue'
import SpotEditDialog from '@/components/Spot/SpotEditDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotShowDialogInfoPanelAddress,
    SpotShowDialogInfoPanelPhone,
    SpotShowDialogInfoPanelWebsite,
    SpotShowDialogInfoPanelBusiness,
    SpotEditDialog
  },

  computed: {
    ...mapGetters(['headers', 'currentUser']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    },

    isOwnPosted() {
      if (this.isLoggedIn) {
        if (this.spot.marker.place_id.length >= 11) {
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
  }
}
</script>

<style></style>
