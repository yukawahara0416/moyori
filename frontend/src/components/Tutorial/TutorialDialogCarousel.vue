<template>
  <v-card>
    <v-carousel height="400" hide-delimiter-background :continuous="false">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="6">
              <v-img :src="slide.image" max-height="300" contain />
            </v-col>
            <v-col cols="6">
              <div class="display-3">{{ slide.text }} Slide</div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="closeDialog()">スキップ</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  },

  methods: {
    ...mapMutations(['dialogOff'])
  }
}
</script>
