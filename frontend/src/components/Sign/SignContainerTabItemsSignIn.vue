<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="row-default">
      <sign-tabitems-sign-in-easy />

      <!-- <sign-tabitems-sign-in-oauth /> -->

      <sign-tabitems-sign-in-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import SignTabitemsSignInEasy from '@/components/Sign/SignTabitemsSignInEasy.vue'
// import SignTabitemsSignInOauth from '@/components/Sign/SignTabitemsSignInOauth.vue'
import SignTabitemsSignInEmail from '@/components/Sign/SignTabitemsSignInEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    SignTabitemsSignInEasy,
    // SignTabitemsSignInOauth,
    SignTabitemsSignInEmail,
    Policy
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
