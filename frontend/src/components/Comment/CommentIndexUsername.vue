<template>
  <span class="ml-2">{{ comment.user_name }} さん</span>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>
