<template>
  <h3 class="my-3">{{ userName }}</h3>
</template>

<script>
export default {
  props: {
    user: Object
  },

  computed: {
    userName() {
      if (this.user.data.name) {
        return this.user.data.name
      } else {
        return ''
      }
    }
  }
}
</script>
