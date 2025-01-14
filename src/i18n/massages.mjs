import * as vuetifyMsgs from 'vuetify/locale'
const moulds = import.meta.glob('./schemas/*.js')

const messages = {}

for (const path in moulds) {
  const customMsg = await moulds[path]()
  const locale = path.match(/\.\/schemas\/(.*)\.js$/)[1]
  const vuetifyMsg = vuetifyMsgs[locale in vuetifyMsgs ? locale : 'en']
  messages[locale] = {
    $vuetify: vuetifyMsg,
    ...customMsg.default,
  }
}

export default messages