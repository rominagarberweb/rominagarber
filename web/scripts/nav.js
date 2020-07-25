const body = document.querySelector('body')
const nav = document.querySelector('.nav-mobile')
const navToggle = document.querySelector('.nav-toggle')
let isNavOpen = false

const open = () => {
  isNavOpen = true
  navToggle.classList.add('active')
  navToggle.focus()
  nav.classList.add('active')
  nav.setAttribute('aria-hidden', false)
  document.querySelector('body').classList.add('scroll-lock')
}

const close = () => {
  isNavOpen = false
  navToggle.classList.remove('active')
  nav.classList.remove('active')
  nav.setAttribute('aria-hidden', true)
  document.querySelector('body').classList.remove('scroll-lock')
}

const toggleNav = e => {
    if (!isNavOpen) {
      open()
    } else {
      close()
    }
}

const escClose = e => {
  if (e.key === 'Escape') {
    close()
  }
}

navToggle.addEventListener('click', toggleNav)
document.addEventListener('keydown', escClose)
