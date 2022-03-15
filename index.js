//Posterior (no html: <script type="module">)
// import('./assets/platform.png')

// Setup inicial
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
canvas.width = 600
canvas.height = 600

// (3)
const gravity = 1.5

// Contar coordenadas horizontais para descobrir o ponto final (7)
// O valor de contagem deve ser == quantidade altera ao pressionar
let scrollOffset = 0

// Penalidades (10)
const gap_normal = 100
const gap_large = 170

// Monitorar movimentos horizontais do jogador (4)
const keys = {
  right: { pressed: false },
  left: { pressed: false }
}

// =============== IMAGENS USADAS ===============
// const image = document.getElementById('platform')
// const image2 = document.getElementById('platform2')
let platformOne = new Image()
let platformTwo = new Image()
let surface = new Image()
let gameBackground = new Image()
let hills = new Image()

platformOne.src = './assets/platform_small.png'
platformTwo.src = './assets/platformSmallTall.png'
surface.src = './assets/surface.png'
gameBackground.src = './assets/background.png'
hills.src = './assets/hills.png'

// ------------------------------------------------------------ 2 ------------------------------------------------------------
class Player {
  /* Características do jogador
  1 = Posição na tela
  2 = Movimentos horizontais (3)
  3 = Dimensões/tamanho
  */
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.speed = 10
    this.width = 30
    this.height = 30
  }

  /* Construção do jogador
  1 = cor de referência
  2 = função que recebe as características
  */
  draw() {
    // cor, retângulo config
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    // chamar o jogador em forma de figura geométrica
    this.draw()

    // incrementações que simulam sua movimentação: vertical, horizontal
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    // Impedir jogador de sumir da tela (para baixo)
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
    // Impedir aqui (desativado)
    // else this.velocity.y = 0
  }
}

// ------------------------------------------------------------ 5 ------------------------------------------------------------
class Platform {
  /*
  1 = Posição na tela
  1 = Como plataformas são múltiplas, parâmetros são necessários
  1 = Os mesmos são passados na função
  2 = Dimensões
  */
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  /*
  1 = Posição na tela
  1 = Como plataformas são múltiplas, parâmetros são necessários
  1 = Os mesmos são passados na função
  2 = Dimensões
  */
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

// Configuração para alinhar superfície
const surfaceSize = -surface.width

// =============== OBJETOS (INICIALMENTE VAZIOS) ===============
let player = new Player() // Jogador (2)
let platforms = [] // Plataformas (5)
let genericObjects = [] // Complementos (8)

// Configurar valores dos OBJETOS acima se: iniciar, perder (CRIAÇÃO)
function init() {
  player = new Player()

  platforms = [
    new Platform({ x: surfaceSize * 3, y: 570, image: surface }), // superfície <- (pós lacuna)
    new Platform({ x: surfaceSize * 2 + gap_normal, y: 570, image: surface }), // superfície <- (com lacuna)
    new Platform({ x: surfaceSize, y: 570, image: surface }), // superfície <-
    // superfície pioneira
    new Platform({ x: 0, y: 570, image: surface }),
    new Platform({ x: surface.width, y: 570, image: surface }), // superfície -> (posicionamento = largura)
    new Platform({ x: surface.width * 2 + gap_normal, y: 570, image: surface }), // superfície -> (com lacuna)
    new Platform({
      x: surface.width * 3 + gap_large,
      y: 420,
      image: platformTwo
    }), // y alterado para ficar mais alto
    new Platform({ x: 170, y: 400, image: platformOne }), // plataforma
    new Platform({ x: 270, y: 450, image: platformOne }) // plataforma
  ]

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: gameBackground }), // Imagem de fundo
    new GenericObject({ x: -1, y: -1, image: hills }) // Montanhas/colinas
  ]
}

function animate() {
  // Tornar a própria função um loop
  requestAnimationFrame(animate)

  c.fillStyle = 'yellow'
  c.fillRect(0, 0, canvas.width, canvas.height)
  // posição horizontal, vertical, largura, altura
  // c.clearRect(0, 0, canvas.width, canvas.height)

  // OBJETOS DE COMPLEMENTO: Iteração + renderização de sua imagem
  genericObjects.forEach(genericObject => {
    genericObject.draw()
  })

  // OBJETOS DE PLATAFORMA/SUPERFÍCIE: Iteração + renderização de sua imagem
  platforms.forEach(platform => {
    platform.draw()
  })

  // Criar o retângulo do jogador
  player.update()

  // Fazer o jogador andar para -> e impedir jogador de sair da tela ->
  if (keys.right.pressed && player.position.x < 480) {
    player.velocity.x = player.speed
  }

  // Impedir jogador de sair da tela <-
  else if (keys.left.pressed && player.position.x > 70) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    // Se pressionar ->: contar progresso e mover plataforma simultaneamente na mesma direção e propoção
    if (keys.right.pressed) {
      scrollOffset += 5
      // Iterar sobre todas as plataformas
      // Acompanhar jogador para direita
      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })
      // Iterar sobre todos os objetos genéricos
      // Efeito paralaxe para a ->
      genericObjects.forEach(genericObject => {
        genericObject.position.x -= player.speed * 0.66
      })
    }

    // Se pressionar <-: contar progresso e mover plataforma simultaneamente na mesma direção e propoção
    else if (keys.left.pressed) {
      scrollOffset -= player.speed

      // Iterar sobre todas as plataformas
      // Acompanhar jogador para esquerda
      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
      // Iterar sobre todos os objetos genéricos
      // Efeito paralaxe para a <-
      genericObjects.forEach(genericObject => {
        genericObject.position.x += player.speed * 0.66
      })
    }
  }

  // Verificar progresso do cenário (7)
  console.log(`Progresso atual ${scrollOffset}`)
  if (scrollOffset > 2000) {
    console.log('Fim')
  }
  // Posição vertical do jogador abaixo da menor posição vertical da janela do jogo
  if (player.position.y > canvas.height) {
    console.log('GAME OVER')
    init()
  }

  /* Controle de colisão
  && (1) = Subindo um obstáculo e pousando
  && (2) = cair do lado direito após subir
  && (3) = cair do lado esquerdo após subir
  */
  //
  platforms.forEach(platform => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0
    }
  })
}

init()
animate()

/* EXEMPLOS VÁLIDOS:

if (event.code == 'ArrowDown') {
  console.log('Seta para baixo')
}

console.log(event.code)
*/

// Configurar comandos em caso de tecla pressionada (1 vez/segurar) (4)
addEventListener('keydown', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'w':
      // console.log('up')
      player.velocity.y -= 10
      break
    case 'a':
      // console.log('left')
      keys.left.pressed = true
      break
    case 's':
      // console.log('down')
      break
    case 'd':
      // console.log('right')
      // player.velocity.x = 1
      keys.right.pressed = true
      break
  }
})

// Configurar comandos em caso de tecla liberada (tecla solta) (4)
addEventListener('keyup', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'w':
      // console.log('up')
      player.velocity.y -= 20
      break
    case 'a':
      // console.log('left')
      keys.left.pressed = false
      break
    case 's':
      // console.log('down')
      break
    case 'd':
      // console.log('right')
      // player.velocity.x = 0
      keys.right.pressed = false
      break
  }
})
