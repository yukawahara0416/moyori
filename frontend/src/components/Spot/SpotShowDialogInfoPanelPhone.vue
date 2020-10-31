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
      } else if (this.spot.data.phone) {
        return this.spot.data.phone
      } else {
        return null
      }
    }
  }
}
</script>
