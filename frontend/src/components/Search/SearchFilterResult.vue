<template>
  <v-card-subtitle>
    {{ spots.length }} 件中 {{ filteredSpots.length }} 件を表示
  </v-card-subtitle>
</template>

<script>
export default {
  props: {
    spots: Array,
    filteredSpots: Array
  }
}
</script>
