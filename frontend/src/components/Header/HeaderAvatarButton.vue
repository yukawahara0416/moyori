<template>
  <div class="ml-3 text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="test" icon v-bind="attrs" v-on="on">
          <header-avatar-image :currentUser="currentUser" />
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <header-avatar-list :currentUser="currentUser" />
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderAvatarImage from '@/components/Header/HeaderAvatarImage.vue'
import HeaderAvatarList from '@/components/Header/HeaderAvatarList.vue'

export default {
  components: {
    HeaderAvatarImage,
    HeaderAvatarList
  },

  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style scoped>
button::before {
  background-color: white;
}
</style>
