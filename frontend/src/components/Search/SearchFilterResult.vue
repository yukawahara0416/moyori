<template>
  <v-card-subtitle>
    {{ spots.length }} 件中 {{ filteredSpots.length }} 件を表示
  </v-card-subtitle>
</template>

<script>
export default {
  props: {
    spots: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    filteredSpots: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    }
  }
}
</script>
