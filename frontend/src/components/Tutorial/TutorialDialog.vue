<template>
  <v-dialog v-model="dialog" width="600">
    <tutorial-dialog-carousel />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TutorialDialogCarousel from '@/components/Tutorial/TutorialDialogCarousel.vue'

export default {
  components: {
    TutorialDialogCarousel
  },

  computed: {
    ...mapGetters(['dialogTutorial']),

    dialog: {
      get() {
        return this.dialogTutorial
      },
      set() {
        this.dialogOff('dialogTutorial')
      }
    }
  },

  methods: {
    ...mapActions(['dialogOff'])
  }
}
</script>
