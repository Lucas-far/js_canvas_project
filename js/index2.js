const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1280
canvas.height = 600
const standingFrame = 8

let motaro = new Image()
motaro.src = './assets/motaro4.png'

class Boss {
  constructor() {
    this.position = { x: 100, y: 100 }
    this.velocity = { x: 0, y: 0 }

    this.behaviours = {
      stand: {
        right: motaro,
        range: 183
      }
    }

    this.frameCounter = 0
    this.currentSprite = this.behaviours.stand.right
    this.currentCropRange = this.behaviours.stand.range
    this.speed = 10
    this.width = 183
    this.height = 323
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropRange * this.frameCounter,
      0,
      this.currentCropRange,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    this.frameCounter++

    if (
      this.frameCounter > 26 &&
      this.currentSprite === this.behaviours.stand.right
    ) {
      this.frameCounter = 0
    }

    this.draw()

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
  }
}

let motaro_object = new Boss()

function init() {
  motaro_object = new Boss()
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'blue'
  c.fillRect(0, 0, canvas.width, canvas.height)
  motaro_object.update()
}

init()
animate()
