<template>
  <div>
    <h1>this is Card</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-row>
            <v-col>
              <v-img></v-img>
            </v-col>
            <v-col>
              <v-card-text></v-card-text>
              <v-card-actions></v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>
