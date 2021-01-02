<template>
  <v-row class="pa-0">
    <v-col
      class="py-0"
      cols="4"
      md="12"
      :class="{
        cardImgPadding_small: $vuetify.breakpoint.smAndDown
      }"
    >
      <card-frame-content-image :spot="spot" />
    </v-col>

    <v-col
      class="py-0"
      cols="8"
      md="12"
      :class="{
        cardContentPadding_small: $vuetify.breakpoint.smAndDown
      }"
    >
      <card-frame-content-title :spot="spot" />

      <v-divider class="mx-4"></v-divider>

      <card-frame-content-action :spot="spot" />
    </v-col>
  </v-row>
</template>

<script>
import CardFrameContentImage from '@/components/Card/CardFrameContentImage.vue'
import CardFrameContentTitle from '@/components/Card/CardFrameContentTitle.vue'
import CardFrameContentAction from '@/components/Card/CardFrameContentAction.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    CardFrameContentImage,
    CardFrameContentTitle,
    CardFrameContentAction
  }
}
</script>

<style scoped>
.cardImgPadding_small {
  padding-right: 0px;
}
.cardContentPadding_small {
  padding-left: 0px;
}
</style>
