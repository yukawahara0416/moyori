<template>
  <v-list-item :to="{ name: 'profile', params: { id: currentUser.data.id } }">
    <v-list-item-avatar>
      <v-icon btn>mdi-account-circle</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>マイページ</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {
        return { data: { id: null } }
      },
      required: true
    }
  }
}
</script>
