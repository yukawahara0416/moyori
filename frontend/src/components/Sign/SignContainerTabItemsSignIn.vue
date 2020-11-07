<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="flex-direction: column;">
      <sign-container-tab-items-sign-in-easy />

      <sign-container-tab-items-sign-in-oauth />

      <sign-container-tab-items-sign-in-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import SignContainerTabItemsSignInEasy from '@/components/Sign/SignContainerTabItemsSignInEasy.vue'
import SignContainerTabItemsSignInOauth from '@/components/Sign/SignContainerTabItemsSignInOauth.vue'
import SignContainerTabItemsSignInEmail from '@/components/Sign/SignContainerTabItemsSignInEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    SignContainerTabItemsSignInEasy,
    SignContainerTabItemsSignInOauth,
    SignContainerTabItemsSignInEmail,
    Policy
  }
}
</script>
