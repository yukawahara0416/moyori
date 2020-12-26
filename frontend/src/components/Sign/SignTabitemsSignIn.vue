<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="row-default">
      <sign-tabitems-signin-easy />

      <!-- <sign-tabitems-signin-oauth /> -->

      <sign-tabitems-signin-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import SignTabitemsSigninEasy from '@/components/Sign/SignTabitemsSigninEasy.vue'
// import SignTabitemsSigninOauth from '@/components/Sign/SignTabitemsSigninOauth.vue'
import SignTabitemsSigninEmail from '@/components/Sign/SignTabitemsSigninEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    SignTabitemsSigninEasy,
    // SignTabitemsSigninOauth,
    SignTabitemsSigninEmail,
    Policy
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
