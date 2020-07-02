<template>
  <v-row
    align="center"
    class="my-5"
    justify="center"
    no-gutter
    style="flex-direction: column;"
  >
    <profile-actions
      :id="id"
      :user="user"
      :headers="headers"
      :currentUser="currentUser"
    />

    <profile-contents :user="user" />
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileActions from '@/components/Profile/ProfileActions.vue'
import ProfileContents from '@/components/Profile/ProfileContents.vue'

export default {
  props: {
    id: Number
  },

  components: {
    ProfileActions,
    ProfileContents
  },

  computed: {
    ...mapGetters({ user: 'user/user' }),
    ...mapGetters(['headers', 'currentUser'])
  },

  created() {
    this.clearSpots()
    this.clearUser()
    this.getUser(this.id)
  },

  methods: {
    ...mapActions({
      clearSpots: 'spot/clearSpots',
      clearUser: 'user/clearUser',
      getUser: 'user/getUser'
    })
  }
}
</script>
