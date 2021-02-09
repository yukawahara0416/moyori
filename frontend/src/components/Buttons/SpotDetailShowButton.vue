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
      updateSpotSearch: 'spot/updateSpot',
      updateSpotProfile: 'user/updateSpot'
    }),
    ...mapActions(['pushSnackbarError']),

    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    placeDetail: async function(spot) {
      // ユーザが作成したスポットの場合、placeDetailを実行しない
      if (!spot.isGmapSpot()) return

      const place_id = spot.data.place_id

      try {
        const updated = await placeDetail({ map: this.map, place_id })

        this.$route.name === 'profile'
          ? this.updateSpotProfile({ place_id, updated, tab: this.profileTab })
          : this.updateSpotSearch({ place_id, updated })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
