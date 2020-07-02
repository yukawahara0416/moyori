<template>
  <v-tabs-items v-model="childTabs">
    <v-tab-item value="tab-1">
      <card-container :spots="user.posts ? user.posts : []" :type="'posts'" />
    </v-tab-item>
    <v-tab-item value="tab-2">
      <card-container
        :spots="user.wifi_withs ? user.wifi_withs : []"
        :type="'wifi_withs'"
      />
    </v-tab-item>
    <v-tab-item value="tab-3">
      <card-container
        :spots="user.comments ? user.comments : []"
        :type="'comments'"
      />
    </v-tab-item>
    <v-tab-item value="tab-4">
      <card-container :spots="user.likes ? user.likes : []" :type="'likes'" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
import CardContainer from '@/components/Card/CardContainer.vue'

export default {
  props: {
    tabs: String,
    user: Object
  },

  components: {
    CardContainer
  },

  computed: {
    childTabs: {
      get() {
        return this.tabs
      },
      set(newValue) {
        this.$emit('changeTabs', newValue)
      }
    }
  }
}
</script>
