<template>
  <span>
    <v-list-group class="author" no-action :prepend-icon="'mdi-ninja'">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="'つくったひと'"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item class="px-12">
        <v-list-item-icon>
          <v-btn
            class="mr-5"
            icon
            target="_brank"
            v-for="(item, id) in items"
            :href="item.to"
            :key="id"
          >
            <v-badge v-if="item.badge !== ''" avatar bordered overlap>
              <template v-slot:badge>
                <v-avatar>
                  <v-img :src="item.badge" />
                </v-avatar>
              </template>

              <v-avatar>
                <v-img :src="item.icon" />
              </v-avatar>
            </v-badge>

            <v-avatar v-else>
              <v-img :src="item.icon" />
            </v-avatar>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>
  </span>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: require('@/assets/author_image.jpg'),
          badge: require('@/assets/twitter_mark.png'),
          to: 'https://twitter.com/yu_kawahara0416'
        },
        {
          icon: require('@/assets/wantedly_mark.png'),
          badge: '',
          to: 'https://www.wantedly.com/users/105529007'
        },
        {
          icon: require('@/assets/github_mark.png'),
          badge: '',
          to: 'https://github.com/yukawahara0416/moyori/blob/master/README.md'
        }
      ]
    }
  }
}
</script>

<style></style>
