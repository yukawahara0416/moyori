<template>
  <v-dialog v-model="dialog" width="600">
    <tutorial-dialog-carousel />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import TutorialDialogCarousel from '@/components/Tutorial/TutorialDialogCarousel.vue'

export default {
  components: {
    TutorialDialogCarousel
  },

  computed: {
    ...mapGetters(['tutorialState']),

    dialog: {
      get() {
        return this.tutorialState
      },
      set() {
        this.$store.commit('closeTutorial')
      }
    }
  }
}
</script>
