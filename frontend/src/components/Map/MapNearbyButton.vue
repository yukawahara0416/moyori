<template>
  <v-btn small class="mx-2" color="primary" @click="nearbySearch()">
    <v-icon class="mr-2">mdi-magnify</v-icon>
    このエリアで再検索
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
