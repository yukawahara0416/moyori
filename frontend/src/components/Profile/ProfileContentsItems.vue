<template>
  <v-tabs-items v-model="childTabs">
    <v-tab-item value="posts">
      <card-container :spots="posts" />
    </v-tab-item>

    <v-tab-item value="wifi_withs">
      <card-container :spots="wifi_withs" />
    </v-tab-item>

    <v-tab-item value="wifi_withouts">
      <card-container :spots="wifi_withouts" />
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
import { mapGetters, mapMutations } from 'vuex'
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  props: {
    user: Object
  },

  components: {
    CardContainer
  },

  computed: {
    ...mapGetters(['profileTab']),

    childTabs: {
      get() {
        return this.profileTab
      },
      set(newVal) {
        this.changeProfileTab(newVal)
      }
    },

    posts() {
      return this.user.posts || []
    },

    wifi_withs() {
      return this.user.wifi_withs || []
    },

    power_withs() {
      return this.user.power_withs || []
    },

    comments() {
      return this.user.comments || []
    },

    likes() {
      return this.user.likes || []
    }
  },

  methods: {
    ...mapMutations(['changeProfileTab'])
  }
}
</script>
