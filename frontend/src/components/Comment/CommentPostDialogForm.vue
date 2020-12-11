<template>
  <v-card class="mb-2 pa-3">
    <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
      <v-form>
        <ValidationProvider
          name="コメント"
          rules="required|max:300"
          v-slot="{ errors, valid }"
        >
          <v-textarea
            autofocus
            label="コメント*"
            name="comment"
            prepend-icon="mdi-comment"
            rows="5"
            required
            type="text"
            v-model="content"
            :clearable="true"
            :error-messages="errors"
            :success="valid"
          />
        </ValidationProvider>

        <ValidationProvider
          name="画像"
          rules="image"
          v-slot="{ errors, valid }"
        >
          <v-file-input
            chips
            counter
            label="画像"
            name="comment"
            prepend-icon="mdi-camera"
            show-size
            v-model="image"
            :clearable="true"
            :error="errors.length > 0"
            :error-messages="errors"
            :success="valid"
            @change="onImagePicked"
          />
        </ValidationProvider>
      </v-form>

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

        <v-btn
          color="primary"
          type="submit"
          @click="commentHandler()"
          :disabled="invalid"
        >
          コメント
        </v-btn>

        <v-spacer />
      </v-card-actions>
      <v-card
        v-if="uploadImageUrl"
        class="d-flex mx-2"
        flat
        outlined
        tile
        width="150px"
      >
        <v-img aspect-ratio="1" :src="uploadImageUrl" />
      </v-card>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { placeDetail } from '@/plugins/maps.js'

export default {
  props: {
    spot: Object
  },

  data() {
    return {
      content: '',
      errors: [],
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
    ...mapGetters(['form', 'map', 'headers', 'isLoggingIn', 'profileTab']),

    isPostedSpot() {
      return this.spot.data.id !== null
    }
  },

  methods: {
    ...mapMutations(['assignSpotFormData', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateDataSpotsStore: 'spot/updateDataSpotsStore' }),
    ...mapActions({ postSpot: 'spot/postSpot' }),
    ...mapActions(['vote', 'pushSnackbarSuccess', 'pushSnackbarError']),

    commentHandler: async function() {
      const spot = this.spot
      let newSpot = null
      const params = new FormData()
      const tab = this.profileTab
      const headers = this.headers
      const route = this.$route.name

      params.append('comment[content]', this.content)
      if (this.image !== null) params.append('comment[image]', this.image)

      try {
        if (!this.isLoggingIn) {
          this.changeSignTab('signin')
          this.dialogOn('dialogSign')
          throw new Error('ログインしてください')
        }

        // DBに未登録のスポットであれば登録します
        if (!spot.isPosted()) {
          // 登録前にPlaceDetail検索します
          const map = this.map
          const data = await placeDetail(map, spot)
          this.updateDataSpotsStore({ spot, data })

          // formDataを用意してPOSTします
          this.assignSpotFormData(spot)
          newSpot = await this.postSpot({ params: this.form, headers })
          this.updateDataSpotsStore({ spot, data: newSpot.data })
          params.append('comment[spot_id]', newSpot.data.id)
        } else {
          params.append('comment[spot_id]', spot.data.id)
        }

        // コメントを投稿します
        await this.vote({
          prop: 'comments',
          spot: newSpot || spot,
          params,
          tab,
          headers,
          route
        })

        this.voteHandler(newSpot || spot)
        this.pushSnackbarSuccess({ message: 'コメントを投稿しました' })
        this.closeDialog()
        this.clearForm()
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

    closeDialog() {
      this.$emit('closeDialog')
    },

    clearForm() {
      this.content = ''
      this.image = null
      this.wifi_radio = 'unknown'
      this.power_radio = 'unknown'
    }
  }
}
</script>
