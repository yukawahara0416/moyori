<template>
  <span>
    <v-select
      class="selecttest ma-2"
      label="ジャンル"
      v-model="select"
      :items="items"
      item-text="name"
      item-value="value"
      outlined
      dense
      return-object
    >
      <template slot="item" slot-scope="{ item }">
        <v-icon class="mr-2">
          {{ item.icon }}
        </v-icon>
        <span class="caption ma-0">
          {{ item.name }}
        </span>
      </template>
    </v-select>
  </span>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          name: 'カフェ',
          icon: 'mdi-coffee',
          value: 'cafe'
        },
        {
          name: 'レストラン',
          icon: 'mdi-food-fork-drink',
          value: 'restaurant'
        },
        {
          name: '図書館',
          icon: 'mdi-library',
          color: 'error',
          value: 'library'
        },
        {
          name: 'コンビニ',
          icon: 'mdi-shopping',
          value: 'convenience_store'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ type: 'spot/type' }),

    select: {
      get() {
        return this.type
      },
      set(newVal) {
        this.setType(newVal)
      }
    }
  },

  methods: {
    ...mapMutations({ setType: 'spot/setType' })
  }
}
</script>

<style scoped>
.selecttest {
  max-width: 150px;
}
</style>
