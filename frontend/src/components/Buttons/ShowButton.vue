<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click.stop="placeDetail(spot)">
        <v-icon class="mx-2">mdi-information-outline</v-icon>
        詳細
      </v-btn>
    </template>

    <spot-show-dialog
      :spot="spot"
      :dialog="dialog"
      @closeDialog="closeDialog"
    />
  </v-dialog>
</template>

<script>
import SpotShowDialog from '@/components/Spot/SpotShowDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotShowDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
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
