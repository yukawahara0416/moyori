<template>
  <v-tabs-items v-model="childTabs">
    <v-tab-item value="posts">
      <card-container :spots="posts" />
    </v-tab-item>

    <v-tab-item value="wifi_withs">
      <card-container :spots="wifi_withs" />
    </v-tab-item>

    <v-tab-item value="power_withs">
      <card-container :spots="power_withs" />
    </v-tab-item>

    <v-tab-item value="comments">
      <card-container :spots="comments" />
    </v-tab-item>

    <v-tab-item value="likes">
      <card-container :spots="likes" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { mapGetters } from 'vuex'
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  props: {
    user: Object
  },

  components: {
    CardContainer
  },

  computed: {
    ...mapGetters(['tab']),

    childTabs: {
      get() {
        return this.tab
      },
      set(newValue) {
        this.$store.dispatch('changeTab', newValue)
      }
    },

    posts() {
      return this.user.posts ? this.user.posts : []
    },

    wifi_withs() {
      return this.user.wifi_withs ? this.user.wifi_withs : []
    },

    power_withs() {
      return this.user.power_withs ? this.user.power_withs : []
    },

    comments() {
      return this.user.comments ? this.user.comments : []
    },

    likes() {
      return this.user.likes ? this.user.likes : []
    }
  }
}
</script>
