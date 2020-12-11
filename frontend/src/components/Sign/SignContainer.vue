<template>
  <v-card>
    <v-row align="center" justify="center" no-gutter class="row-defalut">
      <v-col class="py-0">
        <v-row align="center" justify="center" no-gutter class="row-defalut">
          <v-col class="tab-container" cols="12">
            <sign-container-tabs />

            <sign-container-tab-items />
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
  }
}
</script>

<style scoped>
.row-defalut {
  flex-direction: column;
}
.tab-container {
  background-color: white;
  border-radius: 4px;
}
</style>
