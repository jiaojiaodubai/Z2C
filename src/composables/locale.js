import data from '@/data/schema.json'

function getISOLocale(locale) {
  if (locale === 'zhHans') {
    return 'zh-CN'
  }
  else if (locale === 'zhHant') {
    return 'zh-TW'
  }
  for (const key in data.locales) {
    if (key.startsWith(locale)) {
      return key
    }
  }
  return 'en'
}

export function toUILabel(locale, value, type) {
  switch (type) {
  case 'itemType':
    return data.locales[getISOLocale(locale)].itemTypes[value]
  case 'field':
    return data.locales[getISOLocale(locale)].fields[value]
  case 'creatorType':
    return data.locales[getISOLocale(locale)].creatorTypes[value]
  default:
    return ''
  }
}