<template>
  <v-col class="text-center">
    <profile-actions-items-image :user="user" />

    <profile-actions-items-name :user="user" />
  </v-col>
</template>

<script>
import ProfileActionsItemsImage from '@/components/Profile/ProfileActionsItemsImage.vue'
import ProfileActionsItemsName from '@/components/Profile/ProfileActionsItemsName.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileActionsItemsImage,
    ProfileActionsItemsName
  }
}
</script>
