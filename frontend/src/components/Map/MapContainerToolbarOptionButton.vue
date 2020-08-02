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
          <v-switch v-model="like" color="success"></v-switch>
        </v-list-item-action>
        <v-list-item-title>いいねあり</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="wifi" color="success"></v-switch>
        </v-list-item-action>
        <v-list-item-title>WiFiあり</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="power" color="success"></v-switch>
        </v-list-item-action>
        <v-list-item-title>電源あり</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="comment" color="success"></v-switch>
        </v-list-item-action>
        <v-list-item-title>コメントあり</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      like: false,
      wifi: false,
      power: false,
      comment: false
    }
  }
}
</script>

<style></style>
