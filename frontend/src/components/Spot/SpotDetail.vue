<template>
  <v-card>
    <spot-detail-toolbar @closeDialog="closeDialog()" />

    <spot-detail-title :spot="spot" />

    <v-card-text>
      <spot-detail-image-slide :spot="spot" />

      <v-row>
        <v-col class="py-0 pr-1" :cols="cols">
          <spot-detail-wifi-panel :spot="spot" />
        </v-col>

        <v-col class="py-0 pl-1" :cols="cols">
          <spot-detail-power-panel :spot="spot" />
        </v-col>
      </v-row>

      <spot-detail-comment-panel :spot="spot" />

      <spot-detail-info-panel :spot="spot" @closeDialog="closeDialog()" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import SpotDetailToolbar from '@/components/Spot/SpotDetailToolbar.vue'
import SpotDetailTitle from '@/components/Spot/SpotDetailTitle.vue'
import SpotDetailImageSlide from '@/components/Spot/SpotDetailImageSlide.vue'
import SpotDetailInfoPanel from '@/components/Spot/SpotDetailInfoPanel.vue'
import SpotDetailWifiPanel from '@/components/Spot/SpotDetailWifiPanel.vue'
import SpotDetailPowerPanel from '@/components/Spot/SpotDetailPowerPanel.vue'
import SpotDetailCommentPanel from '@/components/Spot/SpotDetailCommentPanel.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  components: {
    SpotDetailToolbar,
    SpotDetailTitle,
    SpotDetailImageSlide,
    SpotDetailInfoPanel,
    SpotDetailWifiPanel,
    SpotDetailPowerPanel,
    SpotDetailCommentPanel
  },

  computed: {
    cols() {
      if (this.$vuetify.breakpoint.xsOnly) return 12
      return 6
    }
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
