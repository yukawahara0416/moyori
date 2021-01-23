<template>
  <v-btn
    text
    :small="$vuetify.breakpoint.smAndDown"
    @click.stop="dialogOn('dialogTutorial')"
  >
    <v-icon class="mr-1">mdi-help-circle</v-icon>
    <span v-if="$vuetify.breakpoint.smAndUp">使い方</span>
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
