<template>
  <v-avatar class="white--text headline" color="success" size="36">
    <v-img
      v-if="currentUser.avatar"
      :src="currentUser.avatar"
      alt="プロフィール画像"
    />
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
