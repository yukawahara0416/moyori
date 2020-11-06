<template>
  <p>
    ＵＲＬ：
    <a :href="url">
      {{ url }}
    </a>
  </p>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    url() {
      if (this.spot.detail.website) {
        return this.spot.detail.website
      } else if (this.spot.data.url) {
        return this.spot.data.url
      } else {
        return null
      }
    }
  }
}
</script>

<style></style>
