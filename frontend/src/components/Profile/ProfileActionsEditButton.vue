<template>
  <span>
    <v-btn class="my-3" width="250" @click.stop="openDialog()">
      <v-icon left>mdi-pencil</v-icon>
      プロフィール編集
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <profile-actions-edit-dialog :user="user" @closeDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import ProfileActionsEditDialog from '@/components/Profile/ProfileActionsEditDialog.vue'

export default {
  props: {
    id: Number,
    user: Object
  },

  components: {
    ProfileActionsEditDialog
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
    }
  }
}
</script>
