<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="row-default">
      <!-- <sign-tabitems-sign-up-oauth /> -->

      <sign-tabitems-sign-up-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
// import SignTabitemsSignUpOauth from '@/components/Sign/SignTabitemsSignUpOauth.vue'
import SignTabitemsSignUpEmail from '@/components/Sign/SignTabitemsSignUpEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    // SignTabitemsSignUpOauth,
    SignTabitemsSignUpEmail,
    Policy
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
