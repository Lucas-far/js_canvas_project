const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Se subtraidos, impedem os personagens de estar ao fundo da tela
canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

let liuKangIdle = new Image()
let liuKangWalkRight = new Image()

liuKangIdle.src = './assets/liu_kang_idle.png'
liuKangWalkRight.src = './assets/liu_kang_walking_right.png'

// Monitorar movimentos horizontais do jogador (4)
const keys = {
  right: { pressed: false },
  left: { pressed: false }
}

class Character {
  constructor({
    currentSprite,
    standRightSprite,
    standLeftSprite,
    walkRightSprite,
    walkLeftSprite,
    x,
    y,
    goHorizontal,
    goVertical,
    srcWidth,
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
    this.walkRightSprite = walkRightSprite
    this.walkLeftSprite = walkLeftSprite
    this.x = x
    this.y = y
    this.goHorizontal = goHorizontal
    this.goVertical = goVertical
    this.srcWidth = srcWidth
    this.srcHeight = srcHeight
    this.frameCounter = frameCounter
    this.frameAmount = frameAmount
    this.speed = speed
    this.customWidth = customWidth
    this.customHeight = customHeight
    this.gravity = gravity
  }

  // EXPLICAÇÃO USANDO O PAINT COMO REFERÊNCIA (sprite aberto)
  // p2 = posicionamento no pé do lado <- do personagem (rederência x)
  // p3 = subir o mouse ao topo (referência y)
  // p4 e p5 = puxar horizontalmente para -> (definindo simultaneament largura e altura)
  // p6      || afastar em pixels da <-
  // p7      || afastar em pixels de cima
  // p8      || largura customizada de exibição no canvas
  // p9      || altura customizada de exibição no canvas
  draw() {
    c.drawImage(
      this.currentSprite,
      this.srcWidth * this.frameCounter,
      0,
      this.srcWidth,
      this.srcHeight,
      this.x,
      this.y,
      this.customWidth,
      this.customHeight
    )
  }

  update() {
    // Percorrimento dos sprites do personagem
    this.frameCounter++

    // ================================================================= PROCEDIMENTO =================================================================
    // Cada imagem, em teoria, deve ter movimentos, que são obtidos por uma sequência de imagens horizontais: sprites
    // Cada sprite possui um grupo de imagens e elas, em teoria, devem ter as mesmas dimensões (facilita muito)
    // Abaixo, teremos uma CONDIÇÃO DE TRATAMENTO para cada SPRITE
    // A ordem é, provavelmente, do SPRITE com o menor frame, para o maior

    // Impedir jogador de sumir da tela (para baixo)
    if (this.y + this.customHeight + this.goVertical <= canvas.height)
      this.y += this.gravity

    // Se o contador ultrapassar a qtd. de frames que o personagem possui: resetar frames em loop
    // Se o sprite do jogador "PARADO" for igual ao sprite "ATUAL": resetar frames em loop
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.standRightSprite
    ) {
      this.frameCounter = 0
    }

    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.walkRightSprite
    ) {
      this.frameCounter = 0
    }

    this.x += this.goHorizontal
    this.y += this.goVertical
  }
}

let charLiuKang = undefined

// Instanciação dos objetos (sprites devem ter mesmas dimensões e quantidade de frames)
function init() {
  charLiuKang = new Character({
    currentSprite: liuKangIdle,
    standRightSprite: liuKangIdle,
    standLeftSprite: undefined,
    walkRightSprite: liuKangWalkRight,
    walkLeftSprite: undefined,
    x: 100,
    y: 350,
    goHorizontal: 0,
    goVertical: 0,
    srcWidth: 49,
    srcHeight: 105,
    frameCounter: 0,
    frameAmount: 11,
    speed: 10,
    customWidth: 100,
    customHeight: 170,
    gravity: 1.5
  })
}

function animate() {
  requestAnimationFrame(animate)
  c.fillRect(0, 0, canvas.width, canvas.height)

  charLiuKang.draw()
  charLiuKang.update()
}

init()
animate()

// =============== Configurar ações ao: apertar/segurar tecla (4) ===============
addEventListener('keydown', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'd':
      keys.right.pressed = true
      charLiuKang.currentSprite = charLiuKang.walkRightSprite
      break
  }
})

// =============== Configurar ações ao: apertar/segurar tecla (4) ===============
addEventListener('keyup', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'd':
      keys.right.pressed = false
      charLiuKang.currentSprite = charLiuKang.standRightSprite
      break
  }
})
