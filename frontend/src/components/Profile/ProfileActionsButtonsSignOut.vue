<template>
  <v-btn class="my-3" @click="signOut" width="250">
    <v-icon left>mdi-logout</v-icon>
    ログアウト
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['signOut'])
  }
}
</script>
