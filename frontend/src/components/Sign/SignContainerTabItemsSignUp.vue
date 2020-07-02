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
                @click="signUp"
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

          <v-card-text>
            <v-form>
              <v-text-field
                label="名前"
                name="signin"
                prepend-icon="mdi-account-circle-outline"
                type="text"
                v-model="signUpFormData.name"
              />

              <v-text-field
                label="メールアドレス"
                name="signin"
                prepend-icon="mdi-email-outline"
                type="text"
                v-model="signUpFormData.email"
              />

              <v-text-field
                id="password"
                label="パスワード"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signUpFormData.password"
              />

              <v-text-field
                id="password_confirmation"
                label="パスワード（確認用）"
                name="password_confirmation"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signUpFormData.password_confirmation"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-3 px-10"
              @click="
                signUp()
                closeDialog()
              "
              color="primary"
              large
              type="submit"
            >
              登録
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>

      <policy />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Policy from '@/components/Policy.vue'

export default {
  components: {
    Policy
  },

  computed: {
    ...mapGetters(['signUpFormData', 'currentUser'])
  },

  methods: {
    signUp() {
      this.$store.dispatch('signUp', this.signUpFormData)
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
