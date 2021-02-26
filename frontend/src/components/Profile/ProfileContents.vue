<template>
  <span>
    <profile-contents-tabs />

    <profile-contents-items :user="user" />
  </span>
</template>

<script>
import ProfileContentsTabs from '@/components/Profile/ProfileContentsTabs.vue'
import ProfileContentsItems from '@/components/Profile/ProfileContentsItems.vue'

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

  components: {
    ProfileContentsTabs,
    ProfileContentsItems
  }
}
</script>
