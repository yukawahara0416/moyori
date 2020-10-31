<template>
  <span>
    <v-btn class="my-3" width="250" @click.stop="dialog = true">
      <v-icon left>mdi-delete</v-icon>
      アカウント削除
    </v-btn>

    <v-dialog v-model="dialog" width="400">
      <profile-actions-delete-dialog @closeDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import ProfileActionsDeleteDialog from '@/components/Profile/ProfileActionsDeleteDialog.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileActionsDeleteDialog
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
        message: 'アカウントの削除をキャンセルしました',
        color: 'success'
      })
    }
  }
}
</script>
