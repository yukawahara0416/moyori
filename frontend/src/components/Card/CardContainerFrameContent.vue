<template>
  <v-row class="pa-0">
    <card-container-frame-content-image :spot="spot" />
    <v-col class="py-0" cols="7" md="12">
      <card-container-frame-content-text :spot="spot" />
      <card-container-frame-content-action :spot="spot" :id="id" :type="type" />
    </v-col>
  </v-row>
</template>

<script>
import CardContainerFrameContentImage from '@/components/Card/CardContainerFrameContentImage.vue'
import CardContainerFrameContentText from '@/components/Card/CardContainerFrameContentText.vue'
import CardContainerFrameContentAction from '@/components/Card/CardContainerFrameContentAction.vue'

export default {
  props: {
    spot: Object,
    id: Number,
    type: String
  },

  components: {
    CardContainerFrameContentImage,
    CardContainerFrameContentText,
    CardContainerFrameContentAction
  }
}
</script>
