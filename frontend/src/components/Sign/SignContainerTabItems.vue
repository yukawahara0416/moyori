<template>
  <v-tabs-items v-model="childTabs">
    <v-tab-item value="signin">
      <sign-container-tab-items-sign-in />
    </v-tab-item>
    <v-tab-item value="signup">
      <sign-container-tab-items-sign-up />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import SignContainerTabItemsSignIn from '@/components/Sign/SignContainerTabItemsSignIn.vue'
import SignContainerTabItemsSignUp from '@/components/Sign/SignContainerTabItemsSignUp.vue'

export default {
  props: {
    tabs: String
  },

  components: {
    SignContainerTabItemsSignIn,
    SignContainerTabItemsSignUp
  },

  computed: {
    childTabs: {
      get() {
        return this.tabs
      },
      set(newValue) {
        this.$emit('changeTabs', newValue)
      }
    }
  }
}
</script>
