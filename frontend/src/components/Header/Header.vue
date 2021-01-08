<template>
  <div>
    <v-app-bar app flat class="app-bar">
      <header-title />

      <v-spacer />

      <header-tutorial-button v-if="$vuetify.breakpoint.smAndUp" />

      <header-avatar-button v-if="isLoggingIn" />

      <header-sign-button v-else />

      <v-app-bar-nav-icon @click.stop="openDrawer()" />
    </v-app-bar>

    <header-drawer-button v-model="drawerState" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import HeaderTutorialButton from '@/components/Header/HeaderTutorialButton.vue'
import HeaderAvatarButton from '@/components/Header/HeaderAvatarButton.vue'
import HeaderSignButton from '@/components/Header/HeaderSignButton.vue'
import HeaderDrawerButton from '@/components/Header/HeaderDrawerButton.vue'

export default {
  components: {
    HeaderTitle,
    HeaderTutorialButton,
    HeaderAvatarButton,
    HeaderSignButton,
    HeaderDrawerButton
  },

  data() {
    return {
      drawerState: false
    }
  },

  computed: {
    ...mapGetters(['isLoggingIn']),

    isSearchRoute() {
      const route = this.$route.name
      return route == 'search' ? true : false
    }
  },

  methods: {
    openDrawer() {
      this.drawerState = true
    }
  }
}
</script>

<style scoped>
.app-bar {
  background-color: white !important;
  padding: 0px !important;
}
</style>
