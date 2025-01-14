<template>
  <!-- https://vue-i18n.intlify.dev/guide/advanced/component#scope-resolving -->
  <i18n-t
    keypath="appBar.title"
    scope="global"
    tag="div"
    class="rich-text-title"
  >
    <template #Zotero>
      <span style="color: #D63340;">Zotero</span>
    </template>
    <template #CSL>
      <span style="color: #2D98E0">CSL</span>
    </template>
  </i18n-t>
</template>