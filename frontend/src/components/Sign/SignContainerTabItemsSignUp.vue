<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="flex-direction: column;">
      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="primary" dense flat>
            <v-toolbar-title>SNSアカウントで登録</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-row
              align="center"
              justify="center"
              style="flex-direction: column;"
            >
              <v-btn
                class="my-3 white--text"
                @click.stop="signUp"
                color="#00acee"
                large
                type="submit"
              >
                <v-icon color="white" left>
                  mdi-twitter
                </v-icon>
                Twitterアカウントで新規登録
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="primary" dense flat>
            <v-toolbar-title>メールアドレスで登録</v-toolbar-title>
          </v-toolbar>

          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-card-text>
              <v-form>
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="名前"
                  rules="required"
                >
                  <v-text-field
                    label="名前*"
                    name="signin"
                    prepend-icon="mdi-account-circle-outline"
                    type="text"
                    v-model="signUpFormData.name"
                    :clearable="true"
                    :error-messages="errors"
                    :success="valid"
                  />
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="メールアドレス"
                  rules="required|email|max:40"
                >
                  <v-text-field
                    label="メールアドレス*"
                    name="signin"
                    prepend-icon="mdi-email-outline"
                    type="text"
                    v-model="signUpFormData.email"
                    :clearable="true"
                    :error-messages="errors"
                    :success="valid"
                  />
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="パスワード"
                  rules="required|alpha_num"
                >
                  <v-text-field
                    label="パスワード"
                    name="password"
                    prepend-icon="mdi-lock-outline"
                    v-model="signUpFormData.password"
                    type="password"
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
                large
                type="submit"
                @click.stop="signUp()"
                :disabled="invalid"
              >
                登録
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-col>

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Policy from '@/components/Sign/Policy.vue'

export default {
  components: {
    Policy
  },

  computed: {
    ...mapGetters(['signUpFormData'])
  },

  methods: {
    signUp() {
      this.$store.dispatch('signUp', this.signUpFormData)
    }
  }
}
</script>
