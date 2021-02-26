<template>
  <v-avatar height="150px" width="150px">
    <v-img :src="avatar" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },

  computed: {
    avatar() {
      if (this.user.data.avatar) {
        return this.user.data.avatar
      } else {
        return require('@/assets/noimage.png')
      }
    }
  }
}
</script>
