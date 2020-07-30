<template>
  <v-card>
    <v-card-title class="headline">
      アカウントを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn @click="dialogOff()" color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn
        @click="
          deleteAccount()
          dialogOff()
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
  methods: {
    ...mapActions(['deleteAccount', 'dialogOff'])
  }
}
</script>
