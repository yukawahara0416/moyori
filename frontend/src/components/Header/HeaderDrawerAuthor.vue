<template>
  <v-list-group class="author" no-action :prepend-icon="'mdi-ninja'">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="'つくったひと'"></v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item class="px-3">
      <v-spacer />
      <v-list-item-icon>
        <header-author :customClass="'mr-3'" />
      </v-list-item-icon>
      <v-spacer />
    </v-list-item>
  </v-list-group>
</template>

<script>
import HeaderAuthor from '@/components/Header/HeaderAuthor.vue'

export default {
  props: {
    customClass: String
  },

  components: {
    HeaderAuthor
  }
}
</script>
