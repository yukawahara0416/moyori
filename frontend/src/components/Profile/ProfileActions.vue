<template>
  <v-col>
    <v-row
      align="center"
      justify="center"
      no-gutter
      class="profile-action-container"
      v-show="isLoggingIn && isOwnPage"
    >
      <profile-actions-edit-button v-show="!isTestUser" :user="user" />

      <profile-actions-sign-out-button />

      <profile-actions-delete-button :user="user" />
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileActionsEditButton from '@/components/Profile/ProfileActionsEditButton.vue'
import ProfileActionsSignOutButton from '@/components/Profile/ProfileActionsSignOutButton.vue'
import ProfileActionsDeleteButton from '@/components/Profile/ProfileActionsDeleteButton.vue'

export default {
  props: {
    id: Number,
    user: Object,
    currentUser: Object
  },

  components: {
    ProfileActionsEditButton,
    ProfileActionsSignOutButton,
    ProfileActionsDeleteButton
  },

  computed: {
    ...mapGetters(['isLoggingIn']),

    isOwnPage() {
      return this.id == this.currentUser.data.id ? true : false
    },

    isTestUser() {
      return this.id == 1 ? true : false
    }
  }
}
</script>

<style scoped>
.profile-action-container {
  flex-direction: column;
}
</style>
