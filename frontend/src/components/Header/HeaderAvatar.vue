<template>
  <div class="text-center" v-if="currentUser !== null">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar class="white--text headline" color="success" size="36">
            <img
              alt="John"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              v-if="currentUser.data.image"
            />
            <span class="white--text headline" v-else>
              {{ currentUser.data.name.slice(0, 1) }}
            </span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>{{ currentUser.data.name }} さん</v-list-item>
        <v-list-item
          :to="{ name: 'profile', params: { id: currentUser.data.id } }"
        >
          <v-list-item-avatar>
            <v-icon btn>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>マイページ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-avatar>
            <v-icon btn>mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
