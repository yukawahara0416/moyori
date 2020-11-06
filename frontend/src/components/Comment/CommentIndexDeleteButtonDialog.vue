<template>
  <v-card>
    <v-card-title class="headline">
      コメントを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn @click="closeDialog()" color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn
        @click="
          deleteComment()
          closeDialog()
        "
        color="green darken-1"
        text
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    comment: Object
  },

  computed: {
    ...mapGetters(['tab'])
  },

  methods: {
    deleteComment() {
      this.$store.dispatch('deleteComment', {
        spot: this.spot,
        comment: this.comment,
        active_tab: this.tab
      })
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style></style>
