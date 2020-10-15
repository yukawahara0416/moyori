<template>
  <v-card>
    <v-card-title class="headline">
      アカウントを編集しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn color="green darken-1" text @click="closeDialog()">
        キャンセル
      </v-btn>

      <v-btn color="green darken-1" text @click="dialogOff()">
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$emit('onCloseDialog')
    }
  }
}
</script>
