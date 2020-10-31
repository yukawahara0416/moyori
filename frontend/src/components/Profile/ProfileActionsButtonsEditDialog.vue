<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      <v-toolbar-title>プロフィール編集</v-toolbar-title>
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
              name="profile-update"
              prepend-icon="mdi-account-circle-outline"
              type="text"
              v-model="user.data.name"
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
              name="profile-update"
              prepend-icon="mdi-email-outline"
              type="text"
              v-model="user.data.email"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="画像"
            rules="image"
          >
            <v-file-input
              chips
              counter
              label="プロフィール画像"
              name="picture"
              prepend-icon="mdi-camera"
              show-size
              v-model="avatar"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn class="mb-3 px-10" large @click.stop="cancelUpdateAccount()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          @click.stop="updateAccount()"
          :disabled="invalid"
        >
          プロフィールを編集する
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>

    <!-- <v-card-actions>
      <v-spacer />

      <v-btn color="green darken-1" text @click="closeDialog()">
        キャンセル
      </v-btn>

      <v-btn color="green darken-1" text @click="dialogOff()">
        OK
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    user: Object
  },

  data() {
    return {
      avatar: null
    }
  },

  computed: {
    ...mapGetters(['signUpFormData', 'currentUser'])
  },

  methods: {
    updateAccount() {
      this.$store.dispatch('updateAccount', {
        user: this.user,
        avatar: this.avatar
      })
      this.closeDialog()
    },

    cancelUpdateAccount() {
      this.closeDialog()
      this.$store.dispatch('pushSnackbar', {
        message: 'スポットの編集をキャンセルしました',
        color: 'success'
      })
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
