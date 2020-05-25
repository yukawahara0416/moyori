<template>
  <GmapCircle
    :center="currentCenter"
    :options="circleOptions"
    :radius="500"
    ref="circle"
  />
</template>

<script>
export default {
  props: {
    currentCenter: {
      type: Object,
      default: () => ({ lat: 35.68, lng: 139.76 }),
      required: false
    }
  },
  data() {
    return {
      circleOptions: {
        clickable: false,
        fillColor: '#FF0000',
        fillOpacity: 0.1,
        strokeColor: '#FF0000',
        strokeOpacity: 0.3,
        strokeWeight: 1
      }
    }
  }
}
</script>
