const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Se subtraidos, impedem os personagens de estar ao fundo da tela
canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

let liuKangIdleRight = new Image()
let liuKangIdleLeft = new Image()
let liuKangWalkRight = new Image()
let liuKangWalkLeft = new Image()
let liuKangJump = new Image()

liuKangIdleRight.src = './assets/liu_kang_trans.png'
liuKangIdleLeft.src = './assets/liu_kang_trans2.png'
liuKangWalkRight.src = './assets/liu_kang_trans3.png'
liuKangWalkLeft.src = './assets/liu_kang_trans4.png'
liuKangJump.src = './assets/liu_kang_trans5.png'

// Monitorar movimentos horizontais do jogador (4)
const keys = {
  right: { pressed: false },
  left: { pressed: false },
  up: { pressed: false }
}

class Character {
  constructor({
    currentSprite,
    standRightSprite,
    standLeftSprite,
    walkRightSprite,
    walkLeftSprite,
    jump,
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
    this.jump = jump
    this.x = x
    this.y = y
    this.goHorizontal = goHorizontal // Ao pressionar um controle, o personagem avança
    this.goVertical = goVertical // Ao pressionar um controle, o personagem salta
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
    // PERCORRER CORTES DO SPRITE
    this.frameCounter++

    // ================================================================= PROCEDIMENTO =================================================================
    // Cada imagem, em teoria, deve ter movimentos, que são obtidos por uma sequência de imagens horizontais: sprites
    // Cada sprite possui um grupo de imagens e elas, em teoria, devem ter as mesmas dimensões (facilita muito)
    // Abaixo, teremos uma CONDIÇÃO DE TRATAMENTO para cada SPRITE
    // A ordem é, provavelmente, do SPRITE com o menor frame, para o maior

    // Impedir jogador de sumir da tela (para baixo)
    if (this.y + this.customHeight + this.goVertical <= canvas.height)
      this.y += this.gravity

    // RESETAR O SPRITE: PARADO ->
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.standRightSprite
    ) {
      this.frameCounter = 0
    }

    // RESETAR O SPRITE: PARADO <-
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.standLeftSprite
    ) {
      this.frameCounter = 0
    }

    // RESETAR O SPRITE: CAMINHANDO ->
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.walkRightSprite
    ) {
      this.frameCounter = 0
    }

    // RESETAR O SPRITE: CAMINHANDO <-
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.walkLeftSprite
    ) {
      this.frameCounter = 0
    }

    // RESETAR O SPRITE: PULANDO
    if (
      this.frameCounter > this.frameAmount &&
      this.currentSprite === this.jump
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
    currentSprite: liuKangIdleRight,
    standRightSprite: liuKangIdleRight,
    standLeftSprite: liuKangIdleLeft,
    walkRightSprite: liuKangWalkRight,
    walkLeftSprite: liuKangWalkLeft,
    jump: liuKangJump,
    x: 100,
    y: 350,
    goHorizontal: 0,
    goVertical: 0,
    srcWidth: 49,
    srcHeight: 105,
    frameCounter: 0,
    frameAmount: 59,
    speed: 4,
    customWidth: 90,
    customHeight: 200,
    gravity: 1.5
  })
}

function animate() {
  requestAnimationFrame(animate)
  c.fillRect(0, 0, canvas.width, canvas.height)

  // ANIMAÇÃO
  charLiuKang.draw()
  charLiuKang.update()

  // MOVIMENTOS HORIZONTAIS
  // Fazer o jogador andar para -> e impedir jogador de sair da tela ->
  if (keys.right.pressed) {
    charLiuKang.goHorizontal = charLiuKang.speed
  }

  // Fazer o jogador andar para <- e impedir jogador de sair da tela ->
  else if (keys.left.pressed) {
    charLiuKang.goHorizontal = -charLiuKang.speed
  }
  // Se nenhum botão estiver pressionado: para o personagem
  else {
    charLiuKang.goHorizontal = 0
  }
}

init()
animate()

// =============== Configurar ações ao: apertar/segurar tecla (4) ===============
addEventListener('keydown', event => {
  switch (event.key) {
    // Se apertar: muda o sprite do personagem para ANDANDO ->
    case 'd':
      keys.right.pressed = true
      charLiuKang.currentSprite = charLiuKang.walkRightSprite
      break

    // Se apertar: muda o sprite do personagem para ANDANDO <-
    case 'a':
      keys.left.pressed = true
      charLiuKang.currentSprite = charLiuKang.walkLeftSprite
      break
    case 'w':
      charLiuKang.goVertical -= 25
  }
})

// =============== Configurar ações ao: apertar/segurar tecla (4) ===============
addEventListener('keyup', event => {
  switch (event.key) {
    // Se soltar: muda o sprite do personagem para PARADO VIRADO ->
    case 'd':
      keys.right.pressed = false
      charLiuKang.currentSprite = charLiuKang.standRightSprite
      break

    // Se soltar: muda o sprite do personagem para PARADO VIRADO <-
    case 'a':
      keys.left.pressed = false
      charLiuKang.currentSprite = charLiuKang.standLeftSprite
      break
  }
})
