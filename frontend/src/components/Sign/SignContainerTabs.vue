<template>
  <v-tabs fixed-tabs v-model="childTabs">
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
export default {
  props: {
    tabs: String
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
