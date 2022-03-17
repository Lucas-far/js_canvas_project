const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

let liuKang = new Image()
let motaro = new Image()
let shao = new Image()

liuKang.src = './assets/liu_kang_idle.png'
motaro.src = './assets/motaro_idle.png'
shao.src = './assets/shao_idle.png'

class Character {
  constructor({
    currentSprite,
    standRightSprite,
    standLeftSprite,
    runRightSprite,
    runLeftSprite,
    x,
    y,
    velocityOnX,
    velocityOnY,
    cropPixel,
    srcHeight,
    frameCounter,
    frameAmount,
    speed,
    customWidth,
    customHeight,
    gravity
  }) {
    this.currentSprite = currentSprite
    this.standRightSprite = standRightSprite
    this.standLeftSprite = standLeftSprite
    this.runRightSprite = runRightSprite
    this.runLeftSprite = runLeftSprite
    this.x = x
    this.y = y
    this.velocityOnX = velocityOnX
    this.velocityOnY = velocityOnY
    this.cropPixel = cropPixel
    this.srcHeight = srcHeight
    this.frameCounter = frameCounter
    this.frameAmount = frameAmount
    this.speed = speed
    this.customWidth = customWidth
    this.customHeight = customHeight
    this.gravity = gravity
  }

  draw() {
    c.drawImage(
      this.standRightSprite,
      this.cropPixel * this.frameCounter,
      0,
      this.cropPixel,
      this.srcHeight,
      this.x,
      this.y,
      this.customWidth,
      this.customHeight
    )
  }

  update() {
    this.frameCounter++

    if (
      this.frameCounter > this.frameAmount &&
      this.standRightSprite === this.currentSprite
    ) {
      this.frameCounter = 0
    }

    this.draw()

    this.y += this.velocityOnY
    this.x += this.velocityOnX

    if (this.y + this.customHeight + this.velocityOnY <= canvas.height)
      this.y += this.gravity
  }
}

let charLiuKang = new Character({
  currentSprite: liuKang,
  standRightSprite: liuKang,
  standLeftSprite: undefined,
  runRightSprite: undefined,
  runLeftSprite: undefined,
  x: 100,
  y: 100,
  velocityOnX: 0,
  velocityOnY: 0,
  cropPixel: 49,
  srcHeight: 105,
  frameCounter: 0,
  frameAmount: 11,
  speed: 10,
  customWidth: 100,
  customHeight: 170,
  gravity: 1.5
})

let charMotaro = new Character({
  currentSprite: motaro,
  standRightSprite: motaro,
  standLeftSprite: undefined,
  runRightSprite: undefined,
  runLeftSprite: undefined,
  x: 200,
  y: 100,
  velocityOnX: 0,
  velocityOnY: 0,
  cropPixel: 88,
  srcHeight: 159,
  frameCounter: 0,
  frameAmount: 8,
  speed: 10,
  customWidth: 100,
  customHeight: 500,
  gravity: 1.5
})

let charShao = new Character({
  currentSprite: shao,
  standRightSprite: shao,
  standLeftSprite: undefined,
  runRightSprite: undefined,
  runLeftSprite: undefined,
  x: 300,
  y: 100,
  velocityOnX: 0,
  velocityOnY: 0,
  cropPixel: 48,
  srcHeight: 131,
  frameCounter: 0,
  frameAmount: 5,
  speed: 10,
  customWidth: 100,
  customHeight: 200,
  gravity: 1.5
})

function init() {
  charLiuKang = new Character({
    currentSprite: liuKang,
    standRightSprite: liuKang,
    standLeftSprite: undefined,
    runRightSprite: undefined,
    runLeftSprite: undefined,
    x: 100,
    y: 100,
    velocityOnX: 0,
    velocityOnY: 0,
    cropPixel: 49,
    srcHeight: 105,
    frameCounter: 0,
    frameAmount: 11,
    speed: 10,
    customWidth: 100,
    customHeight: 170,
    gravity: 1.5
  })

  charMotaro = new Character({
    currentSprite: motaro,
    standRightSprite: motaro,
    standLeftSprite: undefined,
    runRightSprite: undefined,
    runLeftSprite: undefined,
    x: 200,
    y: 100,
    velocityOnX: 0,
    velocityOnY: 0,
    cropPixel: 88,
    srcHeight: 159,
    frameCounter: 0,
    frameAmount: 8,
    speed: 10,
    customWidth: 100,
    customHeight: 170,
    gravity: 1.5
  })

  charShao = new Character({
    currentSprite: shao,
    standRightSprite: shao,
    standLeftSprite: undefined,
    runRightSprite: undefined,
    runLeftSprite: undefined,
    x: 300,
    y: 100,
    velocityOnX: 0,
    velocityOnY: 0,
    cropPixel: 48,
    srcHeight: 131,
    frameCounter: 0,
    frameAmount: 5,
    speed: 10,
    customWidth: 100,
    customHeight: 200,
    gravity: 1.5
  })
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'blue'
  c.fillRect(0, 0, canvas.width, canvas.height)
  charLiuKang.update()
  charMotaro.update()
  charShao.update()
}

init()
animate()
