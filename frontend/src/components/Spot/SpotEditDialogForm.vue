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
            rules="required|max:40"
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

        <v-btn class="mb-3 px-10" large @click.stop="cancelUpdateSpot()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          @click="updateSpotHandler()"
          :disabled="invalid"
        >
          スポットを編集する
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
      picture: null,
      uploadImageUrl: null
    }
  },

  computed: {
    ...mapGetters(['headers']),

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
    ...mapMutations({ updateDataSpotsStore: 'spot/updateDataSpotsStore' }),
    ...mapActions(['dialogOff', 'pushSnackbarSuccess', 'pushSnackbarError']),
    ...mapActions({ updateSpot: 'spot/updateSpot' }),

    updateSpotHandler: async function() {
      const spot = this.spot
      const params = this.formData
      const headers = this.headers

      try {
        const data = await this.updateSpot({ spot, params, headers })
        await this.updateDataSpotsStore({ spot, data })
        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'スポットの情報を更新しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
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
    }
  }
}
</script>
