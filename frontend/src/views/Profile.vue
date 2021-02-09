<template>
  <div>
    <not-found v-if="isNotFound" />
    <template v-else>
      <gmap-map ref="map" :center="center" :zoom="zoom" />
      <v-row align="center" class="row-default my-5" justify="center" no-gutter>
        <v-col class="col-default mb-5" cols="8">
          <v-row align="center" class="row-default" justify="center" no-gutter>
            <profile-items :user="user" />
            <profile-actions :id="id" :user="user" :currentUser="currentUser" />
          </v-row>
        </v-col>

        <v-col cols="11" class="col-default" style="min-height: 50vh;">
          <profile-contents :user="user" />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { axiosBase } from '@/plugins/axios.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Spot } from '@/class/Spot.js'
import { gmapApi } from 'vue2-google-maps'
import uniqBy from 'lodash/uniqBy'
import ProfileItems from '@/components/Profile/ProfileItems.vue'
import ProfileActions from '@/components/Profile/ProfileActions.vue'
import ProfileContents from '@/components/Profile/ProfileContents.vue'
import NotFound from '@/views/NotFound.vue'

export default {
  props: {
    id: Number
  },

  components: {
    ProfileItems,
    ProfileActions,
    ProfileContents,
    NotFound
  },

  async mounted() {
    this.$gmapApiPromiseLazy().then(async () => {
      await this.googleMutation(gmapApi)
      await this.mapMutation(this.$refs.map.$mapObject)
    })
    this.fetchData(this.id)
    this.changeProfileTab('posts')
  },

  beforeRouteUpdate(to, from, next) {
    this.$gmapApiPromiseLazy().then(async () => {
      await this.googleMutation(gmapApi)
      await this.mapMutation(this.$refs.map.$mapObject)
    })
    this.fetchData(to.params.id)
    this.changeProfileTab('posts')
    next()
  },

  data() {
    return {
      center: { lat: 35.680959, lng: 139.767306 },
      zoom: 12
    }
  },

  computed: {
    ...mapGetters({ user: 'user/user' }),
    ...mapGetters(['currentUser', 'isNotFound'])
  },

  methods: {
    ...mapMutations([
      'googleMutation',
      'mapMutation',
      'changeProfileTab',
      'loadingOn',
      'loadingOff',
      'setNotFound'
    ]),
    ...mapMutations({
      clearSpots: 'spot/clearSpots',
      clearUser: 'user/clearUser',
      setUser: 'user/setUser'
    }),
    ...mapActions(['pushSnackbarError']),

    fetchData: async function(id) {
      this.loadingOn()
      this.clearSpots()
      this.clearUser()

      try {
        let user = await this.getUser(id)
        this.setNotFound(false)

        user = this.mappingSpot(user)

        this.setUser(user)
      } catch (error) {
        this.pushSnackbarError({ message: error })
        this.setNotFound(true)
      } finally {
        this.loadingOff()
      }
    },

    getUser(id) {
      return axiosBase
        .get(`/api/v1/users/${id}`)
        .then(response => {
          return response.data
        })
        .catch(() => {
          throw new Error('ユーザ情報の取得に失敗しました')
        })
    },

    mappingSpot(user) {
      const keys = Object.keys(user)

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'data') continue
        user[keys[i]] = user[keys[i]].map(obj => {
          return new Spot(obj)
        })
      }

      user.comments = uniqBy(user.comments, 'data.id')

      return user
    }
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
.col-default {
  background-color: white;
  border-radius: 4px;
}
</style>
