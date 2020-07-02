<template>
  <gmap-circle
    ref="circle"
    :center="center"
    :options="{
      clickable: false,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      strokeColor: '#FF0000',
      strokeOpacity: 0.3,
      strokeWeight: 1
    }"
    :radius="500"
  />
</template>

<script>
export default {
  props: {
    center: Object
  }
}
</script>
