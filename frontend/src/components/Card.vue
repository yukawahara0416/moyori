<template>
  <div>
    <h1>this is Card</h1>
    <v-row>
      <v-col v-for="(s, id) in spots" :key="id">
        <v-card
          hover
          :class="{ selected: cache.id === id }"
          :id="id"
          @click.stop="setCurrentMarker(s.marker, id)"
        >
          <v-row>
            <v-col>
              <v-img></v-img>
            </v-col>
            <v-col>
              <v-card-text>
                <p>{{ s.marker.name }}</p>
                <p>{{ s.marker.place_id }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn data-test="postspot" @click="postSpot(s, id)">
                  保存
                </v-btn>
                <like-button :spot="s" :id="id" />
                <wifi-with-button :spot="s" :id="id" />
                <wifi-without-button :spot="s" :id="id" />
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
import WifiWithButton from '@/components/WifiWithButton.vue'
import WifiWithoutButton from '@/components/WifiWithoutButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    LikeButton,
    WifiWithButton,
    WifiWithoutButton
  },

  computed: {
    ...mapGetters(['spots', 'cache'])
  },

  methods: {
    setCurrentMarker(marker, id) {
      this.$store.dispatch('setCurrentMarker', { marker: marker, id: id })
    },

    postSpot(spot, id) {
      this.$store.dispatch('postSpot', { spot: spot, id: id })
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
