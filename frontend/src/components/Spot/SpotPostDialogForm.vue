<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      <v-toolbar-title>スポットを新規作成</v-toolbar-title>
    </v-toolbar>

    <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
      <v-card-text>
        <v-form>
          <ValidationProvider
            v-slot="{ errors, valid }"
            name="スポット名"
            rules="required|max:40"
          >
            <v-text-field
              autofocus
              label="スポット名*"
              name="name"
              prepend-icon="mdi-coffee"
              type="text"
              v-model="spotFormData.name"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="住所"
            rules="required|max:200"
          >
            <v-text-field
              label="住所*（クリックした座標から候補を表示しています）"
              name="address"
              prepend-icon="mdi-home-circle-outline"
              type="text"
              v-model="spotFormData.address"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="電話番号"
            rules="phone"
          >
            <v-text-field
              label="電話番号（例：09012345678/090-1234-5678）"
              name="phone"
              prepend-icon="mdi-phone-outline"
              type="phone"
              v-model="spotFormData.phone"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="url"
            rules="url|max:100"
          >
            <v-text-field
              label="URL（例：http://example.com/）"
              name="url"
              prepend-icon="mdi-web"
              type="text"
              v-model="spotFormData.url"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors, valid }"
            name="画像"
            rules="image"
          >
            <v-file-input
              chips
              counter
              label="画像"
              name="picture"
              prepend-icon="mdi-camera"
              show-size
              v-model="spotFormData.picture"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />

        <v-btn class="mb-3 px-10" large @click="cancelPostSpot()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          @click="postSpot()"
          :disabled="invalid"
        >
          スポットを登録する
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ spotFormData: 'post/spotFormData' }),

    formData() {
      const formData = new FormData()
      formData.append('spot[address]', this.spotFormData.address)
      formData.append('spot[name]', this.spotFormData.name)
      if (this.spotFormData.picture !== null)
        formData.append('spot[picture]', this.spotFormData.picture)
      formData.append('spot[place_id]', this.spotFormData.place_id)
      if (this.spotFormData.phone !== null)
        formData.append('spot[phone]', this.spotFormData.phone)
      formData.append('spot[lat]', this.spotFormData.lat)
      formData.append('spot[lng]', this.spotFormData.lng)
      if (this.spotFormData.url !== null)
        formData.append('spot[url]', this.spotFormData.url)

      return formData
    }
  },

  methods: {
    postSpot() {
      this.$store.dispatch('post/postSpot', this.formData)
    },

    cancelPostSpot() {
      this.$store.dispatch('dialogOff', 'dialogSpotCreate')
      this.$store.commit('post/clearSpotFormData')
      this.$store.dispatch('pushSnackbar', {
        message: 'スポットの登録をキャンセルしました',
        color: 'success'
      })
    }
  }
}
</script>

<style></style>
