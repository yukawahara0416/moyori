<template>
  <v-avatar class="white--text headline" color="success" size="36">
    <v-img
      v-if="currentUser.data.avatar"
      :src="currentUser.data.avatar"
      alt="プロフィール画像"
    />
    <span v-else class="white--text headline">
      {{ currentUser.data.name.slice(0, 1) }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {
        return { data: { id: null, name: '', avatar: null } }
      },
      required: true
    }
  }
}
</script>
