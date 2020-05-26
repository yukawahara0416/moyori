<template>
  <div>
    <h1>this is Card</h1>
    <v-row>
      <v-col>
        <v-card v-for="(m, id) in markers" :key="id">
          <v-row>
            <v-col>
              <v-img></v-img>
            </v-col>
            <v-col>
              <v-card-text>
                <p>{{ m.name }}</p>
                <p>{{ m.place_id }}</p>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['markers'])
  }
}
</script>
