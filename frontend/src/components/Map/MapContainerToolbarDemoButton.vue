<template>
  <v-btn class="mx-2 success" @click="demoSearch()">
    <v-icon class="mr-2">mdi-database</v-icon>
    デモ用エリアへ移動
  </v-btn>
</template>

<script>
export default {
  methods: {
    demoSearch() {
      this.$emit('demo-search')
    }
  }
}
</script>
