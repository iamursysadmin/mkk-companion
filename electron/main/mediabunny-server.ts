import { registerMediabunnyServer } from '@mediabunny/server'

let registered = false

/**
 * @example
 * ```ts
 * ensureMediabunnyServer()
 * ```
 */
export function ensureMediabunnyServer() {
  if (registered) return
  registerMediabunnyServer()
  registered = true
}
