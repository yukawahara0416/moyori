<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-2" v-bind="attrs" v-on="on">
        <v-icon v-if="isFiltered" color="success">mdi-filter-menu</v-icon>
        <v-icon v-if="!isFiltered">mdi-filter-menu-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery.likes"
            @change="handleChangeQuery"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2" color="error">mdi-heart</v-icon>
          いいね あり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery.wifi_withs"
            @change="handleChangeQuery"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2" color="success">mdi-wifi</v-icon>
          WiFiあり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery.power_withs"
            @change="handleChangeQuery"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2" color="success">mdi-power-plug</v-icon>
          電源あり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery.comments"
            @change="handleChangeQuery"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2" color="success">mdi-message</v-icon>
          コメントあり
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      filterQuery: {
        likes: false,
        wifi_withs: false,
        power_withs: false,
        comments: false
      }
    }
  },

  computed: {
    ...mapGetters(['filterSpots']),

    isFiltered() {
      let data = Object.values(this.filterQuery)
      data = data.filter(function(value) {
        return value === true
      })
      return data.length > 0 ? true : false
    }
  },

  methods: {
    ...mapMutations({ setFilterQuery: 'spot/setFilterQuery' }),

    handleChangeQuery() {
      this.setFilterQuery(this.filterQuery)
    }
  }
}
</script>

<style></style>
