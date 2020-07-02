<template>
  <v-avatar height="150px" width="150px">
    <!-- <img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg" /> -->
    <!-- <img :src="image" /> -->
    <v-img
      :src="
        user.data
          ? require('@/assets/noimage.png')
          : require('@/assets/noimage.png')
      "
    />
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
