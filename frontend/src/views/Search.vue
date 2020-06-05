<template>
  <div>
    <h1>this is Search</h1>
    <!-- <sign-in /> -->
    <sign-up />
    <google-maps />
    <Card />
  </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps.vue'
import Card from '@/components/Card.vue'
// import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  components: {
    GoogleMaps,
    Card,
    // SignIn,
    SignUp
  }
}
</script>
