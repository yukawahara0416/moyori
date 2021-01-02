<template>
  <v-app id="inspire">
    <Snackbar />
    <Header />
    <tutorial-dialog />

    <v-content>
      <v-progress-linear indeterminate color="primary" v-show="loading" />
      <v-container class="pa-0" fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Snackbar from '@/components/Utility/Snackbar.vue'
import Header from '@/components/Header/Header.vue'
import TutorialDialog from '@/components/Tutorial/TutorialDialog.vue'

export default {
  components: {
    Snackbar,
    Header,
    TutorialDialog
  },

  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:100,300,400,500,700,900&display=swap&subset=japanese');

#inspire {
  background: #cccccc;
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
