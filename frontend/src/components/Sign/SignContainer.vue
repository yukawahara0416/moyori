<template>
  <v-card>
    <v-row align="center" justify="center" no-gutter class="row-defalut">
      <v-col class="py-0">
        <v-row align="center" justify="center" no-gutter class="row-defalut">
          <v-col class="tab-container" cols="12">
            <sign-tabs />

            <sign-tabitems />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SignTabs from '@/components/Sign/SignTabs.vue'
import SignTabitems from '@/components/Sign/SignTabitems.vue'

export default {
  components: {
    SignTabs,
    SignTabitems
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
