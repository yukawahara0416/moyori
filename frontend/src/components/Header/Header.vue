<template>
  <div>
    <v-app-bar app flat>
      <v-toolbar flat>
        <header-title />

        <header-chip />

        <v-spacer />

        <header-avatar v-if="isLoggingIn" />

        <header-sign-button v-else />

        <v-app-bar-nav-icon @click.stop="openDrawer()" />
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
    ...mapGetters(['isLoggingIn'])
  },

  methods: {
    openDrawer() {
      this.drawerState = true
    }
  }
}
</script>
