<template>
  <v-row
    align="stretch"
    class="ma-0"
    justify="space-around"
    style="background-color: white;"
  >
    <v-col
      class="mt-2"
      cols="12"
      sm="6"
      lg="4"
      v-for="(s, id) in spots"
      :key="id"
    >
      <v-card
        class="mt-2 d-flex flex-column"
        height="100%"
        hover
        :class="{ selected: cache.id === id }"
        :id="id"
        @click.stop="setCurrentMarker(s.marker, id)"
      >
        <v-row class="pa-0">
          <v-col class="py-0" cols="5" md="12">
            <v-img
              class="white--text align-end"
              :class="{
                imgHeight_big: $vuetify.breakpoint.mdAndUp,
                imgHeight_small: $vuetify.breakpoint.smAndDown
              }"
              :src="
                s.marker.photos
                  ? s.marker.photos[0].getUrl()
                  : require('@/assets/noimage.png')
              "
            />
            <!-- :src="s.marker.photos[0].getUrl()" -->
          </v-col>

          <v-col class="py-0" cols="7" md="12">
            <v-card-text class="text--primary">
              <p>{{ s.marker.name }}</p>
              <p>{{ s.marker.address }}</p>
              <p>{{ s.marker.phone }}</p>
              <p>{{ s.marker.website }}</p>
              <!-- <p>
                <a
                  :href="
                    'https://www.google.com/maps/dir/?api=1&destination=' +
                      s.marker.position.lat +
                      ',' +
                      s.marker.position.lng
                  "
                  target="_brank"
                >
                  Googleマップでナビ
                </a>
              </p>
              <p>
                <a
                  :href="
                    'https://www.google.com/maps/search/?api=1&query=' +
                      s.marker.position.lat +
                      ',' +
                      s.marker.position.lng +
                      '&query_place_id=' +
                      s.marker.place_id
                  "
                  target="_brank"
                >
                  Googleマップで詳細を表示
                </a>
              </p> -->
            </v-card-text>
            <v-card-actions>
              <like-button :spot="s" :id="id" />
              <wifi-with-button :spot="s" :id="id" />
              <wifi-without-button :spot="s" :id="id" />
              <power-with-button :spot="s" :id="id" />
              <power-without-button :spot="s" :id="id" />
              <!-- <comment-form :spot="s" :id="id" /> -->
              <comment-button :spot="s" :id="id" />
              <spot-form :spot="s" :id="id" />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <!-- カード配置対策（中央寄せ && 最下層端数左寄せ） -->
    <v-col
      class="ma-0 pa-0"
      cols="12"
      sm="6"
      lg="4"
      v-for="empty in empties"
      :key="empty"
    >
      <v-card class="flex-empty" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeButton from '@/components/LikeButton.vue'
import WifiWithButton from '@/components/WifiWithButton.vue'
import WifiWithoutButton from '@/components/WifiWithoutButton.vue'
import PowerWithButton from '@/components/PowerWithButton.vue'
import PowerWithoutButton from '@/components/PowerWithoutButton.vue'
// import CommentForm from '@/components/CommentForm.vue'
import CommentButton from '@/components/CommentButton.vue'
import SpotForm from '@/components/SpotForm.vue'

export default {
  components: {
    LikeButton,
    WifiWithButton,
    WifiWithoutButton,
    PowerWithButton,
    PowerWithoutButton,
    // CommentForm,
    CommentButton,
    SpotForm
  },

  computed: {
    ...mapGetters(['spots', 'cache']),

    // photoUrl(marker) {
    //   console.log(marker)
    //   if (marker.photos[0]) {
    //     return marker.photos[0].getUrl()
    //   } else {
    //     return require('@/assets/noimage.png')
    //   }
    // },

    empties() {
      return Array.from(new Array(this.spots.length))
    }
  },

  methods: {
    setCurrentMarker(marker, id) {
      this.$store.dispatch('setCurrentMarker', { marker: marker, id: id })
    }
  }
}
</script>

<style scoped>
.flex-empty {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  width: 230px !important;
}
.imgHeight_big {
  height: 150px !important;
}
.imgHeight_small {
  height: 100% !important;
}
.selected {
  background-color: #b3e5fc !important;
}
</style>
