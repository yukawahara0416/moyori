<template>
  <v-tabs-items v-model="childTab">
    <v-tab-item value="signin">
      <sign-container-tab-items-sign-in />
    </v-tab-item>
    <v-tab-item value="signup">
      <sign-container-tab-items-sign-up />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SignContainerTabItemsSignIn from '@/components/Sign/SignContainerTabItemsSignIn.vue'
import SignContainerTabItemsSignUp from '@/components/Sign/SignContainerTabItemsSignUp.vue'

export default {
  components: {
    SignContainerTabItemsSignIn,
    SignContainerTabItemsSignUp
  },

  computed: {
    ...mapGetters(['signTab']),

    childTab: {
      get() {
        return this.signTab
      },
      set(tab) {
        this.changeSignTab(tab)
      }
    }
  },

  methods: {
    ...mapMutations(['changeSignTab'])
  }
}
</script>
