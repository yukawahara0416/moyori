<template>
  <div class="mb-1">
    <v-btn
      fab
      small
      elevation="1"
      color="white"
      @click.stop="likeHandler()"
      @mouseover="mouseover()"
      @mouseleave="mouseleave()"
    >
      <v-icon v-if="isLiking" color="error">mdi-heart</v-icon>
      <v-icon v-else :color="color">
        {{ icon }}
      </v-icon>
      <counter :spot="spot" :target="'likes'" />
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
      icon: 'mdi-heart',
      color: '#757575'
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

    isLiking() {
      return this.yourLike.length > 0 ? true : false
    },

    yourLike() {
      return this.spot.hasYourVote('likes', this.currentUser.data.id)
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

    likeHandler: async function() {
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
          this.updateDataSpotsStore({ spot, data: newSpot })
          params.append('like[spot_id]', newSpot.data.id)
        } else {
          params.append('like[spot_id]', spot.data.id)
        }

        // 「いいね」があれば「いいね」を取り消します
        if (this.isLiking) {
          target = this.yourLike[0]
          await this.unVote({
            prop: 'likes',
            spot,
            target,
            tab,
            headers,
            route
          })
          this.pushSnackbarSuccess({ message: 'いいねを取り消しました' })
          return
        }

        // 「いいね」します
        await this.vote({
          prop: 'likes',
          spot: newSpot || spot,
          params,
          tab,
          headers,
          route
        })
        this.pushSnackbarSuccess({ message: 'いいねしました' })
      } catch (error) {
        this.pushSnackbarError({
          message: error
        })
      }
    },

    mouseover() {
      this.icon = 'mdi-heart'
      this.color = 'error'
    },

    mouseleave() {
      this.icon = 'mdi-heart'
    }
  }
}
</script>

<style scoped>
button::before {
  background-color: white;
}
</style>
