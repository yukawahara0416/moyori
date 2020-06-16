<template>
  <v-row
    class="ma-0"
    fill-height
    no-gutter
    style="position: relative; height: calc(100vh - 60px);"
  >
    <google-maps />

    <v-col
      class="pa-0"
      :class="{
        indexHeight_big: $vuetify.breakpoint.mdAndUp,
        indexHeight_small: $vuetify.breakpoint.smAndDown
      }"
      cols="12"
      md="6"
      no-gutter
    >
      <v-container
        class="overflow-y-auto"
        fluid
        id="scroll-target"
        style="height: 100%; width: 100%;"
      >
        <v-row
          align="center"
          class="mx-0"
          justify="center"
          style="height: calc(100% - 20px); background-color: white;"
          v-if="!spots.length"
        >
          <v-col cols="10">
            <p>キーワード検索できます</p>
            <p>現在地に戻ることができます</p>
            <p>地図のサークル内のカフェを検索できます</p>
            <v-img
              class="white--text align-end"
              :src="require('@/assets/search_hint.png')"
            />
          </v-col>
        </v-row>

        <Card />
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import GoogleMaps from '@/components/GoogleMaps.vue'
import Card from '@/components/Card.vue'

export default {
  components: {
    GoogleMaps,
    Card
  },

  computed: {
    ...mapGetters(['spots']),

    vhHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '60vh'
        case 'sm':
          return '70vh'
        case 'md':
          return '80vh'
        case 'lg':
          return '90vh'
        case 'xl':
          return '100vh'
        default:
          return '100vh'
      }
    }
  }
}
</script>
