<template>
  <span class="ml-2">{{ comment.data.user_name }} さん</span>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>
