<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click.stop="placeDetail(spot)">
        <v-icon class="mx-2">mdi-information-outline</v-icon>
        詳細をみる
      </v-btn>
    </template>

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
