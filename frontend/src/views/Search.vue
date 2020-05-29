<template>
  <div>
    <h1>this is Search</h1>
    <google-maps />
    <Card />
  </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps.vue'
import Card from '@/components/Card.vue'

export default {
  components: {
    GoogleMaps,
    Card
  }
}
</script>
