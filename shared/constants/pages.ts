export const pages = {
  index: 'index',
  chords: 'chords',
  expansions: 'expansions',
  settings: 'settings'
} as const

export type Page = keyof typeof pages
