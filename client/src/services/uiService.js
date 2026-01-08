const API_URL = 'http://localhost:8000/api/ui'
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY
const VITE_ENCRYPED_FAILED_KEY = import.meta.env.VITE_ENCRYPED_FAILED_KEY

const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function getKey() {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(ENCRYPTION_KEY),
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  )
}

function hexToUint8Array(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(b => parseInt(b, 16)))
}
async function decryptData(data) {
  try {
    const key = await getKey()
    const iv = hexToUint8Array(data.iv)
    const encrypted = hexToUint8Array(data.data)

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      encrypted
    )

    return JSON.parse(decoder.decode(decrypted))
  } catch {
    window.location.href = `'/failed=?auth'${VITE_ENCRYPED_FAILED_KEY}`
    throw new Error('Decryption failed')
  }
}
async function fetchData(endpoint) {
  const res = await fetch(`${API_URL}/${endpoint}`)
  const data = await res.json()
  return decryptData(data)
}

export const getDashboard = () => fetchData('dashboard')
export const getAnalytics = () => fetchData('analytics')
export const getUsers = () => fetchData('users')
export const getSettings = () => fetchData('settings')
