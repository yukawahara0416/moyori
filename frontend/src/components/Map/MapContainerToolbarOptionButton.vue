<template>
  <v-menu open-on-hover offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-2" v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>いち</v-list-item>
      <v-list-item>に</v-list-item>
      <v-list-item>さん</v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {}
</script>

<style></style>
