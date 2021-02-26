<template>
  <span>
    <v-select
      class="select ma-2"
      label="絞り込み"
      v-model="select"
      :items="items"
      item-text="name"
      item-value="value"
      small-chips
      deletable-chips
      multiple
      outlined
      dense
    >
      <template slot="item" slot-scope="{ item }">
        <v-icon class="mr-2" :color="item.color">
          {{ item.icon }}
        </v-icon>
        <p class="caption ma-0">
          {{ item.name }} ({{ countSpot(item.value) }}件)
        </p>
      </template>
    </v-select>
  </span>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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

  data() {
    return {
      items: [
        {
          name: 'Wifi',
          icon: 'mdi-wifi',
          color: 'success',
          value: 'wifi_withs'
        },
        {
          name: '電源',
          icon: 'mdi-power-plug',
          color: 'success',
          value: 'power_withs'
        },
        {
          name: 'いいね',
          icon: 'mdi-heart',
          color: 'error',
          value: 'likes'
        },
        {
          name: 'コメント',
          icon: 'mdi-message',
          color: 'success',
          value: 'comments'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ filterQuery: 'spot/filterQuery' }),

    select: {
      get() {
        return this.filterQuery
      },
      set(newVal) {
        this.setFilterQuery(newVal)
      }
    },

    countSpot: function() {
      return function(value) {
        let count = this.spots.filter(item => {
          return item[value].length
        })
        return count.length
      }
    }
  },

  methods: {
    ...mapMutations({ setFilterQuery: 'spot/setFilterQuery' })
  }
}
</script>

<style scoped>
.select {
  max-width: 400px;
}
</style>
