<template>
  <v-btn class="mx-2" @click="nearbySearch()">
    <v-icon class="mr-2">mdi-magnify</v-icon>
    このエリアを検索
  </v-btn>
</template>

<script>
export default {
  methods: {
    nearbySearch() {
      this.$emit('nearby-search')
    }
  }
}
</script>
