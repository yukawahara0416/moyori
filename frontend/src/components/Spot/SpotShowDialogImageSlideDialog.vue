<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <v-card
        class="d-flex mr-2"
        flat
        tile
        v-on="on"
        width="100px"
        @click="dialog = true"
      >
        <v-img aspect-ratio="1" :src="photo.getUrl()">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="success lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </template>

    <v-card class="pa-2">
      <v-img align="center" :src="photo.getUrl()"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    photo: Object
  },

  data() {
    return {
      dialog: false
    }
  }
}
</script>
