<template>
  <div>
    <v-btn
      icon
      @click.stop="wifiWithHandler(spot)"
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
import { Spot } from '@/class/Spot.js'
import { placeDetail, postSpot } from '@/plugins/maps.js'

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
    ...mapGetters(['spotForm', 'map', 'headers', 'currentUser', 'isLoggingIn']),

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
    ...mapMutations(['setSpotForm', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateSpot: 'spot/updateSpot' }),
    ...mapActions([
      'vote',
      'unVote',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    wifiWithHandler: async function(spot) {
      let newSpot = null
      const params = new FormData()

      try {
        if (!this.isLoggingIn) {
          this.changeSignTab('signin')
          this.dialogOn('dialogSign')
          throw new Error('ログインしてください')
        }

        // 未登録のスポットは登録します
        if (!spot.isPosted()) {
          newSpot = await this.getNewSpot(spot.data.place_id)
          params.append('wifi_with[spot_id]', newSpot.data.id)
        } else {
          params.append('wifi_with[spot_id]', spot.data.id)
        }

        this.voteHandler(newSpot || spot, params)

        this.pushSnackbarSuccess({ message: '「Wifiあるよ」を投票しました' })
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

    voteHandler: async function(spot, params) {
      let target = null
      let vote_id = null
      const headers = this.headers
      const route = this.$route.name

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      // 「Wifiないよ」の投票があれば取り消します
      if (this.isWifiWithouting) {
        target = this.yourWifiWithout[0]
        vote_id = await this.unVote({
          prop: 'wifi_withouts',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「Wifiあるよ」の投票があれば取り消します
      if (this.isWifiWithing) {
        target = this.yourWifiWith[0]
        vote_id = await this.unVote({
          prop: 'wifi_withs',
          spot,
          target,
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
        spot,
        params,
        headers,
        route,
        isMyPage,
        vote_id
      })
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
