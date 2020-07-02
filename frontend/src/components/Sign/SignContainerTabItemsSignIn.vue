<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="flex-direction: column;">
      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="success" dense flat>
            <v-toolbar-title>かんたんログイン</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col class="text-center">
                <v-btn
                  color="success"
                  @click="signInAsTestUser"
                  large
                  type="submit"
                >
                  <v-icon left>mdi-ninja</v-icon>
                  テストユーザでログイン
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="primary" dense flat>
            <v-toolbar-title>SNSアカウントでログイン</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-row
              align="center"
              justify="center"
              style="flex-direction: column;"
            >
              <v-btn
                class="my-3 white--text"
                @click="signIn"
                color="#00acee"
                large
                type="submit"
              >
                <v-icon color="white" left>
                  mdi-twitter
                </v-icon>
                Twitterアカウントでログイン
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="primary" dense flat>
            <v-toolbar-title>メールアドレスでログイン</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="メールアドレス"
                name="login"
                prepend-icon="mdi-email-outline"
                type="text"
                v-model="signInFormData.email"
              />

              <v-text-field
                id="password"
                label="パスワード"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signInFormData.password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-3 px-10"
              @click="signIn"
              color="primary"
              large
              type="submit"
            >
              ログイン
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

  data() {
    return {
      testUser: {
        email: 'tester@example.com',
        password: 'password'
      }
    }
  },

  computed: {
    ...mapGetters(['signInFormData', 'currentUser', 'headers'])
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.signInFormData)
    },
    signInAsTestUser() {
      this.$store.dispatch('signIn', this.testUser)
    }
  }
}
</script>
