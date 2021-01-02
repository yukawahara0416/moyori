<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        メールアドレスで登録
      </v-toolbar>

      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-card-text class="pb-0">
          <v-form>
            <ValidationProvider
              v-slot="{ errors, valid }"
              name="名前"
              rules="required|max:40"
            >
              <v-text-field
                label="名前*"
                name="signin"
                prepend-icon="mdi-account-circle-outline"
                type="text"
                v-model="signUpForm.name"
                :clearable="true"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              name="メールアドレス"
              rules="required|email|max:100"
            >
              <v-text-field
                label="メールアドレス*"
                name="signin"
                prepend-icon="mdi-email-outline"
                type="text"
                v-model="signUpForm.email"
                :clearable="true"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors, valid }"
              name="パスワード"
              rules="required|alpha_num|max:128|min:6"
            >
              <v-text-field
                label="パスワード"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signUpForm.password"
                @keyup.enter="signUp()"
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
            @click.stop="signUpHanlder()"
            :disabled="invalid"
          >
            登録
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
            @click.stop="changeSignTab('signin')"
          >
            ログインはこちら
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
    ...mapGetters(['signUpForm'])
  },

  methods: {
    ...mapMutations([
      'setCurrentUser',
      'setHeaders',
      'clearSignInForm',
      'clearSignUpForm',
      'changeSignTab'
    ]),
    ...mapActions([
      'signUp',
      'dialogOff',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    signUpHanlder: async function() {
      try {
        const response = await this.signUp(this.signUpForm)
        const currentUser = response.data.data
        const headers = response.headers

        await this.setCurrentUser(currentUser)
        await this.setHeaders(headers)

        this.dialogOff('dialogSign')
        this.clearSignInForm()
        this.clearSignUpForm()
        this.pushSnackbarSuccess({
          message: 'アカウントを登録しました。MoYoRiへようこそ！'
        })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    }
  }
}
</script>
