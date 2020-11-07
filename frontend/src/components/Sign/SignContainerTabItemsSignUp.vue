<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="flex-direction: column;">
      <sign-container-tab-items-sign-up-oauth />

      <sign-container-tab-items-sign-up-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import SignContainerTabItemsSignUpEmail from '@/components/Sign/SignContainerTabItemsSignUpEmail.vue'
import SignContainerTabItemsSignUpOauth from '@/components/Sign/SignContainerTabItemsSignUpOauth.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    SignContainerTabItemsSignUpEmail,
    SignContainerTabItemsSignUpOauth,
    Policy
  }
}
</script>
