<template>
  <v-row align="stretch" class="mt-0 mb-3 ml-0 mr-3" justify="space-around">
    <v-col
      class="pb-0 pr-0"
      cols="12"
      sm="6"
      :md="md"
      :lg="lg"
      v-for="(spot, id) in spots"
      :key="id"
    >
      <card-frame :spot="spot" :id="id" />
    </v-col>

    <!-- カード配置調整（中央寄せ && 最下層端数左寄せ） -->
    <v-col
      class="ma-0 pa-0"
      cols="12"
      sm="6"
      :md="md"
      :lg="lg"
      v-for="e in empties"
      :key="e"
    >
      <card-container-fill />
    </v-col>
  </v-row>
</template>

<script>
import CardFrame from '@/components/Card/CardFrame.vue'
import CardContainerFill from '@/components/Card/CardContainerFill.vue'

export default {
  props: {
    spots: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    }
  },

  components: {
    CardFrame,
    CardContainerFill
  },

  computed: {
    empties() {
      const number = this.spots.length === 1 ? 2 : this.spots.length
      return Array.from(new Array(number))
    },

    lg() {
      const route = this.$route.name

      if (route == 'profile') return 3
      return 4
    },

    md() {
      const route = this.$route.name
      if (route == 'profile') return 4
      return 6
    }
  }
}
</script>
