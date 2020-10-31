<template>
  <v-col>
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
      v-show="headers !== null && id == this.currentUser.data.id"
    >
      <profile-actions-edit :user="user" />

      <profile-actions-sign-out />

      <profile-actions-delete :user="user" />
    </v-row>
  </v-col>
</template>

<script>
import ProfileActionsEdit from '@/components/Profile/ProfileActionsEdit.vue'
import ProfileActionsSignOut from '@/components/Profile/ProfileActionsSignOut.vue'
import ProfileActionsDelete from '@/components/Profile/ProfileActionsDelete.vue'

export default {
  props: {
    id: Number,
    user: Object,
    headers: Object,
    currentUser: Object
  },

  components: {
    ProfileActionsEdit,
    ProfileActionsSignOut,
    ProfileActionsDelete
  }
}
</script>
