<template>
  <div>
    <not-found v-if="isNotFound" />
    <template v-else>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Spot } from '@/class/Spot.js'
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

  created() {
    this.fetchData(this.id)
  },

  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id)
    next()
  },

  computed: {
    ...mapGetters({ user: 'user/user' }),
    ...mapGetters(['currentUser', 'isNotFound'])
  },

  methods: {
    ...mapMutations(['loadingOn', 'loadingOff', 'setNotFound']),
    ...mapMutations({
      clearSpotsStore: 'spot/clearSpotsStore',
      clearUserStore: 'user/clearUserStore',
      setUserStore: 'user/setUserStore'
    }),
    ...mapActions(['pushSnackbarError']),
    ...mapActions({ getUser: 'user/getUser' }),

    fetchData: async function(id) {
      this.loadingOn()
      this.clearSpotsStore()
      this.clearUserStore()

      try {
        let response = await this.getUser(id)
        this.setNotFound(false)

        const target = [
          'posts',
          'likes',
          'wifi_withs',
          'wifi_withouts',
          'power_withs',
          'power_withouts',
          'comments'
        ]

        for (let i = 0; i < target.length; i++) {
          response.data[target[i]] = response.data[target[i]].map(spot => {
            return new Spot(spot)
          })
        }

        this.setUserStore(response.data)
      } catch (error) {
        this.pushSnackbarError({ message: error })
        this.setNotFound(true)
      } finally {
        this.loadingOff()
      }
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
