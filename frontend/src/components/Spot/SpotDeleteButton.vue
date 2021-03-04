<template>
  <span>
    <v-btn
      small
      class="mb-3"
      color="error"
      type="submit"
      text
      @click.stop="openDialog()"
    >
      <v-icon>mdi-eraser</v-icon>
      スポットを削除する
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <spot-delete-button-dialog
        :spot="spot"
        @closeDeleteDialog="closeDeleteDialog()"
        @closeDetailDialog="closeDetailDialog()"
      />
    </v-dialog>
  </span>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import SpotDeleteButtonDialog from '@/components/Spot/SpotDeleteButtonDialog.vue'

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
    SpotDeleteButtonDialog
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

    closeDeleteDialog() {
      this.dialog = false
    },

    closeDetailDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
