<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <div class="my-2">
        <v-btn
          color="primary"
          depressed
          large
          v-show="headers === null"
          v-on="on"
          @click="dialogOn"
        >
          はじめる
        </v-btn>
      </div>
    </template>

    <sign-container />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import SignContainer from '@/components/Sign/SignContainer.vue'

export default {
  components: {
    SignContainer
  },

  computed: {
    ...mapGetters(['headers', 'dialogSign']),

    dialog: {
      get() {
        return this.dialogSign
      },
      set() {
        this.$store.dispatch('dialogOff')
      }
    }
  },

  methods: {
    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
