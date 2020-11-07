<template>
  <span>
    <div class="my-2">
      <v-btn color="primary" depressed large @click.stop="openDialog()">
        はじめる
      </v-btn>
    </div>

    <v-dialog v-model="dialog" width="600">
      <sign-container />
    </v-dialog>
  </span>
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
        this.$store.dispatch('dialogOff', 'dialogSign')
      }
    }
  },

  methods: {
    openDialog() {
      this.$store.dispatch('dialogOn', 'dialogSign')
    }
  }
}
</script>
