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
                <v-btn data-test="deletespot" @click="deleteSpot(s, id)">
                  削除
                </v-btn>
                <v-btn data-test="updatespot" @click="updateSpot(s, id)">
                  更新
                </v-btn>
                <like-button :spot="s" :id="id" />
                <wifi-with-button :spot="s" :id="id" />
                <wifi-without-button :spot="s" :id="id" />
                <power-with-button :spot="s" :id="id" />
                <power-without-button :spot="s" :id="id" />
                <comment-form :spot="s" :id="id" />
                <spot-form :spot="s" :id="id" />
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
import PowerWithButton from '@/components/PowerWithButton.vue'
import PowerWithoutButton from '@/components/PowerWithoutButton.vue'
import CommentForm from '@/components/CommentForm.vue'
import SpotForm from '@/components/SpotForm.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    LikeButton,
    WifiWithButton,
    WifiWithoutButton,
    PowerWithButton,
    PowerWithoutButton,
    CommentForm,
    SpotForm
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
    },

    updateSpot(spot, id) {
      var params = {
        name: 'hohohoge'
      }
      console.log(spot)
      console.log(id)
      this.$store.dispatch('updateSpot', { spot: spot, id: id, params: params })
    },

    deleteSpot(spot, id) {
      this.$store.dispatch('deleteSpot', { spot: spot, id: id })
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #b3e5fc !important;
}
</style>
