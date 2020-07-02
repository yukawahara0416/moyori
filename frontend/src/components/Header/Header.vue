<template>
  <div>
    <v-app-bar app flat>
      <v-toolbar flat>
        <v-toolbar-title class="headline text-uppercase">
          <router-link to="/">MoYoRi</router-link>
        </v-toolbar-title>

        <header-chip />

        <v-spacer />

        <header-avatar />
        <header-sign-button />

        <v-app-bar-nav-icon @click.stop="drawerState = !drawerState" />
      </v-toolbar>
    </v-app-bar>

    <header-drawer v-model="drawerState" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderAvatar from '@/components/Header/HeaderAvatar.vue'
import HeaderChip from '@/components/Header/HeaderChip.vue'
import HeaderDrawer from '@/components/Header/HeaderDrawer.vue'
import HeaderSignButton from '@/components/Header/HeaderSignButton.vue'

export default {
  components: {
    HeaderAvatar,
    HeaderChip,
    HeaderDrawer,
    HeaderSignButton
  },

  data() {
    return {
      drawerState: false
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'headers'])
  }
}
</script>
