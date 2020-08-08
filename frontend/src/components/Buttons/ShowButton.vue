<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          <v-icon class="mx-2">mdi-information-outline</v-icon>
          詳細
        </v-btn>
      </template>
      <v-card>
        <p>ppppp</p>
        <p>{{ spot }}</p>
        <p>{{ spot.marker.name }}</p>
        <p>{{ spot.marker.address }}</p>
        <p>{{ spot.marker.phone }}</p>
        <p>{{ spot.marker.website }}</p>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  data() {
    return {
      dialog: false
    }
  }
}
</script>
