<template>
  <v-list>
    <v-list-item>{{ currentUser.data.name }} さん</v-list-item>
    <header-avatar-list-mypage :currentUser="currentUser" />
    <header-avatar-list-signout />
  </v-list>
</template>

<script>
import HeaderAvatarListMypage from '@/components/Header/HeaderAvatarListMypage.vue'
import HeaderAvatarListSignout from '@/components/Header/HeaderAvatarListSignout.vue'

export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {
        return { data: { id: null, name: '' } }
      },
      required: true
    }
  },

  components: {
    HeaderAvatarListMypage,
    HeaderAvatarListSignout
  }
}
</script>
