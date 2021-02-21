<template>
  <v-list-item-group class="staticPages" color="primary">
    <v-list-item :key="id" :to="page.to" v-for="(page, id) in pages">
      <v-list-item-icon>
        <v-icon>{{ page.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ page.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { title: '利用規約', icon: 'mdi-book-open-page-variant', to: '/rules' },
        { title: 'プライバシーポリシー', icon: 'mdi-security', to: '/privacy' }
      ]
    }
  }
}
</script>
