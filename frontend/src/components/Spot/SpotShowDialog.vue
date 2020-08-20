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
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        class="mb-3 px-10"
        color="primary"
        large
        type="submit"
        v-if="
          currentUser && spot.data && spot.data.user_id == currentUser.data.id
        "
        @click="test(spot)"
      >
        スポットを編集する
      </v-btn>

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

export default {
  props: {
    spot: Object,
    dialog: Boolean
  },

  components: {
    SpotShowDialogAddress,
    SpotShowDialogPhone,
    SpotShowDialogWebsite,
    SpotShowDialogBusinessPanel,
    SpotShowDialogWifiPanel,
    SpotShowDialogPowerPanel,
    SpotShowDialogImageSlide
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    test() {
      console.log('testやで^^')
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
