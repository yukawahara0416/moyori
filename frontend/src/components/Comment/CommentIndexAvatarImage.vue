<template>
  <v-avatar class="white--text headline" color="success" size="24">
    <v-img v-if="comment.avatar" :src="comment.avatar" alt="プロフィール画像" />
    <span v-else class="white--text headline">
      {{ comment.user_name.slice(0, 1) }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>
