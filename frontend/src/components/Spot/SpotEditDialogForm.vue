<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      <v-toolbar-title>スポットを編集</v-toolbar-title>
    </v-toolbar>

    <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
      <v-card-text>
        <v-form>
          <ValidationProvider
            v-slot="{ errors, valid }"
            name="スポット名"
            rules="required|max:100"
          >
            <v-text-field
              label="スポット名*"
              name="name"
              prepend-icon="mdi-coffee"
              type="text"
              v-model="spot.data.name"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="住所"
            rules="required|max:200"
          >
            <v-text-field
              label="住所*"
              name="address"
              prepend-icon="mdi-home-circle-outline"
              type="text"
              v-model="spot.data.address"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="電話番号"
            rules="phone"
          >
            <v-text-field
              label="電話番号（例：09012345678/090-1234-5678）"
              name="phone"
              prepend-icon="mdi-phone-outline"
              type="phone"
              v-model="spot.data.phone"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="url"
            rules="url|max:100"
          >
            <v-text-field
              label="URL（例：http://example.com/）"
              name="url"
              prepend-icon="mdi-web"
              type="text"
              v-model="spot.data.url"
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
                  label="画像"
                  name="picture"
                  prepend-icon="mdi-camera"
                  show-size
                  v-model="picture"
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

        <v-btn class="mb-3" large @click.stop="cancelUpdateSpot()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3"
          color="primary"
          large
          type="submit"
          @click="updateSpotHandler()"
          :disabled="invalid"
        >
          スポットを編集
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
    spot: Object
  },

  data() {
    return {
      name: this.spot.data.name,
      address: this.spot.data.address,
      picture: null,
      uploadImageUrl: null
    }
  },

  computed: {
    ...mapGetters(['headers', 'profileTab']),

    formData() {
      const formData = new FormData()
      formData.append('spot[address]', this.spot.data.address)
      formData.append('spot[name]', this.spot.data.name)
      formData.append('spot[place_id]', this.spot.data.place_id)

      formData.append('spot[lat]', this.spot.data.position.lat)
      formData.append('spot[lng]', this.spot.data.position.lng)
      if (this.spot.data.phone !== null)
        formData.append('spot[phone]', this.spot.data.phone)
      if (this.spot.data.url !== null)
        formData.append('spot[url]', this.spot.data.url)
      if (this.picture !== null) formData.append('spot[picture]', this.picture)

      return formData
    }
  },

  methods: {
    ...mapMutations(['clearSpotFormData']),
    ...mapMutations({
      updateDataSpotsStore: 'spot/updateDataSpotsStore',
      updateDataUserStore: 'user/updateDataUserStore'
    }),
    ...mapActions(['dialogOff', 'pushSnackbarSuccess', 'pushSnackbarError']),
    ...mapActions({ updateSpot: 'spot/updateSpot' }),

    updateSpotHandler: async function() {
      const spot = this.spot
      const params = this.formData
      const headers = this.headers
      const route = this.$route.name
      const tab = this.profileTab

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      try {
        const response = await this.updateSpot({ spot, params, headers })
        const data = response.data

        route === 'profile'
          ? this.updateDataUserStore({ spot, data, tab, isMyPage })
          : this.updateDataSpotsStore({ spot, data })

        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'スポットの情報を更新しました' })
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

    cancelUpdateSpot() {
      this.closeDialog()
      this.pushSnackbarSuccess({
        message: 'スポットの編集をキャンセルしました'
      })
    },

    closeDialog() {
      this.dialogOff('dialogSpotEdit')
      this.clearSpotFormData()
      this.clearForm()
    },

    clearForm() {
      this.picture = null
      this.uploadImageUrl = null
    }
  }
}
</script>
