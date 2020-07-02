<template>
  <v-col cols="11" style="background-color: white; border-radius: 4px;">
    <profile-contents-tabs :tabs="tabs" @changeTabs="changeTabs" />
    <profile-contents-tab-items
      :tabs="tabs"
      :user="user"
      @changeTabs="changeTabs"
    />
  </v-col>
</template>

<script>
import ProfileContentsTabs from '@/components/Profile/ProfileContentsTabs.vue'
import ProfileContentsTabItems from '@/components/Profile/ProfileContentsTabItems.vue'

export default {
  props: {
    user: Object
  },

  components: {
    ProfileContentsTabs,
    ProfileContentsTabItems
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
