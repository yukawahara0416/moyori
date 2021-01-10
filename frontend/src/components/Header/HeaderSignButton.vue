<template>
  <span>
    <v-btn
      text
      :small="$vuetify.breakpoint.smAndDown"
      @click.stop="openDialog('signin')"
    >
      ログイン
    </v-btn>
    <v-btn text @click.stop="openDialog('signup')">
      新規登録
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <sign-container />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
        this.dialogOff('dialogSign')
      }
    }
  },

  methods: {
    ...mapMutations(['dialogOn', 'changeSignTab']),
    ...mapActions(['dialogOff']),

    openDialog(tab) {
      this.changeSignTab(tab)
      this.dialogOn('dialogSign')
    }
  }
}
</script>
