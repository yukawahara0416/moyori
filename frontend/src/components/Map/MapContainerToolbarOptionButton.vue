<template>
  <v-menu offset-y open-on-hover :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-2" v-bind="attrs" v-on="on">
        <v-icon>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-switch color="success" v-model="filterQuery.likes"></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2">mdi-heart-outline</v-icon>
          いいね あり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch color="success" v-model="filterQuery.wifi_withs"></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2">mdi-wifi</v-icon>
          WiFiあり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            color="success"
            v-model="filterQuery.power_withs"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2">mdi-power-plug</v-icon>
          電源あり
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch color="success" v-model="filterQuery.comments"></v-switch>
        </v-list-item-action>
        <v-list-item-title>
          <v-icon class="mr-2">mdi-message-outline</v-icon>
          コメントあり
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
      }
    }
  }
}
</script>

<style></style>
