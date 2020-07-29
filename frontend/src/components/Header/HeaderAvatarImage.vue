<template>
  <v-avatar class="white--text headline" color="success" size="36">
    <img alt="" src="" v-if="currentUser.data.image" />
    <span class="white--text headline" v-else>
      {{ currentUser.data.name.slice(0, 1) }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    currentUser: Object
  }
}
</script>

<style></style>
