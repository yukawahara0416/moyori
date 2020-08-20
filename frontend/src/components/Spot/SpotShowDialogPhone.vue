<template>
  <p>
    電話番号：
    <a :href="'tel:' + spot.detail.formatted_phone_number">
      {{ spot.detail.formatted_phone_number }}
    </a>
  </p>
</template>

<script>
export default {
  props: {
    spot: Object
  }
}
</script>

<style></style>
