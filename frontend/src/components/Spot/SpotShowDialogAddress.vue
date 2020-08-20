<template>
  <span>
    <p>住所： {{ address }}</p>
    <v-btn class="mb-4" :href="url" target="_brank">
      <v-icon class="mx-2">mdi-google</v-icon>
      Googleマップでナビ
    </v-btn>
  </span>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    address() {
      if (this.spot.detail.formatted_address) {
        return this.spot.detail.formatted_address
      } else {
        return this.spot.data.address
      }
    },

    url() {
      return (
        'https://www.google.com/maps/dir/?api=1&destination=' +
        this.spot.marker.position.lat +
        ',' +
        this.spot.marker.position.lng
      )
    }
  }
}
</script>

<style></style>
