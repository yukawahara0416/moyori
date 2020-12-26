<template>
  <v-tabs-items v-model="childTab">
    <v-tab-item value="signin">
      <sign-tabitems-signin />
    </v-tab-item>
    <v-tab-item value="signup">
      <sign-tabitems-signup />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SignTabitemsSignin from '@/components/Sign/SignTabitemsSignin.vue'
import SignTabitemsSignup from '@/components/Sign/SignTabitemsSignup.vue'

export default {
  components: {
    SignTabitemsSignin,
    SignTabitemsSignup
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
