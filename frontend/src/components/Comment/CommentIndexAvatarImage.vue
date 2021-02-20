<template>
  <router-link :to="{ name: 'profile', params: { id: comment.user_id } }">
    <v-avatar class="white--text headline" color="success" size="24">
      <v-img
        v-if="comment.avatar"
        :src="comment.avatar"
        alt="プロフィール画像"
      />
      <span v-else class="white--text headline">
        {{ comment.user_name.slice(0, 1) }}
      </span>
    </v-avatar>
  </router-link>
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
  }
}
</script>
