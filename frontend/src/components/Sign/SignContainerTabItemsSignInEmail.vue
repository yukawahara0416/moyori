<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        メールアドレスでログイン
      </v-toolbar>

      <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
        <v-card-text class="pb-0">
          <v-form>
            <ValidationProvider
              v-slot="{ errors, valid }"
              name="メールアドレス"
              rules="required|email|max:40"
            >
              <v-text-field
                label="メールアドレス"
                name="login"
                prepend-icon="mdi-email-outline"
                type="text"
                v-model="signInFormData.email"
                :clearable="true"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              name="パスワード"
              rules="required"
            >
              <v-text-field
                id="password"
                label="パスワード"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signInFormData.password"
                @keyup.enter="signInHandler()"
                :clearable="true"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="mb-3 px-10"
            color="primary"
            type="submit"
            @click.stop="signInHandler()"
            :disabled="invalid"
          >
            ログイン
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            class="mb-3"
            color="primary"
            type="submit"
            @click.stop="changeSignTab('signup')"
          >
            新規登録はこちら
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggingIn', 'signInFormData'])
  },

  methods: {
    ...mapMutations([
      'setHeaders',
      'setCurrentUser',
      'clearSignUpForm',
      'clearSignInFormData',
      'changeSignTab'
    ]),
    ...mapActions([
      'signIn',
      'clearSignFormData',
      'dialogOff',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    signInHandler: async function() {
      try {
        if (this.isLoggingIn == true) {
          throw new Error('すでにログイン中です')
        }

        const response = await this.signIn(this.signInFormData)

        const currentUser = response.data.data
        const headers = response.headers

        await this.setCurrentUser(currentUser)
        await this.setHeaders(headers)

        this.dialogOff('dialogSign')
        this.clearSignInFormData()
        this.clearSignUpForm()
        this.pushSnackbarSuccess({ message: 'ログインしました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
