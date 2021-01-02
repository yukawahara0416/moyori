<template>
  <p class="mb-1">
    <strong>電話番号：</strong>
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
      return this.spot.data.phone
    }
  }
}
</script>
