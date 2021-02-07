<template>
  <v-card>
    <v-card-title class="headline">
      スポットを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn color="error darken-1" text>
        削除する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    spot: Object
  },

}
</script>
