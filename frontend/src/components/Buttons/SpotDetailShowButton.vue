<template>
  <span>
    <v-btn
      :small="$vuetify.breakpoint.smAndDown"
      @click.stop="
        placeDetail(spot)
        openDialog()
      "
    >
      <v-icon class="mx-2">mdi-information-outline</v-icon>
      詳細をみる
    </v-btn>

    <v-dialog v-model="dialog" scrollable width="600">
      <spot-detail :spot="spot" @closeDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SpotDetail from '@/components/Spot/SpotDetail.vue'
import { placeDetail } from '@/plugins/maps.js'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotDetail
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapGetters(['map', 'profileTab'])
  },

  methods: {
    ...mapMutations({
      updateDataSpotsStore: 'spot/updateDataSpotsStore',
      updateDataUserStore: 'user/updateDataUserStore'
    }),
    ...mapActions(['pushSnackbarError']),

    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    placeDetail: async function(spot) {
      // GoogleMapsのスポットでなければ、placeDetailを実行しない
      if (!spot.isGmapSpot()) return

      // Profile画面であれば、placeDetailを実行しない
      const route = this.$route.name
      if (route === 'profile') return

      const map = this.map
      try {
        const data = await placeDetail(map, spot)
        this.updateDataSpotsStore({ spot, data })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
