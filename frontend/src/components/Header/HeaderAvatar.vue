<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <header-avatar-image :currentUser="currentUser" />
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
