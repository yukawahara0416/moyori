<template>
  <v-col>
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
      v-show="headers !== null && id == this.currentUser.data.id"
    >
      <profile-actions-buttons-edit />

      <profile-actions-buttons-sign-out />

      <profile-actions-buttons-delete />
    </v-row>
  </v-col>
</template>

<script>
import ProfileActionsButtonsEdit from '@/components/Profile/ProfileActionsButtonsEdit.vue'
import ProfileActionsButtonsSignOut from '@/components/Profile/ProfileActionsButtonsSignOut.vue'
import ProfileActionsButtonsDelete from '@/components/Profile/ProfileActionsButtonsDelete.vue'

export default {
  props: {
    id: Number,
    user: Object,
    headers: Object,
    currentUser: Object
  },

  components: {
    ProfileActionsButtonsEdit,
    ProfileActionsButtonsSignOut,
    ProfileActionsButtonsDelete
  }
}
</script>
