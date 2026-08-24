const gate = document.querySelector('[data-simple-page-gate]')
if (gate) {
  const slug = gate.getAttribute('data-slug')
  const expectedHash = gate.getAttribute('data-password-hash')
  const form = gate.querySelector('form')
  const article = document.getElementById('simple-page-content')
  const error = gate.querySelector('[data-gate-error]')
  const storageKey = 'simple-page-unlock:' + slug

  const sha256Hex = async (text) => {
    const data = new TextEncoder().encode(text)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }

  const unlock = () => {
    gate.hidden = true
    if (article) article.hidden = false
  }

  if (window.localStorage.getItem(storageKey) === expectedHash) {
    unlock()
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const value = (form.password.value || '').trim()
    const hash = await sha256Hex(value)
    if (hash === expectedHash) {
      window.localStorage.setItem(storageKey, expectedHash)
      if (error) error.hidden = true
      unlock()
    } else if (error) {
      error.hidden = false
    }
  })
}
