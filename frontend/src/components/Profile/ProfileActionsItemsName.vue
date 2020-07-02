<template>
  <h3 class="my-3">{{ user.data ? user.data.name : '' }}</h3>
</template>

<script>
export default {
  props: {
    user: Object
  }
}
</script>
