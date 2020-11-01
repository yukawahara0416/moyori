<template>
  <v-card>
    <v-toolbar color="primary" dense flat>
      <v-toolbar-title class="white--text">スポット詳細</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="closeDialog()">
        <v-icon class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-title>
      {{ spot.marker.name }}
    </v-card-title>

    <v-card-text>
      <spot-show-dialog-info-panel :spot="spot" />
      <spot-show-dialog-image-slide :spot="spot" />
      <spot-show-dialog-wifi-panel :spot="spot" />
      <spot-show-dialog-power-panel :spot="spot" />
      <spot-show-dialog-comment-panel :spot="spot" :type="type" />
    </v-card-text>
  </v-card>
</template>

<script>
import SpotShowDialogInfoPanel from '@/components/Spot/SpotShowDialogInfoPanel.vue'
import SpotShowDialogWifiPanel from '@/components/Spot/SpotShowDialogWifiPanel.vue'
import SpotShowDialogPowerPanel from '@/components/Spot/SpotShowDialogPowerPanel.vue'
import SpotShowDialogImageSlide from '@/components/Spot/SpotShowDialogImageSlide.vue'
import SpotShowDialogCommentPanel from '@/components/Spot/SpotShowDialogCommentPanel.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    SpotShowDialogInfoPanel,
    SpotShowDialogWifiPanel,
    SpotShowDialogPowerPanel,
    SpotShowDialogImageSlide,
    SpotShowDialogCommentPanel
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
