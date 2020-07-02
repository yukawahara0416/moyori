<template>
  <v-row
    align="stretch"
    class="ma-0"
    justify="space-around"
    style="background-color: white;"
  >
    <v-col
      class="mt-2"
      cols="12"
      sm="6"
      lg="4"
      v-for="(spot, id) in spots"
      :key="id"
    >
      <card-container-frame :spot="spot" :id="id" :type="type" />
    </v-col>

    <!-- カード配置調整（中央寄せ && 最下層端数左寄せ） -->
    <v-col
      class="ma-0 pa-0"
      cols="12"
      sm="6"
      lg="4"
      v-for="e in empties"
      :key="e"
    >
      <card-container-fill />
    </v-col>
  </v-row>
</template>

<script>
import CardContainerFrame from '@/components/Card/CardContainerFrame.vue'
import CardContainerFill from '@/components/Card/CardContainerFill.vue'

export default {
  props: {
    spots: Array,
    type: String
  },

  components: {
    CardContainerFrame,
    CardContainerFill
  },

  computed: {
    empties() {
      return Array.from(new Array(this.spots.length))
    }
  }
}
</script>
