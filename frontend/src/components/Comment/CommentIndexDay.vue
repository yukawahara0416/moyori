<template>
  <span class="ml-2">
    {{ removeTimeFromDaytime(comment.created_at) }}
  </span>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
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
