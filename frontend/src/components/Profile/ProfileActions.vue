<template>
  <v-col>
    <v-row
      align="center"
      justify="center"
      no-gutter
      class="profile-action-container"
      v-if="isLoggingIn && isOwnPage"
    >
      <profile-actions-edit-button :id="id" :user="user" />

      <profile-actions-sign-out-button />

      <profile-actions-delete-button :id="id" :user="user" />
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
    id: {
      type: Number,
      default: () => {
        return null
      },
      required: true
    },
    user: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    currentUser: {
      type: Object,
      default: () => {
        return { data: {} }
      },
      required: true
    }
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
    }
  }
}
</script>

<style scoped>
.profile-action-container {
  flex-direction: column;
}
</style>
