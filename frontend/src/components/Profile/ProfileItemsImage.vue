<template>
  <v-avatar height="150px" width="150px">
    <v-img :src="avatar" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: Object
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
