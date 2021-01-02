import Vue from 'vue'
import {
  localize,
  extend,
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'
import { PhoneNumberUtil } from 'google-libphonenumber'

let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule] // eslint-disable-line
  })
}

extend('url', value => {
  return (
    /* eslint-disable no-useless-escape */
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
      value
    ) || 'フォーマットが正しくありません'
    /* eslint-enable no-useless-escape */
  )
})

extend('phone', {
  message: 'フォーマットが正しくありません',
  validate(value) {
    const util = PhoneNumberUtil.getInstance()
    try {
      const phoneNumber = util.parseAndKeepRawInput(value, 'JP')
      return util.isValidNumber(phoneNumber)
    } catch (err) {
      return false
    }
  }
})

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
