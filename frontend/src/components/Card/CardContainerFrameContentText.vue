<template>
  <v-card-text class="text--primary">
    <p>{{ spot.marker.name }}</p>
    <p>{{ spot.marker.address }}</p>
    <p>{{ spot.marker.place_id }}</p>
    <p v-show="isPosted" style="color: red;">posted</p>

    <p>
      <a
        :href="
          'https://www.google.com/maps/dir/?api=1&destination=' +
            spot.data.lat +
            ',' +
            spot.data.lng
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
  },

  computed: {
    isPosted() {
      return 'id' in this.spot.data
    }
  }
}
</script>
