<template>
  <p class="mb-1">
    <strong>住所：</strong>
    <a :href="url" target="_blank">{{ address }}</a>
  </p>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    address() {
      return this.spot.data.address
    },

    url() {
      return (
        'https://www.google.com/maps/dir/?api=1&destination=' +
        this.spot.data.position.lat +
        ',' +
        this.spot.data.position.lng
      )
    }
  }
}
</script>
