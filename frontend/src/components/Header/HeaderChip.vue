<template>
  <v-chip
    class="mx-5 px-5"
    close
    color="success"
    label
    large
    outlined
    v-if="chipState && $vuetify.breakpoint.mdAndUp"
    @click:close="chipState = !chipState"
  >
    つくったひと→
    <header-author :customClass="''" />
  </v-chip>
</template>

<script>
import HeaderAuthor from '@/components/Header/HeaderAuthor.vue'

export default {
  components: {
    HeaderAuthor
  },

  data() {
    return {
      chipState: true
    }
  }
}
</script>
