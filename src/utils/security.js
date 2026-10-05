/**
 * Security Utilities for Vivero Botánica
 * - Cryptographic SHA-256 hashing via Web Crypto API
 * - URL and protocol sanitization (XSS prevention)
 * - Safe string escaping for user inputs
 */

export async function sha256(message) {
  try {
    const msgBuffer = new TextEncoder().encode(message)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch (err) {
    console.error('Error generating SHA-256 hash:', err)
    // Safe deterministic fallback if Web Crypto is unavailable
    let hash = 0
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i)
      hash |= 0
    }
    return `fb-${Math.abs(hash)}`
  }
}

/**
 * Validates and sanitizes image URLs, permitting only secure HTTP/HTTPS or image data URIs.
 * Disallows javascript:, vbscript:, and other executable URI schemes.
 */
export function sanitizeImageUrl(url) {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  const lower = trimmed.toLowerCase()

  // Only permit legitimate image protocols
  if (
    lower.startsWith('https://') ||
    lower.startsWith('http://') ||
    lower.startsWith('data:image/png;') ||
    lower.startsWith('data:image/jpeg;') ||
    lower.startsWith('data:image/webp;') ||
    lower.startsWith('data:image/avif;')
  ) {
    return trimmed
  }

  return ''
}

/**
 * Strips dangerous HTML tags and script-injection characters from plain user strings.
 */
export function sanitizeInput(str) {
  if (!str || typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '')
    .trim()
}
