import { describe, expect, it } from 'vitest'
import { pages } from '#constants/pages'

describe('pages constants', () => {
  it('matches the route name snapshot', () => {
    expect(pages).toMatchSnapshot()
  })
})
