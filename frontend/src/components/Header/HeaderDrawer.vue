<template>
  <v-navigation-drawer
    absolute
    app
    @input="$emit('input', $event)"
    temporary
    right
    :value="value"
  >
    <!-- <v-list v-if="headers !== null">
      <v-list-item
        :to="{ name: 'profile', params: { id: currentUser.data.id } }"
      >
        <v-avatar class="white--text headline" color="success" size="36">
          <img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            v-if="currentUser.data.image"
          />
          <span class="white--text headline" v-else>
            {{ currentUser.data.name.slice(0, 1) }}
          </span>
        </v-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ currentUser.data.name }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider /> -->

    <v-list>
      <!-- <v-list-item-group
        class="Authentication"
        color="primary"
        v-model="item"
        v-show="headers === null"
      >
        <v-list-item v-for="(item, i) in authenItems" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list-item-group>

      <v-list-item-group class="" color="primary">
        <v-list-item
          v-if="headers !== null"
          :to="{ name: 'profile', params: { id: currentUser.data.id } }"
        >
          <v-list-item-icon>
            <v-icon btn>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>マイページ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signOut" to="#" v-show="headers !== null">
          <v-list-item-icon>
            <v-icon btn>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </v-list-item-group> -->

      <v-list-item-group class="staticPages" color="primary" v-model="item">
        <v-list-item :key="i" :to="item.to" v-for="(item, i) in staticItems">
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider />

      <v-list-group
        class="author"
        :key="item.title"
        no-action
        :prepend-icon="item.icon"
        v-for="item in authorItems"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          class="px-12"
          v-for="subItem in item.items"
          :key="subItem.title"
        >
          <v-list-item-icon>
            <v-btn
              icon
              href="https://twitter.com/yu_kawahara0416"
              target="_brank"
              class="mr-5"
            >
              <v-badge avatar bordered overlap>
                <template v-slot:badge>
                  <v-avatar>
                    <v-img :src="require('@/assets/twitter_mark.png')" />
                  </v-avatar>
                </template>

                <v-avatar>
                  <v-img :src="require('@/assets/author_image.jpg')" />
                </v-avatar>
              </v-badge>
            </v-btn>

            <v-btn
              class="mr-5"
              href="https://www.wantedly.com/users/105529007"
              icon
              target="_brank"
            >
              <v-avatar>
                <v-img :src="require('@/assets/wantedly_mark.png')" />
              </v-avatar>
            </v-btn>

            <v-btn
              class="mr-5"
              href="https://github.com/yukawahara0416/moyori/blob/master/README.md"
              icon
              target="_blank"
            >
              <v-avatar>
                <v-img :src="require('@/assets/github_mark.png')" />
              </v-avatar>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-item-group>
        <v-list-item class="text-center" disabled>
          <v-list-item-subtitle>
            &copy; 2020
            <strong>MoYoRi</strong>
            <br />
            All Rights Reserved.
          </v-list-item-subtitle>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      authorItems: [
        {
          icon: 'mdi-ninja',
          title: 'つくったひと',
          to: '#',
          items: [{ icon: '', to: '', title: '' }]
        }
      ],
      item: 1,
      staticItems: [
        { text: 'MoYoRiとは', icon: 'mdi-help-circle-outline', to: '/about' },
        { text: '利用規約', icon: 'mdi-book-open-page-variant', to: '/rules' },
        { text: 'プライバシーポリシー', icon: 'mdi-security', to: '/privacy' }
      ]
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'headers'])
  },

  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
