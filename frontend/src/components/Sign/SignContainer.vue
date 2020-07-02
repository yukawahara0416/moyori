<template>
  <v-card>
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
    >
      <v-col>
        <v-row
          align="center"
          justify="center"
          no-gutter
          style="flex-direction: column;"
        >
          <v-col cols="12" style="background-color: white; border-radius: 4px;">
            <sign-container-tabs :tabs="tabs" @changeTabs="changeTabs" />
            <sign-container-tab-items :tabs="tabs" @changeTabs="changeTabs" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SignContainerTabs from '@/components/Sign/SignContainerTabs.vue'
import SignContainerTabItems from '@/components/Sign/SignContainerTabItems.vue'

export default {
  components: {
    SignContainerTabs,
    SignContainerTabItems
  },

  data() {
    return {
      tabs: null
    }
  },

  methods: {
    changeTabs(newValue) {
      this.tabs = newValue
    }
  }
}
</script>
