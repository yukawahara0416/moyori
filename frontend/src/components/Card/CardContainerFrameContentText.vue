<template>
  <v-card-text class="text--primary nowrap">
    <p>{{ spot.marker.address }}</p>

    <p>
      <a
        :href="
          'https://www.google.com/maps/dir/?api=1&destination=' +
            spot.marker.position.lat +
            ',' +
            spot.marker.position.lng
        "
        target="_brank"
      >
        Googleマップでナビ
      </a>
    </p>
  </v-card-text>
</template>

<script>
export default {
  props: {
    spot: Object
  }
}
</script>

<style scoped>
.nowrap p {
  white-space: nowrap;
  overflow: hidden;
}
</style>
