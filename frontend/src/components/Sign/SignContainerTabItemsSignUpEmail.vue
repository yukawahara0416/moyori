<template>
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
              rules="required|max:40"
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
              rules="required|email|max:100"
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
              rules="required|alpha_num|max:128|min:6"
            >
              <v-text-field
                label="パスワード"
                name="password"
                prepend-icon="mdi-lock-outline"
                type="password"
                v-model="signUpFormData.password"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
