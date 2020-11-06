<template>
  <span>
    <v-card class="d-flex mr-2" flat tile width="100px" @click="openDialog()">
      <v-img aspect-ratio="1" :src="photo">
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

    <v-dialog v-model="dialog" width="600">
      <v-card class="pa-2">
        <v-img align="center" :src="photo"></v-img>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    photo: String
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    }
  }
}
</script>
