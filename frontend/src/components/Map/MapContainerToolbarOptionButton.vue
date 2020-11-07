<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-2" v-bind="attrs" v-on="on">
        <v-icon v-if="isFiltered" color="success">mdi-filter-menu</v-icon>
        <v-icon v-else>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(filter, key) in filters" :key="key">
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery[filter.name]"
            @change="handleChangeQuery"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2" :color="filter.color">{{ filter.icon }}</v-icon>
          {{ filter.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      filterQuery: {
        likes: false,
        wifi_withs: false,
        power_withs: false,
        comments: false
      },

      filters: [
        {
          name: 'likes',
          icon: 'mdi-heart',
          color: 'error',
          text: 'いいね あり'
        },
        {
          name: 'wifi_withs',
          icon: 'mdi-wifi',
          color: 'success',
          text: 'WiFiあり'
        },
        {
          name: 'power_withs',
          icon: 'mdi-power-plug',
          color: 'success',
          text: '電源あり'
        },
        {
          name: 'comments',
          icon: 'mdi-message',
          color: 'success',
          text: 'コメントあり'
        }
      ]
    }
  },

  computed: {
    isFiltered() {
      let data = Object.values(this.filterQuery)
      data = data.filter(function(value) {
        return value === true
      })
      return data.length > 0 ? true : false
    }
  },

  methods: {
    handleChangeQuery() {
      this.$store.commit('spot/setFilterQuery', this.filterQuery)
    }
  }
}
</script>
