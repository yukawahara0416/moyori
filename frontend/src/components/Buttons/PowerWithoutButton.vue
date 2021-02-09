<template>
  <div>
    <v-btn
      icon
      @click.stop="powerWithoutHandler(spot)"
      @mouseover="mouseover()"
      @mouseleave="mouseleave()"
    >
      <v-icon v-if="isPowerWithouting" color="error">{{ icon }}</v-icon>
      <v-icon v-else :color="color">{{ icon }}</v-icon>
      <counter :spot="spot" :target="'power_withouts'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Counter from '@/components/Buttons/Counter.vue'
import { placeDetail, postSpot } from '@/plugins/maps.js'

export default {
  props: {
    spot: Object
  },

  components: {
    Counter
  },

  data() {
    return {
      icon: 'mdi-power-plug-off',
      color: null
    }
  },

  computed: {
    ...mapGetters(['spotForm', 'map', 'headers', 'currentUser', 'isLoggingIn']),

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
    ...mapMutations(['setForm', 'dialogOn', 'changeSignTab']),
    ...mapMutations({ updateSpot: 'spot/updateSpot' }),
    ...mapActions([
      'vote',
      'unVote',
      'pushSnackbarSuccess',
      'pushSnackbarError'
    ]),

    powerWithoutHandler: async function(spot) {
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
          params.append('power_without[spot_id]', newSpot.data.id)
        } else {
          params.append('power_without[spot_id]', spot.data.id)
        }

        this.voteHandler(newSpot || spot, params)

        this.pushSnackbarSuccess({ message: '「電源ないよ」を投票しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    getNewSpot: async function(place_id) {
      const updated = await placeDetail({ map: this.map, place_id })
      this.updateSpot({ place_id, updated })

      // formDataを用意してPOSTします
      this.setForm(this.spot)
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

      // 「電源あるよ」の投票があれば「電源あるよ」を取り消します
      if (this.isPowerWithing) {
        target = this.yourPowerWith[0]
        vote_id = await this.unVote({
          prop: 'power_withs',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
      }

      // 「電源ないよ」の投票があれば「電源ないよ」を取り消します
      if (this.isPowerWithouting) {
        target = this.yourPowerWithout[0]
        vote_id = await this.unVote({
          prop: 'power_withouts',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
        this.pushSnackbarSuccess({
          message: '「電源ないよ」を取り消しました'
        })
        return
      }

      // 「電源ないよ」を投票します
      await this.vote({
        prop: 'power_withouts',
        spot,
        params,
        headers,
        route,
        isMyPage,
        vote_id
      })
    },

    mouseover() {
      this.color = 'error'
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
