<template>
  <div>
    <v-btn
      icon
      @click.stop="wifiWithHandler()"
      @mouseover="mouseover()"
      @mouseleave="mouseleave()"
    >
      <v-icon v-if="isWifiWithing" color="success">{{ icon }}</v-icon>
      <v-icon v-else :color="color">{{ icon }}</v-icon>
      <counter :spot="spot" :target="'wifi_withs'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Counter from '@/components/Buttons/Counter.vue'
import { placeDetail } from '@/plugins/maps.js'

export default {
  props: {
    spot: Object
  },

  components: {
    Counter
  },

  data() {
    return {
      icon: 'mdi-wifi',
      color: null
    }
  },

  computed: {
    ...mapGetters([
      'form',
      'map',
      'headers',
      'currentUser',
      'isLoggingIn',
      'profileTab'
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
    }
  },

  methods: {
    ...mapMutations(['assignSpotFormData', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateDataSpotsStore: 'spot/updateDataSpotsStore' }),
    ...mapActions({ postSpot: 'spot/postSpot' }),
    ...mapActions([
      'vote',
      'unVote',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    wifiWithHandler: async function() {
      const spot = this.spot
      let newSpot = null
      const params = new FormData()
      let target = null
      const tab = this.profileTab
      const headers = this.headers
      const route = this.$route.name

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

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
          this.updateDataSpotsStore({ spot, data: newSpot })
          params.append('wifi_with[spot_id]', newSpot.data.id)
        } else {
          params.append('wifi_with[spot_id]', spot.data.id)
        }

        // 「Wifiないよ」の投票があれば取り消します
        if (this.isWifiWithouting) {
          target = this.yourWifiWithout[0]
          await this.unVote({
            prop: 'wifi_withouts',
            spot,
            target,
            tab,
            headers,
            route,
            isMyPage
          })
        }

        // 「Wifiあるよ」の投票があれば取り消します
        if (this.isWifiWithing) {
          target = this.yourWifiWith[0]
          await this.unVote({
            prop: 'wifi_withs',
            spot,
            target,
            tab,
            headers,
            route,
            isMyPage
          })
          this.pushSnackbarSuccess({
            message: '「Wifiあるよ」を取り消しました'
          })
          return
        }

        // 「Wifiあるよ」を投票します
        await this.vote({
          prop: 'wifi_withs',
          spot: newSpot || spot,
          params,
          tab,
          headers,
          route,
          isMyPage,
        })
        this.pushSnackbarSuccess({ message: '「Wifiあるよ」を投票しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    mouseover() {
      this.color = 'success'
    },

    mouseleave() {
      this.color = null
    }
  }
}
</script>

<style scoped>
button::before {
  background-color: white;
}
</style>
