<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="pa-0" fluid>
        <sign-in />
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
// import SignUp from '@/components/SignUp.vue'

export default {
  components: {
    SignIn
    // SignUp
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:100,300,400,500,700,900&display=swap&subset=japanese');

#inspire {
  background: #cccccc;
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
