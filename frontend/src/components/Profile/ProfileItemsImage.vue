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
      if (this.user.data) {
        return this.user.data.avatar
      } else {
        return require('@/assets/noimage.png')
      }
    }
  }
}
</script>
