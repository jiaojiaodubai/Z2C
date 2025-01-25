const scrollToHash = (hash: string) => {
  // SSR: client only
  const element = document.getElementById(`heading-${hash}`)
  if (element) {
    const appBarHeight = (document.querySelector('#app-bar') as HTMLElement)!.offsetHeight
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    // card bottom margin mb-4 = 4 * 4px = 16px, card title padding = 8px
    const offsetPosition = elementPosition - appBarHeight - 24

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export {
  scrollToHash,
}
