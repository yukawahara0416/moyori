<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      <v-toolbar-title>スポットを編集</v-toolbar-title>
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
              label="スポット名*"
              name="name"
              prepend-icon="mdi-coffee"
              type="text"
              v-model="spot.data.name"
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
              label="住所*"
              name="address"
              prepend-icon="mdi-home-circle-outline"
              type="text"
              v-model="spot.data.address"
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
              v-model="spot.data.phone"
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
              v-model="spot.data.url"
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
              v-model="picture"
              :clearable="true"
              :error-messages="errors"
              :success="valid"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn class="mb-3 px-10" large @click.stop="cancelEditSpot()">
          キャンセル
        </v-btn>

        <v-spacer />

        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          @click="editSpot()"
          :disabled="invalid"
        >
          スポットを編集する
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  data() {
    return {
      picture: null
    }
  },

  methods: {
    editSpot() {
      this.$store.dispatch('post/editSpot', {
        spot: this.spot,
        picture: this.picture
      })
    },

    cancelEditSpot() {
      this.$store.dispatch('dialogOff', 'dialogSpotEdit')
      this.$store.dispatch('post/clearSpotFormData')
      this.$store.dispatch('pushSnackbar', {
        message: 'スポットの編集をキャンセルしました',
        color: 'success'
      })
    }
  }
}
</script>

<style></style>
