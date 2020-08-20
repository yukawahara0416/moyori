<template>
  <p>
    ＵＲＬ：
    <a :href="spot.detail.website" target="_brank">
      {{ spot.detail.website }}
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
