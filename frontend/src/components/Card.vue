<template>
  <div>
    <h1>this is Card</h1>
    <v-row>
      <v-col v-for="(m, id) in markers" :key="id">
        <v-card
          hover
          :class="{ selected: cache.id === id }"
          :id="id"
          @click.stop="setCurrentMarker(m, id)"
        >
          <v-row>
            <v-col>
              <v-img></v-img>
            </v-col>
            <v-col>
              <v-card-text>
                <p>{{ m.data.name }}</p>
                <p>{{ m.data.place_id }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn data-test="postmarker" @click="postMarker(m, id)">
                  保存
                </v-btn>
                <like-button :marker="m" :id="id" />
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeButton from '@/components/LikeButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    LikeButton
  },

  computed: {
    ...mapGetters(['markers', 'cache'])
  },

  methods: {
    setCurrentMarker(marker, id) {
      this.$store.dispatch('setCurrentMarker', { marker: marker, id: id })
    },

    postMarker(marker, id) {
      this.$store.dispatch('postMarker', { marker: marker, id: id })
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
