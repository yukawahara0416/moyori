<template>
  <v-row
    align="center"
    class="my-5"
    justify="center"
    no-gutter
    style="flex-direction: column;"
  >
    <v-col
      class="mb-5"
      cols="8"
      style="background-color: white; border-radius: 4px;"
    >
      <v-row
        align="center"
        justify="center"
        no-gutter
        style="flex-direction: column;"
      >
        <profile-items :user="user" />

        <profile-actions
          :id="id"
          :user="user"
          :headers="headers"
          :currentUser="currentUser"
        />
      </v-row>
    </v-col>

    <v-col cols="11" style="background-color: white; border-radius: 4px;">
      <profile-contents :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileItems from '@/components/Profile/ProfileItems.vue'
import ProfileActions from '@/components/Profile/ProfileActions.vue'
import ProfileContents from '@/components/Profile/ProfileContents.vue'

export default {
  props: {
    id: Number
  },

  components: {
    ProfileItems,
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
