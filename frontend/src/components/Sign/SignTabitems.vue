<template>
  <v-tabs-items v-model="childTab">
    <v-tab-item value="signin">
      <sign-tabitems-sign-in />
    </v-tab-item>
    <v-tab-item value="signup">
      <sign-tabitems-sign-up />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SignTabitemsSignIn from '@/components/Sign/SignTabitemsSignIn.vue'
import SignTabitemsSignUp from '@/components/Sign/SignTabitemsSignUp.vue'

export default {
  components: {
    SignTabitemsSignIn,
    SignTabitemsSignUp
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
