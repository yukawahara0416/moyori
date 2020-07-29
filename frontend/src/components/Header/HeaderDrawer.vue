<template>
  <v-navigation-drawer
    absolute
    app
    @input="input($event)"
    temporary
    right
    :value="value"
  >
    <v-list>
      <header-drawer-pages />
      <v-divider />
      <header-drawer-author />
      <header-drawer-footer />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import HeaderDrawerPages from '@/components/Header/HeaderDrawerPages.vue'
import HeaderDrawerAuthor from '@/components/Header/HeaderDrawerAuthor.vue'
import HeaderDrawerFooter from '@/components/Header/HeaderDrawerFooter.vue'

export default {
  props: {
    value: Boolean
  },

  components: {
    HeaderDrawerPages,
    HeaderDrawerAuthor,
    HeaderDrawerFooter
  },

  methods: {
    input(event) {
      this.$emit('input', event)
    }
  }
}
</script>
