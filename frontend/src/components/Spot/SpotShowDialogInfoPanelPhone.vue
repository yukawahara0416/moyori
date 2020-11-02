<template>
  <p>
    電話番号：
    <a :href="'tel:' + tel">
      {{ tel }}
    </a>
  </p>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    tel() {
      if (this.spot.detail.formatted_phone_number) {
        return this.spot.detail.formatted_phone_number
      } else if (this.spot.marker.phone) {
        return this.spot.marker.phone
      } else {
        return null
      }
    }
  }
}
</script>
