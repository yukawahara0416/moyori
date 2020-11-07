<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        <v-toolbar-title>メールアドレスでログイン</v-toolbar-title>
      </v-toolbar>

      <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
        <v-card-text>
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
                @keyup.enter="signIn()"
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
            @click.stop="signIn()"
            :disabled="invalid"
          >
            ログイン
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signInFormData'])
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.signInFormData)
    }
  }
}
</script>
