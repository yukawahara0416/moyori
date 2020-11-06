<template>
  <span class="ml-2">
    {{ removeTimeFromDaytime(comment.data.created_at) }}
  </span>
</template>

<script>
export default {
  props: {
    comment: Object
  },

  computed: {
    removeTimeFromDaytime() {
      return function(daytime) {
        const indexEnd = daytime.indexOf('T')
        return daytime.substring(0, indexEnd)
      }
    }
  }
}
</script>
