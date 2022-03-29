const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const canvasWidth = (canvas.width = 600)
const canvasHeight = (canvas.height = 400)

let keyPressedIsW = false
let angle = 0
let hue = 0
let frame = 0
let score = 0
let gameSpeed = 2

let hit = new Image()
hit.src = 'bang.png'

function collision() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      console.log('collision')
      ctx.drawImage(hit, bird.x + 10, bird.y, 100, 100)
    }
  }
}

function animate() {
  // Limpar formas que se movimentam (ilusão de movimento)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  bird.draw() // bird.js
  bird.update() // bird.js
  handleParticles((particlesAmount = 20), (removeAmount = 10)) // particles.js
  handleObstacles((frameAmount = 50)) // Obstáculo desenhado a cada 50 frames (variável)
  // collision()

  frame++
  hue++

  requestAnimationFrame(animate)
}
animate()

addEventListener('keydown', event => {
  console.log(event)

  switch (event.key) {
    case 'w':
      keyPressedIsW = true
      break
  }
})

addEventListener('keyup', event => {
  switch (event.key) {
    case 'w':
      keyPressedIsW = false
      break
  }
})

addEventListener('mousemove', event => {
  mouseX = event.x
  mouseY = event.y
  // console.log(mouseX, mouseY)
  // console.log(mouse)
})
