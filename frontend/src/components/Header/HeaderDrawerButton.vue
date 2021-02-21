<template>
  <v-navigation-drawer
    app
    temporary
    right
    class="drawer"
    :value="value"
    @input="input($event)"
  >
    <v-list>
      <header-drawer-pages />

      <v-divider />

      <header-drawer-footer />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import HeaderDrawerPages from '@/components/Header/HeaderDrawerPages.vue'
import HeaderDrawerFooter from '@/components/Header/HeaderDrawerFooter.vue'

export default {
  props: {
    value: {
      type: Boolean,
      default: () => {
        return false
      },
      required: true
    }
  },

  components: {
    HeaderDrawerPages,
    HeaderDrawerFooter
  },

  methods: {
    input(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style scoped>
.drawer {
  z-index: 200;
}
</style>
