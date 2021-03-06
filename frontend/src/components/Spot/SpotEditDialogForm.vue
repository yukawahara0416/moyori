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
              v-model="name"
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
              v-model="address"
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
              v-model="phone"
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
              v-model="url"
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

        <v-btn
          class="mb-3"
          :small="$vuetify.breakpoint.smAndDown"
          @click.stop="cancelUpdateSpot()"
        >
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3"
          color="primary"
          type="submit"
          :small="$vuetify.breakpoint.smAndDown"
          :disabled="invalid"
          @click="updateSpotHandler()"
          @clearForm="clearForm()"
        >
          スポットを編集
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { axiosBase } from '@/plugins/axios.js'
import { Spot } from '@/class/Spot.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  data() {
    return {
      name: this.spot.data.name,
      address: this.spot.data.address,
      phone: this.spot.data.phone,
      url: this.spot.data.url,
      picture: null,
      uploadImageUrl: null
    }
  },

  computed: {
    ...mapGetters(['headers', 'profileTab']),

    formData() {
      const formData = new FormData()
      formData.append('spot[address]', this.address)
      formData.append('spot[name]', this.name)
      formData.append('spot[place_id]', this.spot.data.place_id)
      formData.append('spot[lat]', this.spot.data.position.lat)
      formData.append('spot[lng]', this.spot.data.position.lng)
      if (this.phone !== null) formData.append('spot[phone]', this.phone)
      if (this.url !== null) formData.append('spot[url]', this.url)
      if (this.picture !== null) formData.append('spot[picture]', this.picture)

      return formData
    }
  },

  methods: {
    ...mapMutations(['clearSpotForm']),
    ...mapMutations({
      updateSpotSearch: 'spot/updateSpot',
      updateSpotProfile: 'user/updateSpot'
    }),
    ...mapActions(['dialogOff', 'pushSnackbarSuccess', 'pushSnackbarError']),

    updateSpotHandler: async function() {
      try {
        const updated = await this.updateSpot(
          this.spot.data.id,
          this.formData,
          this.headers
        )

        this.stateMutation(updated)

        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'スポットの情報を更新しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    updateSpot(spot_id, params, headers) {
      return axiosBase
        .patch(`/api/v1/spots/${spot_id}`, params, { headers })
        .then(response => {
          return response.data
        })
        .catch(() => {
          throw new Error('スポットの更新に失敗しました')
        })
    },

    stateMutation(updated) {
      const place_id = this.spot.data.place_id

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      this.$route.name === 'profile'
        ? this.updateSpotProfile({
            place_id,
            updated,
            tab: this.profileTab,
            isMyPage
          })
        : this.updateSpotSearch({ place_id, updated })
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
      this.clearSpotForm()
      this.clearForm()
    },

    clearForm() {
      this.name = this.spot.data.name
      this.address = this.spot.data.address
      this.phone = this.spot.data.phone
      this.url = this.spot.data.url
      this.picture = null
      this.uploadImageUrl = null
    }
  }
}
</script>
