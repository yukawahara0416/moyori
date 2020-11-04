<template>
  <v-col>
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
      v-show="isLoggingIn && isOwnPage"
    >
      <profile-actions-edit :user="user" />

      <profile-actions-sign-out />

      <profile-actions-delete :user="user" />
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileActionsEdit from '@/components/Profile/ProfileActionsEdit.vue'
import ProfileActionsSignOut from '@/components/Profile/ProfileActionsSignOut.vue'
import ProfileActionsDelete from '@/components/Profile/ProfileActionsDelete.vue'

export default {
  props: {
    id: Number,
    user: Object,
    currentUser: Object
  },

  components: {
    ProfileActionsEdit,
    ProfileActionsSignOut,
    ProfileActionsDelete
  },

  computed: {
    ...mapGetters(['isLoggingIn']),

    isOwnPage() {
      return this.id == this.currentUser.data.id ? true : false
    }
  }
}
</script>
