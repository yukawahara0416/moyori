<template>
  <span>
    <v-btn
      :class="customClass"
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
  </span>
</template>

<script>
export default {
  props: {
    customClass: String
  },

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
