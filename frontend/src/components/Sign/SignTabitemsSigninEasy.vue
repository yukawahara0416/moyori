<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="success" dense flat>
        かんたんログイン
      </v-toolbar>
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn type="submit" color="success" @click.stop="signInAsTestUser()">
          テストユーザでログイン
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      testUser: {
        email: 'tester@example.com',
        password: 'password'
      }
    }
  },

  computed: {
    ...mapGetters(['isLoggingIn'])
  },

  methods: {
    ...mapMutations([
      'setHeaders',
      'setCurrentUser',
      'clearSignUpForm',
      'clearSignInForm'
    ]),
    ...mapActions([
      'signIn',
      'clearSignFormData',
      'dialogOff',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    signInAsTestUser: async function() {
      try {
        if (this.isLoggingIn == true) {
          throw new Error('すでにログイン中です')
        }

        const response = await this.signIn(this.testUser)

        const currentUser = response.data.data
        const headers = response.headers

        await this.setCurrentUser(currentUser)
        await this.setHeaders(headers)

        this.dialogOff('dialogSign')
        this.clearSignInForm()
        this.clearSignUpForm()
        this.pushSnackbarSuccess({ message: 'ログインしました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
