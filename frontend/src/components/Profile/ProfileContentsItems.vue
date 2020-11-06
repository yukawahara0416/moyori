<template>
  <v-tabs-items v-model="childTabs">
    <v-tab-item value="posts">
      <card-container :spots="user.posts ? user.posts : []" :type="'posts'" />
    </v-tab-item>

    <v-tab-item value="wifi_withs">
      <card-container
        :spots="user.wifi_withs ? user.wifi_withs : []"
        :type="'wifi_withs'"
      />
    </v-tab-item>

    <v-tab-item value="power_withs">
      <card-container
        :spots="user.power_withs ? user.power_withs : []"
        :type="'power_withs'"
      />
    </v-tab-item>

    <v-tab-item value="comments">
      <card-container
        :spots="user.comments ? user.comments : []"
        :type="'comments'"
      />
    </v-tab-item>

    <v-tab-item value="likes">
      <card-container :spots="user.likes ? user.likes : []" :type="'likes'" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import { mapGetters } from 'vuex'
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  props: {
    // tabs: String,
    user: Object
  },

  components: {
    CardContainer
  },

  computed: {
    ...mapGetters(['tab']),

    childTabs: {
      get() {
        // return this.tabs
        return this.tab
      },
      set(newValue) {
        // this.$emit('changeTabs', newValue)
        this.$store.dispatch('changeTab', newValue)
      }
    }
  }
}
</script>
