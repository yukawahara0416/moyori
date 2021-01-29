import merge from 'lodash/merge'

/**
 * import { Spot } from '@/class/Spot.js'
 * const options = { marker: { on: true }, likes: [{ a: 1 }] }
 * const a = new Spot(options)
 */

export class Spot {
  constructor(value = {}) {
    this.data = valueMerge(value, 'data')
    this.likes = valueMerge(value, 'likes')
    this.wifi_withs = valueMerge(value, 'wifi_withs')
    this.wifi_withouts = valueMerge(value, 'wifi_withouts')
    this.power_withs = valueMerge(value, 'power_withs')
    this.power_withouts = valueMerge(value, 'power_withouts')
    this.comments = valueMerge(value, 'comments')
  }
  hasLikes() {
    return this.likes.length > 0
  }
  hasWifiWiths() {
    return this.wifi_withs.length > 0
  }
  hasWifiWithouts() {
    return this.wifi_withouts.length > 0
  }
  hasPowerWiths() {
    return this.power_withs.length > 0
  }
  hasPowerWithouts() {
    return this.power_withouts.length > 0
  }
  hasComments() {
    return this.comments.length > 0
  }
  isPosted() {
    return this.data.id !== null
  }
  isGmapSpot() {
    return this.data.place_id.length > 10 ? true : false
  }
  hasYourVote(target, user_id) {
    if (this[target].length === 0) return []

    return this[target].filter(item => {
      return item.user_id == user_id
    })
  }
}

Spot.default = {
  data: {
    id: null,
    user_id: null,
    place_id: null,
    name: null,
    address: null,
    position: {
      lat: null,
      lng: null
    },
    on: false,
    zIndex: 10,
    phone: null,
    url: null,
    image: null,
    photos: null,
    photo_url: null,
    opening_hours: null
  },
  likes: [],
  wifi_withs: [],
  wifi_withouts: [],
  power_withs: [],
  power_withouts: [],
  comments: []
}

function valueMerge(value, target) {
  const keyword = [
    'likes',
    'wifi_withs',
    'wifi_withouts',
    'power_withs',
    'power_withouts',
    'comments'
  ]
  const type = keyword.includes(target) ? [] : {}
  return merge(type, Spot.default[target], value[target])
}
