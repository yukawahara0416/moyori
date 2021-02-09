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

        <v-row class="pt-0 px-4">
          <v-col class="pl-0 py-0" :cols="uploadImageUrl ? 8 : 12">
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
          </v-col>
          <v-col class="py-0" v-if="uploadImageUrl" cols="4">
            <v-card class="d-flex mx-2" flat outlined tile width="100px">
              <v-img aspect-ratio="1" :src="uploadImageUrl" />
            </v-card>
          </v-col>
        </v-row>
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
          class="px-3"
          type="submit"
          :small="$vuetify.breakpoint.smAndDown"
          @click="commentHandler(spot)"
          :disabled="invalid"
        >
          コメント
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { placeDetail, postSpot } from '@/plugins/maps.js'

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
    ...mapGetters([
      'spotForm',
      'map',
      'currentUser',
      'headers',
      'isLoggingIn'
      // 'profileTab'
    ]),

    isWifiWithing() {
      return this.yourWifiWith.length > 0 ? true : false
    },

    isWifiWithouting() {
      return this.yourWifiWithout.length > 0 ? true : false
    },

    yourWifiWith() {
      return this.spot.hasYourVote('wifi_withs', this.currentUser.data.id)
    },

    yourWifiWithout() {
      return this.spot.hasYourVote('wifi_withouts', this.currentUser.data.id)
    },

    isPowerWithing() {
      return this.yourPowerWith.length > 0 ? true : false
    },

    isPowerWithouting() {
      return this.yourPowerWithout.length > 0 ? true : false
    },

    yourPowerWith() {
      return this.spot.hasYourVote('power_withs', this.currentUser.data.id)
    },

    yourPowerWithout() {
      return this.spot.hasYourVote('power_withouts', this.currentUser.data.id)
    }
  },

  methods: {
    ...mapMutations(['setSpotForm', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateSpot: 'spot/updateSpot' }),
    ...mapActions([
      'vote',
      'unVote',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    commentHandler: async function(spot) {
      let newSpot = null
      const params = new FormData()
      const headers = this.headers
      const route = this.$route.name

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      params.append('comment[content]', this.content)
      if (this.image !== null) params.append('comment[image]', this.image)

      try {
        if (!this.isLoggingIn) {
          this.changeSignTab('signin')
          this.dialogOn('dialogSign')
          throw new Error('ログインしてください')
        }

        // 未登録のスポットは登録します
        if (!spot.isPosted()) {
          newSpot = await this.getNewSpot(spot.data.place_id)
          params.append('comment[spot_id]', newSpot.data.id)
        } else {
          params.append('comment[spot_id]', spot.data.id)
        }

        // コメントを投稿します
        await this.vote({
          prop: 'comments',
          spot: newSpot || spot,
          params,
          headers,
          route,
          isMyPage
        })

        // 投票します
        await this.voteHandler(newSpot || spot)

        this.pushSnackbarSuccess({ message: 'コメントを投稿しました' })
        this.closeDialog()
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    getNewSpot: async function(place_id) {
      const updated = await placeDetail({ map: this.map, place_id })
      this.updateSpot({ place_id, updated })

      // formDataを用意してPOSTします
      this.setSpotForm(this.spot)
      const newSpot = await postSpot(this.spotForm, this.headers)
      this.updateSpot({ place_id, updated: newSpot })

      return newSpot
    },

    voteHandler: async function(spot) {
      // wifi・電源どちらも「わからない」の場合は、処理を終了します
      if (this.wifi_radio === 'unknown' && this.power_radio === 'unknown')
        return

      const params = new FormData()
      const headers = this.headers
      const route = this.$route.name

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      // 「Wifiあり」が選択された場合
      if (this.wifi_radio === 'wifi_with') {
        await this.wifiWithHandler(spot, headers, route, params, isMyPage)
      }

      // 「Wifiなし」が選択された場合
      if (this.wifi_radio === 'wifi_without') {
        await this.wifiWithoutHandler(spot, headers, route, params, isMyPage)
      }

      // 「電源あり」が選択された場合
      if (this.power_radio === 'power_with') {
        await this.powerWithHandler(spot, headers, route, params, isMyPage)
      }

      // 「電源なし」が選択された場合
      if (this.power_radio === 'power_without') {
        await this.powerWithoutHandler(
          // tab,
          headers,
          route,
          params,
          isMyPage
        )
      }
    },

    wifiWithHandler: async function(spot, headers, route, params, isMyPage) {
      params.append('wifi_with[spot_id]', spot.data.id)

      let target = null

      // 「Wifiあるよ」の投票があれば処理を終了します
      if (this.isWifiWithing) return

      // 「Wifiないよ」の投票があれば「Wifiないよ」の投票を取り消します
      if (this.isWifiWithouting) {
        target = this.yourWifiWithout[0]
        await this.unVote({
          prop: 'wifi_withouts',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「Wifiあるよ」を投票します
      await this.vote({
        prop: 'wifi_withs',
        spot,
        params,
        headers,
        route,
        isMyPage
      })
    },

    wifiWithoutHandler: async function(spot, headers, route, params, isMyPage) {
      params.append('wifi_without[spot_id]', spot.data.id)

      let target = null

      // 「Wifiないよ」の投票があれば処理を終了します
      if (this.isWifiWithouting) return

      // 「Wifiあるよ」の投票があれば取り消します
      if (this.isWifiWithing) {
        target = this.yourWifiWith[0]
        await this.unVote({
          prop: 'wifi_withs',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「Wifiないよ」を投票します
      await this.vote({
        prop: 'wifi_withouts',
        spot,
        params,
        headers,
        route,
        isMyPage
      })
    },

    powerWithHandler: async function(spot, headers, route, params, isMyPage) {
      params.append('power_with[spot_id]', spot.data.id)

      let target = null

      // 「電源あるよ」の投票があれば処理を終了します
      if (this.isPowerWithing) return

      // 「電源ないよ」の投票があれば「電源ないよ」を取り消します
      if (this.isPowerWithouting) {
        target = this.yourPowerWithout[0]
        await this.unVote({
          prop: 'power_withouts',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「電源あるよ」を投票します
      await this.vote({
        prop: 'power_withs',
        spot,
        params,
        headers,
        route,
        isMyPage
      })
    },

    powerWithoutHandler: async function(
      spot,
      headers,
      route,
      params,
      isMyPage
    ) {
      params.append('power_without[spot_id]', spot.data.id)

      let target = null

      // 「電源ないよ」の投票があれば処理を終了します
      if (this.isPowerWithouting) return

      // 「電源あるよ」の投票があれば「電源あるよ」を取り消します
      if (this.isPowerWithing) {
        target = this.yourPowerWith[0]
        await this.unVote({
          prop: 'power_withs',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「電源ないよ」を投票します
      await this.vote({
        prop: 'power_withouts',
        spot,
        params,
        headers,
        route,
        isMyPage
      })
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
      this.clearForm()
    },

    clearForm() {
      this.content = ''
      this.image = null
      this.uploadImageUrl = null
      this.wifi_radio = 'unknown'
      this.power_radio = 'unknown'
    }
  }
}
</script>
