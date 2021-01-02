<template>
  <v-card flat outlined class="mb-2">
    <v-card-text>
      <spot-detail-info-panel-address :spot="spot" />
      <spot-detail-info-panel-phone :spot="spot" />
      <spot-detail-info-panel-website :spot="spot" />
      <spot-detail-info-panel-business :spot="spot" />
    </v-card-text>

    <v-card-actions class="pt-0" v-if="isOwnPosted">
      <v-spacer />
      <spot-edit-dialog :spot="spot" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotDetailInfoPanelAddress from '@/components/Spot/SpotDetailInfoPanelAddress.vue'
import SpotDetailInfoPanelPhone from '@/components/Spot/SpotDetailInfoPanelPhone.vue'
import SpotDetailInfoPanelWebsite from '@/components/Spot/SpotDetailInfoPanelWebsite.vue'
import SpotDetailInfoPanelBusiness from '@/components/Spot/SpotDetailInfoPanelBusiness.vue'
import SpotEditDialog from '@/components/Spot/SpotEditDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotDetailInfoPanelAddress,
    SpotDetailInfoPanelPhone,
    SpotDetailInfoPanelWebsite,
    SpotDetailInfoPanelBusiness,
    SpotEditDialog
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggingIn']),

    isOwnPosted() {
      const spotOwner = this.spot.data.user_id
      const currentUser = this.currentUser.data.id

      if (!this.isLoggingIn) return false

      // GoogleMaps固有のスポットの場合は編集できません
      // GoogleMapsのスポットかどうかは、place_idの文字数で判断しています
      if (this.spot.data.place_id.length >= 11) return false

      return spotOwner === currentUser
    }
  }
}
</script>
