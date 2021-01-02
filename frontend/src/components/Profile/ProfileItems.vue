<template>
  <v-col class="text-center">
    <profile-items-image :user="user" v-if="user.data !== undefined" />

    <profile-items-name :user="user" v-if="user.data !== undefined" />
  </v-col>
</template>

<script>
import ProfileItemsImage from '@/components/Profile/ProfileItemsImage.vue'
import ProfileItemsName from '@/components/Profile/ProfileItemsName.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileItemsImage,
    ProfileItemsName
  }
}
</script>
