<template>
  <div>
    <v-btn
      icon
      @click.stop="powerWithHandler()"
      @mouseover="mouseover()"
      @mouseleave="mouseleave()"
    >
      <v-icon v-show="isPowerWithing" color="success">{{ icon }}</v-icon>
      <v-icon v-show="!isPowerWithing" :color="color">{{ icon }}</v-icon>
      <counter :spot="spot" :target="'power_withs'" />
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
      icon: 'mdi-power-plug',
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
    ...mapMutations(['assignSpotFormData', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateDataSpotsStore: 'spot/updateDataSpotsStore' }),
    ...mapActions({ postSpot: 'spot/postSpot' }),
    ...mapActions([
      'vote',
      'unVote',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    powerWithHandler: async function() {
      const spot = this.spot
      let newSpot = null
      const params = new FormData()
      let target = null
      const tab = this.profileTab
      const headers = this.headers
      const route = this.$route.name

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
          params.append('power_with[spot_id]', newSpot.data.id)
        } else {
          params.append('power_with[spot_id]', spot.data.id)
        }

        // 「電源ないよ」の投票があれば「電源ないよ」を取り消します
        if (this.isPowerWithouting) {
          target = this.yourPowerWithout[0]
          await this.unVote({
            prop: 'power_withouts',
            spot,
            target,
            tab,
            headers,
            route
          })
        }

        // 「電源あるよ」の投票があれば「電源あるよ」を取り消します
        if (this.isPowerWithing) {
          target = this.yourPowerWith[0]
          await this.unVote({
            prop: 'power_withs',
            spot,
            target,
            tab,
            headers,
            route
          })
          this.pushSnackbarSuccess({
            message: '「電源あるよ」を取り消しました'
          })
          return
        }

        // 「電源あるよ」を投票します
        await this.vote({
          prop: 'power_withs',
          spot: newSpot || spot,
          params,
          tab,
          headers,
          route
        })
        this.pushSnackbarSuccess({ message: '「電源あるよ」を投票しました' })
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
