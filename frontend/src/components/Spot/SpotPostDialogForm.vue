<template>
  <v-card class="pb-2">
    <v-toolbar class="white--text" color="primary" dense flat>
      スポットを新規作成
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
              class="pl-1 pr-4"
              autofocus
              label="スポット名*"
              name="name"
              prepend-icon="mdi-coffee"
              type="text"
              v-model="form.name"
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
              class="pl-1 pr-4"
              label="住所*（クリックした座標から候補を表示しています）"
              name="address"
              prepend-icon="mdi-home-circle-outline"
              type="text"
              v-model="form.address"
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
              class="pl-1 pr-4"
              label="電話番号（例：09012345678/090-1234-5678）"
              name="phone"
              prepend-icon="mdi-phone-outline"
              type="phone"
              v-model="form.phone"
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
              class="pl-1 pr-4"
              label="URL（例：http://example.com/）"
              name="url"
              prepend-icon="mdi-web"
              type="text"
              v-model="form.url"
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
                  v-model="form.picture"
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
        <v-row>
          <v-col class="py-0 pr-1" cols="6">
            <v-card flat outlined class="mb-2">
              <v-card-actions>
                <v-spacer />
                <span class="small-font">
                  <v-icon color="success">mdi-wifi</v-icon>
                  WiFiはありますか？
                </span>
                <v-spacer />
              </v-card-actions>
              <v-card-text class="py-0">
                <v-radio-group v-model="wifi_radio" column dense class="mt-0">
                  <span v-for="(item, id) in items.wifi_radio" :key="id">
                    <v-radio
                      class="mb-0"
                      :label="item.label"
                      :value="item.value"
                    ></v-radio>
                  </span>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="py-0 pl-1" cols="6">
            <v-card flat outlined class="mb-2">
              <v-card-actions>
                <v-spacer />
                <span class="small-font">
                  <v-icon color="success">mdi-power-plug</v-icon>
                  充電はできますか？
                </span>
                <v-spacer />
              </v-card-actions>
              <v-card-text class="py-0">
                <v-radio-group v-model="power_radio" column dense class="mt-0">
                  <span v-for="(item, id) in items.power_radio" :key="id">
                    <v-radio
                      class="mb-0"
                      :label="item.label"
                      :value="item.value"
                    ></v-radio>
                  </span>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-actions>
        <v-spacer />

        <v-btn class="mb-3 px-10" large @click="cancelPostSpot()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          @click="postSpotHandler()"
          :disabled="invalid"
        >
          スポットを登録する
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      image: null,
      uploadImageUrl: null,
      wifi_radio: 'unknown',
      power_radio: 'unknown',
      items: {
        wifi_radio: [
          { label: 'あり', value: 'wifi_with' },
          { label: 'なし', value: 'wifi_without' },
          { label: 'わからない', value: 'unknown' }
        ],
        power_radio: [
          { label: 'あり', value: 'power_with' },
          { label: 'なし', value: 'power_without' },
          { label: 'わからない', value: 'unknown' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['form', 'headers', 'form', 'formData', 'profileTab'])
  },

  methods: {
    ...mapMutations(['clearSpotFormData', 'pushSnackbar']),
    ...mapMutations({ unshiftSpotsStore: 'spot/unshiftSpotsStore' }),
    ...mapActions([
      'vote',
      'dialogOff',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),
    ...mapActions({ postSpot: 'spot/postSpot', spotlight: 'spot/spotlight' }),

    postSpotHandler: async function() {
      const params = this.formData
      const headers = this.headers

      try {
        const newSpot = await this.postSpot({ params, headers })
        this.unshiftSpotsStore(newSpot)
        this.voteHandler(newSpot)
        this.spotlight(newSpot)
        this.closeDialog()
        this.pushSnackbarSuccess({ message: 'スポットを登録しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    voteHandler: async function(spot) {
      const params = new FormData()
      const tab = this.profileTab
      const headers = this.headers
      const route = this.$route.name

      if (this.wifi_radio !== 'unknown') {
        params.append(`${this.wifi_radio}[spot_id]`, spot.data.id)
        await this.vote({
          prop: `${this.wifi_radio}s`,
          spot,
          params,
          tab,
          headers,
          route
        })
      }

      if (this.power_radio !== 'unknown') {
        params.append(`${this.power_radio}[spot_id]`, spot.data.id)
        await this.vote({
          prop: `${this.power_radio}s`,
          spot,
          params,
          tab,
          headers,
          route
        })
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

    cancelPostSpot() {
      this.uploadImageUrl = null
      this.closeDialog()
      this.pushSnackbarSuccess({
        message: 'スポットの登録をキャンセルしました'
      })
    },

    closeDialog() {
      this.dialogOff('dialogSpotCreate')
      this.clearSpotFormData()
      this.clearForm()
    },

    clearForm() {
      this.image = null
      this.wifi_radio = 'unknown'
      this.power_radio = 'unknown'
    }
  }
}
</script>

<style scoped>
.small-font {
  font-size: 0.9em !important;
}
</style>
