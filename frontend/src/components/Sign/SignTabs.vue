<template>
  <v-tabs fixed-tabs v-model="childTab">
    <v-tab href="#signin">
      <v-icon left>mdi-login</v-icon>
      ログイン
    </v-tab>
    <v-tab href="#signup">
      <v-icon left>mdi-account-plus</v-icon>
      新規登録
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
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
