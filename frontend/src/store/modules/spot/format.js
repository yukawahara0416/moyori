export default {
  namespaced: true,
  actions: {
    newSpotFormat(context, res) {
      return new Promise(resolve => {
        var address = 'vicinity' in res ? res.vicinity : null

        var image =
          'photos' in res
            ? res.photos[0].getUrl({ maxWidth: 320 })
            : require('@/assets/noimage.png')

        var name = 'name' in res ? res.name : null

        var place_id = 'place_id' in res ? res.place_id : null

        var phone = 'phone' in res ? res.phone : null

        var position =
          'geometry' in res
            ? {
                lat: res.geometry.location.lat(),
                lng: res.geometry.location.lng()
              }
            : {
                lat: null,
                lng: null
              }

        var formatted = {
          marker: {
            address: address,
            image: image,
            name: name,
            on: false,
            phone: phone,
            place_id: place_id,
            position: position,
            zIndex: 10
          },
          detail: {},
          data: {},
          likes: [],
          wifi_withs: [],
          wifi_withouts: [],
          power_withs: [],
          power_withouts: [],
          comments: []
        }

        resolve(formatted)
      })
    },

    postedSpotFormat(context, res) {
      return new Promise(resolve => {
        var formatted = {
          data: res.data,
          picture: res.picture,
          marker: {
            address: res.marker.address,
            name: res.marker.name,
            on: res.marker.on,
            place_id: res.marker.place_id,
            phone: res.marker.phone,
            position: {
              lat: parseFloat(res.marker.position.lat),
              lng: parseFloat(res.marker.position.lng)
            },
            zIndex: res.marker.zIndex
          },
          detail: {},
          likes: res.likes,
          wifi_withs: res.wifi_withs,
          wifi_withouts: res.wifi_withouts,
          power_withs: res.power_withs,
          power_withouts: res.power_withouts,
          comments: res.comments
        }
        resolve(formatted)
      })
    }
  }
}
