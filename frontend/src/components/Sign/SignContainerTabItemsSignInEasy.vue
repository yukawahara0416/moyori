<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="success" dense flat>
        かんたんログイン
      </v-toolbar>
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn type="submit" color="success" @click.stop="signInAsTestUser()">
          <v-icon left>mdi-ninja</v-icon>
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
      'setCurrentUserAvatar',
      'clearSignUpFormData',
      'clearSignInFormData'
    ]),
    ...mapActions([
      'signIn',
      'getAvatar',
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

        let response = await this.signIn(this.testUser)
        const currentUser = response.data.data
        const headers = response.headers

        await this.setCurrentUser(currentUser)
        await this.setHeaders(headers)

        response = await this.getAvatar(currentUser.id)
        const avatar = response.data.data.avatar

        await this.setCurrentUserAvatar(avatar)

        this.dialogOff('dialogSign')
        this.clearSignInFormData()
        this.clearSignUpFormData()
        this.pushSnackbarSuccess({ message: 'ログインしました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
