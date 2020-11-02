<template>
  <span>
    <profile-contents-tabs :tabs="tabs" @changeTabs="changeTabs" />
    <profile-contents-items
      :tabs="tabs"
      :user="user"
      @changeTabs="changeTabs"
    />
  </span>
</template>

<script>
import ProfileContentsTabs from '@/components/Profile/ProfileContentsTabs.vue'
import ProfileContentsItems from '@/components/Profile/ProfileContentsItems.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileContentsTabs,
    ProfileContentsItems
  },

  data() {
    return {
      tabs: null
    }
  },

  methods: {
    changeTabs(newValue) {
      this.tabs = newValue
    }
  }
}
</script>
