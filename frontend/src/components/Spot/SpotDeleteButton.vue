<template>
  <span>
    <v-btn small class="mb-3" color="error" type="submit" text>
      <v-icon>mdi-eraser</v-icon>
      スポットを削除する
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <spot-delete-button-dialog :spot="spot" />
    </v-dialog>
  </span>
</template>

<script>
import SpotDeleteButtonDialog from '@/components/Spot/SpotDeleteButtonDialog.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotDeleteButtonDialog
  },
}
</script>
