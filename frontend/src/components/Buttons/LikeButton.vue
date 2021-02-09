<template>
  <div class="mb-1">
    <v-btn
      fab
      small
      elevation="1"
      color="white"
      @click.stop="likeHandler(spot)"
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
      icon: 'mdi-heart',
      color: '#757575'
    }
  },

  computed: {
    ...mapGetters(['form', 'map', 'headers', 'currentUser', 'isLoggingIn']),

    isLiking() {
      return this.yourLike.length > 0 ? true : false
    },

    yourLike() {
      return this.spot.hasYourVote('likes', this.currentUser.data.id)
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

    likeHandler: async function(spot) {
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
          params.append('like[spot_id]', newSpot.data.id)
        } else {
          params.append('like[spot_id]', spot.data.id)
        }

        this.voteHandler(newSpot || spot, params)

        this.pushSnackbarSuccess({ message: 'いいねしました' })
      } catch (error) {
        this.pushSnackbarError({
          message: error
        })
      }
    },

    getNewSpot: async function(place_id) {
      const updated = await placeDetail({ map: this.map, place_id })
      this.updateSpot({ place_id, updated })

      // formDataを用意してPOSTします
      this.setForm(this.spot)
      const newSpot = await postSpot(this.form, this.headers)
      this.updateSpot({ place_id, updated: newSpot })

      return newSpot
    },

    voteHandler: async function(spot, params) {
      const headers = this.headers
      const route = this.$route.name

      let isMyPage = false
      if (this.$route.params.id && this.currentUser.data.id) {
        isMyPage = this.$route.params.id == this.currentUser.data.id
      }

      // 「いいね」があれば「いいね」を取り消します
      if (this.isLiking) {
        const target = this.yourLike[0]
        await this.unVote({
          prop: 'likes',
          spot,
          target,
          headers,
          route,
          isMyPage
        })
        this.pushSnackbarSuccess({ message: 'いいねを取り消しました' })
        return
      }

      // 「いいね」します
      await this.vote({
        prop: 'likes',
        spot,
        params,
        headers,
        route,
        isMyPage
      })
    },

    mouseover() {
      this.icon = 'mdi-heart'
      this.color = 'error'
    },

    mouseleave() {
      this.icon = 'mdi-heart'
      this.color = '#757575'
    }
  }
}
</script>

<style scoped>
button::before {
  background-color: white;
}
</style>
