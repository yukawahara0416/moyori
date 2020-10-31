<template>
  <v-avatar class="white--text headline" color="success" size="36">
    <img alt="" src="" v-if="currentUser.data.image" />
    <span class="white--text headline" v-else>
      {{ currentUser.data.name.slice(0, 1) }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: Object,
    currentUser: Object
  },

  computed: {
    avatar() {
      if (this.user.avatar) {
        return this.user.avatar
      } else {
        return require('@/assets/noimage.png')
      }
    }
  }
}
</script>

<style></style>
