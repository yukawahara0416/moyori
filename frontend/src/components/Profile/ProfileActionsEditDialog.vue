<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      プロフィール編集
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

          <v-row class="pt-0 px-4">
            <v-col class="pl-0 py-0" :cols="uploadImageUrl ? 8 : 12">
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
                  v-model="image"
                  :clearable="true"
                  :error-messages="errors"
                  :success="valid"
                  @change="onImagePicked"
                />
              </ValidationProvider>
            </v-col>
            <v-col class="py-0" v-if="uploadImageUrl" cols="4">
              <v-card class="d-flex mx-2" flat outlined tile width="100px">
                <v-img aspect-ratio="1" :src="uploadImageUrl" />
              </v-card>
            </v-col>
          </v-row>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    user: Object
  },

  data() {
    return {
      name: this.user.data.name,
      email: this.user.data.email,
      avatar: this.user.data.avatar,
      image: null,
      uploadImageUrl: null
    }
  },

  computed: {
    ...mapGetters(['headers']),

    formData() {
      const formData = new FormData()
      formData.append('[name]', this.name)
      formData.append('[email]', this.email)
      if (this.image !== null) formData.append('[avatar]', this.image)

      return formData
    }
  },

  methods: {
    ...mapMutations({ updateCurrentUser: 'updateCurrentUser' }),
    ...mapMutations({ updateUser: 'user/updateUser' }),
    ...mapActions([
      'updateAccount',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    updateAccountHandler: async function() {
      const params = this.formData
      const headers = this.headers

      try {
        const updated = await this.updateAccount({ params, headers })

        this.storeMutation(updated)

        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'アカウントを編集しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = null
      }
    },

    storeMutation(updated) {
      this.updateUser({
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar
      })

      this.updateCurrentUser({
        name: updated.name,
        email: updated.email,
        avatar: updated.avatar
      })
    },

    cancelUpdateAccount() {
      this.closeDialog()
      this.pushSnackbarSuccess({
        message: 'スポットの編集をキャンセルしました'
      })
    },

    closeDialog() {
      this.$emit('closeDialog')
      this.clearForm()
    },

    clearForm() {
      this.name = this.user.data.name
      this.email = this.user.data.email
      this.avatar = this.user.data.avatar
      this.image = null
      this.uploadImageUrl = null
    }
  }
}
</script>
