export default {
  title: 'Zotero to CSL Mappings',
  view: {
    itemType: 'Item Types',
    field: 'Zotero Fields',
    variable: 'CSL Variables'
  },
  locale: {
    en: 'English',
    zhHans: 'Chinese (Simplified)'
  },
  appBar: {
    title: '{Zotero} to {CSL} Mappings',
    tooltip: {
      viewSwitcher: 'View As',
      localeSwitcher: 'Choose Locale',
      themeSwitcher: 'Switch Theme',
      tocSwitcher: {
        expand: 'Expand Table of Contents',
        collapse: 'Collapse Table of Contents'
      }
    }
  },
  toc: {
    title: 'Table of Contents'
  },
  header: {
    zoteroItemType: 'Zotero Item Type',
    zoteroField: 'Zotero Field',
    zoteroTerm: 'Zotero Term',
    csl: 'CSL Type/Variable',
    ui: 'UI Label',
    type: 'Type'
  },
  footer: 'Built based on {schema} at {time}',
  redrecting: 'Redirecting to {view} ...',
  dialogs: {
    confirm: "Confirm",
    cancel: "Cancel",
    itemType: {
      title: 'Filter Item Types',
      showAllTypes: 'Show All Item Types',
      hideZoteroSpecificTypes: 'Hide Zotero-specific Item Types',
      showCommonTypesOnly: 'Show Common Types Only',
      manuallySelect: 'Manualy Select',
      selectedItemTypes: 'Selected Item Types',
    },
    field: {
      title: 'Filter Fields',
      showAllFields: 'Show All Fields',
      hideCommonFields: 'Hide Common Fields',
    },
    variable: {
      title: 'Filter CSL Variables',
    }
  },
  variable: {
    heaing: {
      text: 'Text Variables',
      number: 'Number Variables',
      date: 'Date Variables',
      name: 'Name Variables',
    }
  },
  wordBox: {
    snackBar: {
      copied: 'Copied to clipboard'
    }
  }
}