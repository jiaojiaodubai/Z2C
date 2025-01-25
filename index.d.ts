type TermType = 'itemType' | 'field' | 'creatorType'

type CslVariableType = 'text' | 'number' | 'date' | 'name'

type BasicTableHeader = {
  title: string | globalThis.ComputedRef<string>
  key: string
  value: string
}

type TableRow = {
  zoteroItemType?: string | string[]
  zoteroField?: string | string[]
  zoteroCreatorType?: string | string[]
  zoteroTerm?: string
  cslType?: string
  cslVariable?: string
  cslTerm?: string
  ui?: string | string[] | globalThis.ComputedRef<string> | globalThis.Ref<string>[]
  type?: TermType
}

type HeaderKey = keyof TableRow

type CardHeading = {
  text: string | globalThis.ComputedRef<string>
  value: string
}

type ItemTypeRow = {
  zoteroTerm: string
  cslTerm: string
  type: 'itemType' | 'field' | 'creatorType'
  ui: globalThis.ComputedRef<string>
}

type FieldRow = {
  zoteroItemType: string
  cslType: string
  ui: globalThis.ComputedRef<string>
}

type VariableRow = {
  cslVariable: string
  zoteroField: string | string[]
  ui: string | globalThis.Ref<string>[]
}

type StringValObject = {
  [key: string]: string
}

type StringsValObject = {
  [key: string]: string[]
}
