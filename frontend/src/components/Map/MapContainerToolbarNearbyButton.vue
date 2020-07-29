<template>
  <v-btn class="mx-2" @click="nearbySearch">
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
