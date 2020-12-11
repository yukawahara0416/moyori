<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="row-default">
      <!-- <sign-container-tab-items-sign-up-oauth /> -->

      <sign-container-tab-items-sign-up-email />

      <policy />
    </v-row>
  </v-container>
</template>

<script>
// import SignContainerTabItemsSignUpOauth from '@/components/Sign/SignContainerTabItemsSignUpOauth.vue'
import SignContainerTabItemsSignUpEmail from '@/components/Sign/SignContainerTabItemsSignUpEmail.vue'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    // SignContainerTabItemsSignUpOauth,
    SignContainerTabItemsSignUpEmail,
    Policy
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
