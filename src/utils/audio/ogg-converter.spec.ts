import '@/utils/audio/vitest.setup'

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { BufferSource, Input, OGG } from 'mediabunny'
import { dirname, join } from 'pathe'
import { describe, expect, it } from 'vitest'
import {
  convertToPreviewOgg,
  PREVIEW_SAMPLE_RATE
} from '@/utils/audio/ogg-converter'

const fixtures = join(dirname(fileURLToPath(import.meta.url)), '__fixtures__')

describe('convertToPreviewOgg', () => {
  it('converts wav to a 44.1 kHz ogg vorbis preview', async () => {
    const wav = await readFile(join(fixtures, 'preview.wav'))
    const ogg = await convertToPreviewOgg(wav)

    expect(ogg.byteLength).toBeGreaterThan(0)
    expect(String.fromCharCode(ogg[0], ogg[1], ogg[2], ogg[3])).toBe('OggS')

    using input = new Input({
      source: new BufferSource(ogg),
      formats: [OGG]
    })

    const track = await input.getPrimaryAudioTrack()
    expect(track).not.toBeNull()
    expect(await track!.getCodec()).toBe('vorbis')
    expect(await track!.getSampleRate()).toBe(PREVIEW_SAMPLE_RATE)
  })
})
