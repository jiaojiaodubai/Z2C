export default {
  title: 'Zotero 到 CSL 的映射',
  view: {
    itemType: '条目类型',
    field: 'Zotero 字段',
    variable: 'CSL 变量'
  },
  locale: {
    en: '英文',
    zhHans: '中文（简体）'
  },
  appBar: {
    title: '{Zotero} 到 {CSL} 的映射',
    tooltip: {
      viewSwitcher: '查看方式',
      localeSwitcher: '选择语言区域',
      themeSwitcher: '切换主题',
      tocSwitcher: {
        expand: '展开目录',
        collapse: '收起目录'
      }
    }
  },
  toc: {
    title: '目录'
  },
  header: {
    zoteroItemType: 'Zotero 条目类型',
    zoteroField: 'Zotero 字段',
    zoteroTerm: 'Zotero 术语',
    cslVariable: 'CSL 变量',
    cslTerm: 'CSL 类型/变量',
    ui: 'UI 标签',
    type: '类型'
  },
  footer: '依据 {schema} 构建于 {time}',
  redrecting: '正在重定向至{view}视图……',
  dialogs: {
    confirm: "确认",
    cancel: "取消",
    itemType: {
      title: '过滤条目类型',
      showAllTypes: '显示所有条目类型',
      hideZoteroSpecificTypes: '隐藏 Zotero 特有的条目类型',
      showCommonTypesOnly: '仅显示常用条目类型',
      manuallySelect: '手动选择',
      selectedItemTypes: '已选条目类型',
    },
    field: {
      title: '过滤字段',
      showAllFields: '显示所有字段',
      hideCommonFields: '隐藏常用字段'
    },
    variable: {
      title: '过滤 CSL 变量'
    }
  },
  variable: {
    heaing: {
      text: '文本变量',
      number: '数字变量',
      date: '日期变量',
      name: '姓名变量',
    }
  },
  wordBox: {
    snackBar: {
      copied: '已复制到剪贴板'
    }
  }
}