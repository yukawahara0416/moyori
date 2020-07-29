<template>
  <v-list-item @click="signOut">
    <v-list-item-avatar>
      <v-icon btn>mdi-logout</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>ログアウト</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style></style>
