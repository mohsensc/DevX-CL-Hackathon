import type { MaskPainter } from './GlyphField'

const loadedImages = new Map<string, Promise<HTMLImageElement>>()

function loadImage(source: string) {
  if (!loadedImages.has(source)) {
    loadedImages.set(
      source,
      new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = source
      }),
    )
  }
  return loadedImages.get(source)!
}

export const paintDevxCross: MaskPainter = async (context, width, height) => {
  const image = await loadImage('/brand/devx-x.png')
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(image, width - drawWidth, (height - drawHeight) / 2, drawWidth, drawHeight)
}

const boldStrokeShifts = [-0.5, 0.5]

export const paintDevxCrossBold: MaskPainter = async (context, width, height) => {
  for (const shift of boldStrokeShifts) {
    context.save()
    context.translate(shift, 0)
    await paintDevxCross(context, width, height)
    context.restore()
  }
}

export const paintSmiley: MaskPainter = (context, width, height) => {
  const side = Math.min(width, height) * 0.96
  context.save()
  context.translate((width - side) / 2, (height - side) / 2)
  context.scale(side / 100, side / 100)
  context.fillStyle = '#000'
  context.beginPath()
  context.arc(50, 50, 50, 0, Math.PI * 2)
  context.fill()

  context.globalCompositeOperation = 'destination-out'
  for (const eyeX of [57, 70]) {
    context.beginPath()
    context.arc(eyeX, 34, 6.5, 0, Math.PI * 2)
    context.fill()
  }
  context.lineWidth = 7
  context.lineCap = 'round'
  context.stroke(new Path2D('M44 44 Q63.5 55 83 44'))
  context.restore()
}
