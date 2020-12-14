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
              v-model="name"
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
              v-model="email"
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
              v-model="avatar_slot"
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
          @click.stop="updateAccountHandler()"
          :disabled="invalid"
        >
          プロフィールを編集する
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    user: Object
  },

  data() {
    return {
      name: this.user.data.name,
      email: this.user.data.email,
      avatar: this.user.avatar,
      avatar_slot: null
    }
  },

  computed: {
    ...mapGetters(['headers']),

    formData() {
      const formData = new FormData()
      formData.append('[name]', this.name)
      formData.append('[email]', this.email)
      if (this.avatar_slot !== null)
        formData.append('[avatar]', this.avatar_slot)

      return formData
    }
  },

  methods: {
    ...mapMutations(['editCurrentUserAvatar']),
    ...mapMutations({
      editUserStore: 'user/editUserStore',
      editUserAvatarStore: 'user/editUserAvatarStore'
    }),
    ...mapActions([
      'updateAccount',
      'getAvatar',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    updateAccountHandler: async function() {
      const params = this.formData
      const headers = this.headers

      try {
        let response = await this.updateAccount({ params, headers })
        const currentUser = response.data.data

        response = await this.getAvatar(currentUser.id)
        const avatar = response.data.data.avatar

        await this.editUserStore({
          name: currentUser.name,
          email: currentUser.email
        })
        await this.editUserAvatarStore(avatar)
        await this.editCurrentUserAvatar(avatar)

        this.closeDialog()
        this.clearEditFormData()
        this.pushSnackbarSuccess({ message: 'アカウントを編集しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    cancelUpdateAccount() {
      this.closeDialog()
      this.clearEditFormData()
      this.pushSnackbarSuccess({
        message: 'スポットの編集をキャンセルしました'
      })
    },

    closeDialog() {
      this.$emit('closeDialog')
    },

    clearEditFormData() {
      this.name = this.user.data.name
      this.email = this.user.data.email
      this.avatar = this.user.avatar
      this.avatar_slot = null
    }
  }
}
</script>
