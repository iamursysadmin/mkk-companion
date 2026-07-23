import {
  BlobSource,
  BufferSource,
  BufferTarget,
  canEncodeAudio,
  Conversion,
  Input,
  MP3,
  OggOutputFormat,
  Output,
  WAVE,
  type Quality
} from 'mediabunny'

/**
 * Sample rate used by Maschine / Komplete Kontrol sound previews
 * (and the default in bitwig-nks-preview-generator).
 */
export const PREVIEW_SAMPLE_RATE = 44_100

/**
 * Target bitrate approximating OGG Vorbis quality ~5–6 on the 0–10 scale
 * (~160–192 kbps). bitwig-nks-preview-generator defaults to quality 6.
 */
export const PREVIEW_BITRATE = 192_000

export type PreviewOggSource = Blob | ArrayBuffer | ArrayBufferView

export type ConvertToPreviewOggOptions = {
  /** 0–1 conversion progress callback. */
  onProgress?: (progress: number) => void
  /**
   * Audio bitrate in bits per second, or a Mediabunny {@link Quality}.
   * Defaults to {@link PREVIEW_BITRATE}.
   */
  bitrate?: number | Quality
  /** Abort an in-flight conversion. */
  signal?: AbortSignal
}

/**
 * @example
 * ```ts
 * const ogg = await convertToPreviewOgg(file, {
 *   onProgress: (p) => console.log(Math.round(p * 100)),
 * })
 * ```
 */
export async function convertToPreviewOgg(
  source: PreviewOggSource,
  options: ConvertToPreviewOggOptions = {}
): Promise<Uint8Array> {
  const { onProgress, bitrate = PREVIEW_BITRATE, signal } = options

  if (!(await canEncodeAudio('vorbis'))) {
    throw new Error(
      'Vorbis encoding is not available. Call ensureMediabunnyServer() in the Electron main process (or Vitest setup) before converting previews.'
    )
  }

  using input = new Input({
    source: toInputSource(source),
    formats: [WAVE, MP3]
  })

  const output = new Output({
    format: new OggOutputFormat(),
    target: new BufferTarget()
  })

  const conversion = await Conversion.init({
    input,
    output,
    video: { discard: true },
    audio: {
      codec: 'vorbis',
      sampleRate: PREVIEW_SAMPLE_RATE,
      bitrate,
      forceTranscode: true
    },
    tracks: 'primary'
  })

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .map((t) => `${t.track.type}: ${t.reason}`)
      .join('; ')
    throw new Error(
      reasons
        ? `Cannot convert to preview OGG — ${reasons}`
        : 'Cannot convert to preview OGG — no valid audio track.'
    )
  }

  if (onProgress) {
    conversion.onProgress = onProgress
  }

  const onAbort = () => {
    void conversion.cancel()
  }
  signal?.addEventListener('abort', onAbort, { once: true })

  try {
    if (signal?.aborted) {
      await conversion.cancel()
      throw signal.reason instanceof Error
        ? signal.reason
        : new Error('Preview conversion aborted.')
    }

    await conversion.execute()
  } finally {
    signal?.removeEventListener('abort', onAbort)
  }

  const buffer = output.target.buffer
  if (!buffer) {
    throw new Error('Preview conversion produced no output.')
  }

  return new Uint8Array(buffer)
}

function toInputSource(source: PreviewOggSource) {
  if (source instanceof Blob) {
    return new BlobSource(source)
  }

  if (source instanceof ArrayBuffer) {
    return new BufferSource(source)
  }

  return new BufferSource(
    source.buffer.slice(
      source.byteOffset,
      source.byteOffset + source.byteLength
    )
  )
}
