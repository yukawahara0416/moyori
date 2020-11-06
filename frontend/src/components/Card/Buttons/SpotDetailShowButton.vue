<template>
  <span>
    <v-btn
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
import SpotDetail from '@/components/Spot/SpotDetail.vue'

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

  methods: {
    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    placeDetail(spot) {
      if (spot.marker.place_id.length > 10) {
        this.$root.$emit('placeDetailSearch', spot)
      }
    }
  }
}
</script>
