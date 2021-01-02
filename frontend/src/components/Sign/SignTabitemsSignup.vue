<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="row-default">
      <!-- <sign-tabitems-signup-oauth /> -->

      <sign-tabitems-signup-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
// import SignTabitemsSignupOauth from '@/components/Sign/SignTabitemsSignupOauth.vue'
import SignTabitemsSignupEmail from '@/components/Sign/SignTabitemsSignupEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    // SignTabitemsSignupOauth,
    SignTabitemsSignupEmail,
    Policy
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
