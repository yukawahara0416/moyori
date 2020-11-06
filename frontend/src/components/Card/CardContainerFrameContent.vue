<template>
  <v-row class="pa-0">
    <card-container-frame-content-image :spot="spot" />

    <v-col class="py-0" cols="7" md="12">
      <card-container-frame-content-title :spot="spot" />
      <card-container-frame-content-text :spot="spot" />

      <v-divider class="mx-4"></v-divider>

      <card-container-frame-content-action :spot="spot" />
    </v-col>
  </v-row>
</template>

<script>
import CardContainerFrameContentImage from '@/components/Card/CardContainerFrameContentImage.vue'
import CardContainerFrameContentTitle from '@/components/Card/CardContainerFrameContentTitle.vue'
import CardContainerFrameContentText from '@/components/Card/CardContainerFrameContentText.vue'
import CardContainerFrameContentAction from '@/components/Card/CardContainerFrameContentAction.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    CardContainerFrameContentImage,
    CardContainerFrameContentTitle,
    CardContainerFrameContentText,
    CardContainerFrameContentAction
  }
}
</script>
