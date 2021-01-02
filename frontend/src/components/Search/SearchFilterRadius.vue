<template>
  <v-select
    class="select ma-2"
    label="検索範囲"
    v-model="select"
    :items="items"
    item-text="name"
    item-value="value"
    outlined
    dense
    return-object
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      items: [
        { name: '100m', value: 100 },
        { name: '500m', value: 500 },
        { name: '1km', value: 1000 },
        { name: '3km', value: 3000 }
      ]
    }
  },

  computed: {
    ...mapGetters({ radius: 'spot/radius' }),

    select: {
      get() {
        return this.radius
      },
      set(newVal) {
        this.setRadius(newVal)
      }
    }
  },

  methods: {
    ...mapMutations({ setRadius: 'spot/setRadius' })
  }
}
</script>

<style scoped>
.select {
  max-width: 100px;
}
</style>
