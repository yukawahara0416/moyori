<template>
  <v-card>
    <v-carousel
      height="400"
      hide-delimiter-background
      :show-arrows="false"
      :continuous="false"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="slide.color" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
              <v-img :src="slide.image" max-height="300" contain />
            </v-col>
            <v-col :cols="cols">
              <div class="headline mx-5 mb-3">{{ slide.title }}</div>
              <div class="mx-5">{{ slide.content }}</div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="dialogOff('dialogTutorial')">スキップ</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      slides: [
        {
          title: '集中できるスポットをシェアしよう！',
          content:
            '外出中に「近くにWi-Fiがあって充電もできるカフェがないかな？」と困ったことはありませんか？MoYoRiならすぐに見つけられます。',
          image: require('@/assets/cafe_nomad_man.png'),
          color: 'indigo'
        },
        {
          title: 'スポットに投票しよう！',
          content:
            '「Wifiサービスのあり／なし」「電源サービスのあり／なし」をワンクリックで投票することが出来ます。（＊ユーザ登録が必要です）',
          image: require('@/assets/card_sample.png'),
          color: 'pink darken-2'
        },
        {
          title: 'スポットを投稿しよう！',
          content:
            'マップをクリックするだけで、新しいスポットを投稿することができます。（＊ユーザ登録が必要です）',
          image: require('@/assets/click_sample.png'),
          color: 'red lighten-1'
        }
      ]
    }
  },

  computed: {
    cols() {
      if (this.$vuetify.breakpoint.xsOnly) return 12
      return 6
    }
  },

  methods: {
    ...mapMutations(['dialogOff'])
  }
}
</script>
