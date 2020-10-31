<template>
  <span>
    <v-btn class="my-3" width="250" @click.stop="dialog = true">
      <v-icon left>mdi-pencil</v-icon>
      プロフィール編集
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <profile-actions-buttons-edit-dialog
        :user="user"
        @closeDialog="closeDialog()"
      />
    </v-dialog>
  </span>
</template>

<script>
import ProfileActionsButtonsEditDialog from '@/components/Profile/ProfileActionsButtonsEditDialog.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileActionsButtonsEditDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    // dialogOn() {
    //   this.$store.dispatch('dialogOn', 'dialogProfileEdit')
    // },

    closeDialog() {
      this.dialog = false
      // this.$store.dispatch('pushSnackbar', {
      //   message: 'プロフィールの編集をキャンセルしました',
      //   color: 'success'
      // })
    }
  }
}
</script>
