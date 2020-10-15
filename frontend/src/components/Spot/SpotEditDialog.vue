<template>
  <span>
    <v-btn color="primary" type="submit" text @click.stop="dialog = true">
      <v-icon>mdi-pencil</v-icon>
      スポットを編集する
    </v-btn>

    <v-dialog persistent v-model="dialog" width="600">
      <spot-edit-dialog-form :spot="spot" @onCloseDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import SpotEditDialogForm from '@/components/Spot/SpotEditDialogForm.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotEditDialogForm
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    closeDialog() {
      this.dialog = false
      this.$store.dispatch('pushSnackbar', {
        message: 'スポットの編集をキャンセルしました',
        color: 'success'
      })
    }
  }
}
</script>
