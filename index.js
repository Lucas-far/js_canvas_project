// Setup inicial
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
canvas.width = 600
canvas.height = 600

// (3)
const gravity = 1.5

// Contar coordenadas horizontais para referenciar um ponto final (7)
let scrollOffset = 0

// Penalidades (10)
const gap_normal = 100
const gap_large = 170

// Geometria
const standingFrame = 59
const walkingFrame = 29

// Monitorar movimentos horizontais do jogador (4)
const keys = {
  right: { pressed: false },
  left: { pressed: false }
}

// =============== IMAGENS USADAS ===============
// const image = document.getElementById('platform')
// const image2 = document.getElementById('platform2')
let character = new Image()
let characterRunRight = new Image()
let characterToLeft = new Image()
let characterRunLeft = new Image()
let platformOne = new Image()
let platformTwo = new Image()
let surface = new Image()
let gameBackground = new Image()
let hills = new Image()

character.src = './assets/sprite_right.png'
characterRunRight.src = './assets/sprite_run_right.png'
characterToLeft.src = './assets/sprite_left.png'
characterRunLeft.src = './assets/sprite_run_left.png'
platformOne.src = './assets/platform_small.png'
platformTwo.src = './assets/platformSmallTall.png'
surface.src = './assets/mario_world_surface.png'
gameBackground.src = './assets/background.png'
hills.src = './assets/hills.png'

// ------------------------------------------------------------ 2 ------------------------------------------------------------
class Player {
  constructor() {
    // Posição na tela (valores alteráveis)
    this.position = { x: 100, y: 100 }

    // Movimentos horizontais e verticais
    this.velocity = { x: 0, y: 0 }

    // Comportamentos do jogador
    // range: largura do recorte horizontal
    this.behaviours = {
      stand: {
        right: character, // Sprites do jogador parado à direita
        left: characterToLeft, // Sprites do jogador parado à esquerda
        range: 177, // Ponto do corte no sprite do jogador parado
        resize: 66 // Largura original do jogador (usado na transição de parado para correndo)
      },
      run: {
        right: characterRunRight, // Sprites do jogador correndo para a direita
        left: characterRunLeft, // Sprites do jogador correndo para a esquerda
        range: 341, // Ponto do corte no sprite do jogador correndo
        resize: 127.875 // Largura customizada do jogador (Problemas de proporção levam a necessidade de criar essa propriedade)
      }
    }

    // =============== Configuração do jogador (parado + ->) ===============
    // A imagem padrão (grupo de sprites) (alterado nos eventos de escuta)
    this.currentSprite = this.behaviours.stand.right
    // A largura padrão (alterado nos eventos de escuta)
    this.currentCropRange = this.behaviours.stand.range
    // Servirá como loop contador das imagens de sprite (no jogador, serão usadas 28) (importante no recorte dos sprites)
    this.frameCounter = 0
    this.speed = 10
    this.width = 66
    this.height = 150
  }

  // =============== DESATIVADO ===============
  // draw() {
  // // Cor e forma do retângulo (representa o jogador)
  // c.fillStyle = 'red'
  // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  // }

  // =============== Configuração do recorte da imagem no paint (jogador parado + ->) ===============
  // currentSprite    || alterável nos eventos de escuta (uma imagem com vários sprites ocupando o mesmo espaço)
  // currentCropRange || alterável nos eventos de escuta (se o sprite foi configurado corretamente, deve ser fixo)
  // 400              || não alterável (se o sprite foi configurado corretamente, em linha reta, este valor deve ser fixo)
  draw() {
    c.drawImage(
      // A imagem
      this.currentSprite,
      // Ponto de partida do recorte da imagem (x, y) respectivamente
      // No recorte de imagens de sprite é normal o primeiro recorte ser (x=0, y=0) (como representado abaixo)
      // O argumento (x) abaixo é referente ao valor da largura do recorte do alvo no paint
      // No argumento (x) abaixo, ele está sendo multiplicado, pois a var que o acompanha será incrementada mais abaixo (inicialmente 0)
      // EXEMPLO DE FUNCIONAMENTO: 177 * 0...177 * 1...177 * 2 (ponto X do recorte dos 3 primeiros sprites)
      // Seguindo a lógica acima, os sprites são todos cortados em proporções corretas (pois devem ter as mesmas dimensões)
      // Como a imagem de sprite tende a ser 100% horizontal, o argumento (y) não se mexe, ficando fixo em zero (como representado abaixo)
      this.currentCropRange * this.frameCounter,
      0,
      // Largura final do recorte da imagem no paint
      this.currentCropRange,
      // Altura final do recorte da imagem no paint
      400,
      // Posição horizontal na tela (distância do lado <- da tela) (editável no construtor da classe)
      this.position.x,
      // Posição vertical na tela (distância em relação ao teto) (editável no construtor da classe)
      this.position.y,
      // Referenciar largura do jogador (editável no construtor da classe)
      this.width,
      // Referenciar altura do jogador (editável no construtor da classe)
      this.height
    )
  }

  update() {
    // Percorrer os sprites do jogador
    this.frameCounter++

    // Se o frame em execução for o jogador parado: resetar os frames
    // Independente do jogador estar parado virado para <- ou ->, ambos grupos possuem = quantidade de frames e podem ser inclusos na mesma condição
    if (
      this.frameCounter > standingFrame &&
      (this.currentSprite === this.behaviours.stand.right ||
        this.currentSprite === this.behaviours.stand.left)
    ) {
      this.frameCounter = 0
    }
    // Se o frame em execução for o jogador correndo -> ou <- chegar ao fim: resetar frames
    // Independente do jogador correr para <- ou ->, ambos grupos possuem = quantidade de frames e podem ser inclusos na mesma condição
    else if (
      this.frameCounter > walkingFrame &&
      (this.currentSprite === this.behaviours.run.right ||
        this.currentSprite === this.behaviours.run.left)
    ) {
      this.frameCounter = 0
    }

    // Renderizar a imagem do jogador
    this.draw()

    // Incrementações que simulam sua movimentação: vertical, horizontal
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

// =============== OBJETOS (INICIALMENTE VAZIOS) ===============
let player = new Player() // Jogador (2)
let platforms = [] // Plataformas (5)
let genericObjects = [] // Complementos (8)

// Configurar valores dos OBJETOS acima se: iniciar, perder (CONFIGURAÇÃO + CRIAÇÃO)
function init() {
  player = new Player()

  platforms = [
    // Superfícies na parte de trás da superfície devem ser inseridas antes da superfície principal
    new Platform({ x: surface.width + 50, y: 450, image: platformTwo }),

    // superfície <- (pós lacuna)
    // new Platform({ x: surfaceSize * 3, y: 570, image: surface }),

    // superfície <- (com lacuna)
    // new Platform({ x: surfaceSize * 2 + gap_normal, y: 570, image: surface }),

    // superfície <-
    // new Platform({ x: surfaceSize, y: 570, image: surface }),

    // superfície pioneira
    new Platform({ x: 0, y: 570, image: surface }),

    // superfície -> (posicionamento = largura)
    new Platform({ x: surface.width, y: 570, image: surface }),

    // superfície -> (com lacuna)
    new Platform({ x: surface.width * 2 + gap_normal, y: 570, image: surface }),

    // y alterado para ficar mais alto (acima da superfície principal)
    new Platform({
      x: surface.width * 3 + gap_large,
      y: 420,
      image: platformTwo
    }),

    // Plataformas podem ser inseridas após a superfície principal (não há contato = não há sobreposição)
    new Platform({ x: 170, y: 400, image: platformOne }),
    new Platform({ x: 270, y: 450, image: platformOne })
  ]

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: gameBackground }), // Imagem de fundo
    new GenericObject({ x: -1, y: -1, image: hills }) // Montanhas/colinas
  ]

  scrollOffset = 0 // evitar que o jogador tenho acesso a esquerda após uma derrota
}

// Renderização das coisas criadas na função anterior
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
  else if (
    (keys.left.pressed && player.position.x > 70) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed
  }

  // Se não estiver usando teclas para se mover: para o jogador
  else {
    player.velocity.x = 0

    // Se pressionar ->: contar progresso e mover plataforma simultaneamente na mesma direção e propoção
    if (keys.right.pressed) {
      scrollOffset += player.speed
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
    else if (keys.left.pressed && scrollOffset > 0) {
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

// =============== Configurar ações ao: apertar/segurar tecla (4) ===============
addEventListener('keydown', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'w':
      // console.log('up')
      player.velocity.y -= 25
      break
    case 'a':
      // console.log('left')
      // Ao APERTAR/SEGURAR a tecla correspondente: andar para <-
      keys.left.pressed = true
      player.currentSprite = player.behaviours.run.left // Redefinir o sprite padrão para: jogador andando + <-
      player.currentCropRange = player.behaviours.run.range // Reconfigurar a largura apropriada para: jogador andando + <-
      player.width = player.behaviours.run.resize // Retornar ao tamanho correspondente: jogador andando + <-
      break
    case 's':
      // console.log('down')
      break
    case 'd':
      // console.log('right')
      // player.velocity.x = 1
      // Ao APERTAR/SEGURAR a tecla correspondente: andar para ->
      keys.right.pressed = true
      player.currentSprite = player.behaviours.run.right // Redefinir o sprite padrão para: jogador andando + ->
      player.currentCropRange = player.behaviours.run.range // Reconfigurar a largura apropriada para: jogador andando + ->
      player.width = player.behaviours.run.resize // Retornar ao tamanho correspondente: jogador andando + ->
      break
  }
})

// =============== Configurar ações ao: soltar tecla (4) ===============
addEventListener('keyup', event => {
  // console.log(event.key)
  switch (event.key) {
    case 'w':
      // console.log('up')
      // player.velocity.y -= 10
      break
    case 'a':
      // console.log('left')
      // Ao SOLTAR a tecla correspondente: andar para <-
      keys.left.pressed = false
      player.currentSprite = player.behaviours.stand.left // Redefinir o sprite padrão para: jogador parado + <-
      player.currentCropRange = player.behaviours.stand.range // Reconfigurar a largura apropriada para: jogador parado + <-
      player.width = player.behaviours.stand.resize // Retornar ao tamanho correspondente: jogador parado + <-
      break
    case 's':
      // console.log('down')
      break
    case 'd':
      // console.log('right')
      // player.velocity.x = 0
      // Ao SOLTAR a tecla correspondente: andar para ->
      keys.right.pressed = false
      player.currentSprite = player.behaviours.stand.right // Redefinir o sprite padrão para: jogador parado + ->
      player.currentCropRange = player.behaviours.stand.range // Reconfigurar a largura apropriada para: jogador parado + ->
      player.width = player.behaviours.stand.resize // Retornar ao tamanho correspondente: jogador parado + ->
      break
  }
})
