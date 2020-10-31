<template>
  <div>
    <v-app-bar app flat>
      <v-toolbar flat>
        <header-title />
        <header-chip />

        <v-spacer />

        <header-sign-button v-if="headers === null" />
        <header-avatar v-else :currentUser="currentUser" />

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
import HeaderTitle from '@/components/Header/HeaderTitle.vue'

export default {
  props: {
    user: Object
  },

  components: {
    HeaderAvatar,
    HeaderChip,
    HeaderDrawer,
    HeaderSignButton,
    HeaderTitle
  },

  data() {
    return {
      drawerState: false
    }
  },

  computed: {
    ...mapGetters(['headers', 'currentUser'])
  }
}
</script>
