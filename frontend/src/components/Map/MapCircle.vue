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
    :radius="radius.value"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    center: Object
  },

  computed: {
    ...mapGetters({ radius: 'spot/radius' })
  }
}
</script>
