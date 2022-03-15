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

  /* Animação do jogador (3)
  1 = chamar o jogador em forma de figura geométrica
  2 = incrementações que simulam sua movimentação: vertical, horizontal
  3 = Impedir que a forma do jogador (retângulo) exceda o fundo da tela
  */
  update() {
    this.draw()

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
    else this.velocity.y = 0
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

// Objeto para gerenciador o jogador (2)
const player = new Player()

// Var para referenciar imagens (topo da página)
// const image = document.getElementById('platform')
// const image2 = document.getElementById('platform2')
const platformOne = new Image()
const surface = new Image()
const gameBackground = new Image()

platformOne.src = './assets/platform_small.png'
surface.src = './assets/surface.png'
gameBackground.src = './assets/background.png'

// Configuração para alinhar superfície
const surfaceSize = -surface.width

// Objeto para gerenciador plataformas (5)
const platforms = [
  new Platform({ x: 170, y: 400, image: platformOne }),
  new Platform({ x: 270, y: 450, image: platformOne }),
  // Superfícies para <-
  new Platform({ x: surfaceSize * 2, y: 570, image: surface }),
  new Platform({ x: surfaceSize, y: 570, image: surface }),
  new Platform({ x: surface.width, y: 570, image: surface }),
  // Superfície referência (inicial)
  new Platform({ x: 0, y: 570, image: surface }),
  // Superfícies para ->
  new Platform({ x: surface.width * 2, y: 570, image: surface }),
  new Platform({ x: surface.width * 3, y: 570, image: surface }),
  new Platform({ x: surface.width * 4, y: 570, image: surface }),
  new Platform({ x: surface.width * 5, y: 570, image: surface })
]

// Objeto para gerenciar imagens que não são plataformas
const genericObjects = [
  // Imagem de fundo
  new GenericObject({
    x: -1,
    y: -1,
    image: gameBackground
  })
]

// Monitorar movimentos horizontais do jogador (4)
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

// Contar coordenadas horizontais para descobrir o ponto final (7)
// O valor de contagem deve ser == quantidade altera ao pressionar
let scrollOffset = 0

/* Procedimento e gerencimaneto de movimento (jogador e plataforma)
1 = tornar essa função um loop
2 = reconstruir o retângulo conforma a tela atualiza
2 = o procedimento é uma espécie de teleporte, independete de mover
3 = chamar as configurações de movimentação
4 = Inserção da plataforma
5 = realizar movimentos horizontais por ações específicas 
*/
function animate() {
  requestAnimationFrame(animate)

  // posição horizontal, vertical, largura, altura
  c.fillStyle = 'yellow'
  c.fillRect(0, 0, canvas.width, canvas.height)
  // c.clearRect(0, 0, canvas.width, canvas.height)

  //
  genericObjects.forEach(genericObject => {
    genericObject.draw()
  })

  //
  platforms.forEach(platform => {
    platform.draw()
  })

  player.update()

  /*
  && (1) = Impedir jogador de sair da tela ->
  && (1) = Valor igual ao tamanho do canvas não funcionou (excedeu)
  && (2) = Impedir jogador de sair da tela <-
  (Mandatório) .velocity == .position
  */
  if (keys.right.pressed && player.position.x < 480) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 70) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach(platform => {
        platform.position.x -= 5
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.position.x += 5
      })
    }
  }

  // Verificar se chegou ao fim do cenário(7)
  console.log(scrollOffset)
  if (scrollOffset > 2000) {
    console.log('Fim')
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

// Chamada da função acima
animate()

/* Configurar comandos em caso de tecla pressionada (1 vez/segurar) (4)
1 = alterar vars conforme a necessidade

EXEMPLOS VÁLIDOS:

if (event.code == 'ArrowDown') {
  console.log('Seta para baixo')
}

console.log(event.code)
*/
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

/* Configurar comandos em caso de tecla liberada (tecla solta) (4)
1 = alterar vars conforme a necessidade

EXEMPLOS VÁLIDOS:

if (event.code == 'ArrowDown') {
  console.log('Seta para baixo')
}

console.log(event.code)
*/
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
