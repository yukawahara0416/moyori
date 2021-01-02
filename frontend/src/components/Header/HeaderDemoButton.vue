<template>
  <v-btn small class="mx-5 success" @click="demoSearch()">
    <v-icon class="mr-2">mdi-database</v-icon>
    デモ：サンプルデータが豊富なエリアへ移動
  </v-btn>
</template>

<script>
export default {
  methods: {
    demoSearch() {
      this.$root.$emit('demoSearch')
    }
  }
}
</script>
