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
      <spot-detail-info-panel :spot="spot" />
      <spot-detail-image-slide :spot="spot" />
      <spot-detail-wifi-panel :spot="spot" />
      <spot-detail-power-panel :spot="spot" />
      <spot-detail-comment-panel :spot="spot" />
    </v-card-text>
  </v-card>
</template>

<script>
import SpotDetailInfoPanel from '@/components/Spot/SpotDetailInfoPanel.vue'
import SpotDetailWifiPanel from '@/components/Spot/SpotDetailWifiPanel.vue'
import SpotDetailPowerPanel from '@/components/Spot/SpotDetailPowerPanel.vue'
import SpotDetailImageSlide from '@/components/Spot/SpotDetailImageSlide.vue'
import SpotDetailCommentPanel from '@/components/Spot/SpotDetailCommentPanel.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotDetailInfoPanel,
    SpotDetailWifiPanel,
    SpotDetailPowerPanel,
    SpotDetailImageSlide,
    SpotDetailCommentPanel
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
