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
          deleteComment({ spot, comment, type })
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
import { mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    comment: Object,
    type: String
  },

  methods: {
    ...mapActions(['deleteComment']),

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style></style>
