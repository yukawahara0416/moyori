<template>
  <div>
    <gmap-marker
      v-for="(spot, id) in spots"
      :animation="4"
      :key="id"
      :icon="icon(spot)"
      :title="spot.data.name"
      :position="spot.data.position"
      :zIndex="spot.data.zIndex"
      @click="
        spotlight(spot.data.place_id)
        scroll(id)
      "
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spots: Array
  },

  data() {
    return {
      shopList: [
        { shop_name: 'スターバックス', file_name: 'starbucks' },
        { shop_name: 'タリーズ', file_name: 'tullys' },
        { shop_name: 'コメダ珈琲', file_name: 'komeda' },
        { shop_name: 'ドトール', file_name: 'doutor' },
        { shop_name: '上島珈琲', file_name: 'ueshima' },
        { shop_name: 'WIRED CAFE', file_name: 'wired-cafe' }
      ]
    }
  },

  computed: {
    ...mapGetters(['map']),

    // アイコンデータをvue-google-mapsが認識できるデータ形式に変更します
    icon: function() {
      return function(spot) {
        return {
          url: require(`@/assets/${this.iconFileName(spot)}.png`),
          scaledSize: new google.maps.Size(50, 50)
        }
      }
    },

    // マーカーアイコンのファイル名を条件によって変更します
    iconFileName: function() {
      return function(spot) {
        // 条件1/2：マーカーが選択状態の場合
        if (spot.data.on == true) return 'spotlight'

        // 選択されていない状態の通常のマーカーアイコン
        let fileName = 'cafe'

        // 条件2/2：this.shopListのショップ名に該当する場合
        for (let i = 0; i < this.shopList.length; i++) {
          if (spot.data.name.indexOf(this.shopList[i].shop_name) !== -1) {
            fileName = this.shopList[i].file_name
          }
        }

        return fileName
      }
    }
  },

  methods: {
    ...mapActions({ spotlight: 'spot/spotlight' }),

    // マーカーをクリックすると、マーカーが地図の中心になるよう移動します
    panTo(spot) {
      const position = new google.maps.LatLng(
        spot.data.position.lat,
        spot.data.position.lng
      )
      this.map.panTo(position)
    },

    // マーカーをクリックすると、対応するカードまで画面がスクロールします
    scroll(id) {
      var element = document.getElementById(id)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }
}
</script>
