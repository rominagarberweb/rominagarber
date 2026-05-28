const initSpeakingCarousel = (carousel) => {
  const hero = carousel.closest('.speaking-hero')
  const indicators = hero ? hero.querySelectorAll('.speaking-hero-indicator') : []

  if (!indicators.length) {
    return
  }

  const updateActiveIndicator = () => {
    const slideWidth = carousel.clientWidth || 1
    const maxIndex = indicators.length - 1
    const rawIndex = Math.round(carousel.scrollLeft / slideWidth)
    const activeIndex = Math.max(0, Math.min(rawIndex, maxIndex))

    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.setAttribute('aria-current', 'true')
      } else {
        indicator.removeAttribute('aria-current')
      }
    })
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const index = Number(indicator.dataset.slideIndex || 0)
      carousel.scrollTo({
        left: carousel.clientWidth * index,
        behavior: 'smooth'
      })
    })
  })

  carousel.addEventListener('scroll', updateActiveIndicator, { passive: true })
  window.addEventListener('resize', updateActiveIndicator)
  updateActiveIndicator()
}

const speakingCarousels = document.querySelectorAll('.speaking-hero-carousel')
speakingCarousels.forEach(initSpeakingCarousel)
