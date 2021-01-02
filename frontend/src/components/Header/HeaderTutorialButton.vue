<template>
  <v-btn text @click.stop="dialogOn('dialogTutorial')">
    <v-icon class="mr-1">mdi-help-circle</v-icon>
    使い方
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['dialogOn'])
  }
}
</script>
