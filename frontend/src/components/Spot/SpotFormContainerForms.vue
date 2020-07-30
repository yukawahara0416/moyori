<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="flex-direction: column;">
      <v-col>
        <v-card class="mx-5">
          <v-toolbar class="white--text" color="primary" dense flat>
            <v-toolbar-title>スポットを新規作成</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                label="スポット名"
                name="name"
                prepend-icon="mdi-coffee"
                type="text"
                v-model="spotFormData.name"
                :clearable="true"
              />

              <v-text-field
                label="住所（クリックした座標から候補を表示しています）"
                name="address"
                prepend-icon="mdi-home-circle-outline"
                type="text"
                v-model="spotFormData.address"
                :clearable="true"
              />

              <v-text-field
                label="イメージ"
                name="image"
                prepend-icon="mdi-map-marker-outline"
                type="text"
                v-model="spotFormData.image"
                :clearable="true"
              />

              <v-text-field
                label="URL"
                name="url"
                prepend-icon="mdi-web"
                type="text"
                v-model="spotFormData.url"
                :clearable="true"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-3 px-10"
              color="primary"
              large
              type="submit"
              @click="postSpot()"
            >
              スポットを登録する
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ spotFormData: 'post/spotFormData' })
  },

  methods: {
    postSpot() {
      this.$store.dispatch('post/postSpot', this.spotFormData)
    }
  }
}
</script>

<style></style>
