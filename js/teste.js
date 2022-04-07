/* // IMPEDIR SAÍDA DA TELA ->
if (
  keys.right.pressed &&
  charLiuKang.x > canvas.width - charLiuKang.customWidth / 2
) {
  console.log(charLiuKang.x)
  // a velocidade negativa anula a positiva (congelamento na posição)
  charLiuKang.x -= charLiuKang.speed
}

// IMPEDIR SAÍDA DA TELA ->
else if (keys.left.pressed && charLiuKang.x > 0 + charLiuKang.customWidth) {
  console.log(charLiuKang.x)
  // a velocidade negativa anula a positiva (congelamento na posição)
  charLiuKang.x += charLiuKang.speed
}

// Se nenhum botão estiver pressionado: para o personagem (todos falsos)
else {
  charLiuKang.goHorizontal = 0
}

// IR ->
if (keys.right.pressed) {
  charLiuKang.x += charLiuKang.speed
}

// VOLTAR <-
if (keys.left.pressed) {
  charLiuKang.x -= charLiuKang.speed
}

// Fazer o jogador andar para <- e impedir jogador de sair da tela ->
if (keys.left.pressed) {
  charLiuKang.x -= charLiuKang.speed
}
 */

/* function timeFunction(action, delay) {
  setTimeout(function () {
    console.log(action)
  }, delay)
}

console.log(0)
timeFunction((action = ''), (delay = 3000))
timeFunction((action = '2'), (delay = 1000))
timeFunction((action = '3'), (delay = 2000)) */

/* // PERCORRER CORTES DO SPRITE
this.frameCounter++

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

// RESETAR O SPRITE: ANDANDO ->
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.walkingRightSprite
) {
  this.frameCounter = 0
}

// RESETAR O SPRITE: ANDANDO <-
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.walkingLeftSprite
) {
  this.frameCounter = 0
}

// PULANDO ->
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.jumpRightSprite
) {
  this.frameCounter = 0
}

// RESETAR O SPRITE: GANCHO
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.upperPunchSprite
) {
  this.frameCounter = 0
}

// RESETAR O SPRITE: CHUTE BAIXO
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.lowKickSprite
) {
  this.frameCounter = 0
}

// RESETAR O SPRITE: SEQUÊNCIA DE CHUTE
if (
  this.frameCounter > this.frameAmount &&
  this.currentSprite === this.kickSequenceSprite
) {
  this.frameCounter = 0
} */

/* let gameFrame = 0
let staggerFrames = 5

for (let i = 0; i < 100; i++) {
  console.log(i % staggerFrames)
} */

/* let moveDelay = Math.floor(Math.random() * (200 - 100) + 100)
console.log(moveDelay) */

/* for (let i = 0; i < 50; i++) {
  console.log(getRndInteger(2, 7, exact=true))
} */

/* for (let i = 0; i < 50; i++) {
  console.log(Math.random() * 400 / 3 + 20)
} */

// console.log(400 / 3 + 20)



/*
// JOGADOR
let wolf = new Image()
wolf.src = './assets/wolf_idle_right_tr.png'
let wolfIdleLeft = new Image()
wolfIdleLeft.src = './assets/wolf_idle_left_tr.png'
let wolfWalkRight = new Image()
wolfWalkRight.src = './assets/wolf_walk_right_tr.png'
*/

/*
let wolfSetup = {
  idleRight: {
    widthList: [0, 184, 365, 542, 715, 892, 1074],
    widthList2: [183, 183, 177, 171, 174, 180, 185],
    srcHeight: 175,
    frameAmount: 6
  },
  idleLeft: {
    widthList: [0, 184, 365, 542, 715, 892, 1074],
    widthList2: [183, 183, 177, 171, 174, 180, 185],
    srcHeight: 175,
    frameAmount: 6
  },
  walkRight: {
    widthList: [0, 172, 350, 510, 685, 860, 1033, 1205.7, 1380],
    widthList2: [171, 169, 160, 175, 175, 175, 175, 175, 175],
    srcHeight: 161,
    frameAmount: 8
  }
}
*/

/*
// PARADO ->
chars.push(
  new Foe({
    image: wolf,
    widthList: [0, 184, 365, 542, 715, 892, 1074],
    frameCounter: 0,
    fixedHeight: 0,
    widthList2: [183, 183, 177, 171, 174, 180, 185],
    srcHeight: 175,
    whereX: 100,
    whereY: 400,
    canvasWidth: 60,
    canvasHeight: 60,
    modularCounter: 0,
    modular: 10,
    frameAmount: 6
  })
)

// CAMINHANDO ->
chars.push(
  new Foe({
    image: wolfWalkRight,
    widthList: [0, 172, 350, 510, 685, 860, 1033, 1205.7, 1380],
    frameCounter: 0,
    fixedHeight: 0,
    widthList2: [171, 169, 160, 175, 175, 175, 175, 175, 175],
    srcHeight: 161,
    whereX: 100,
    whereY: 400,
    canvasWidth: 60,
    canvasHeight: 60,
    modularCounter: 0,
    modular: 10,
    frameAmount: 8
  })
)

// PARADO <-
chars.push(
  new Foe({
    image: wolfIdleLeft,
    widthList: [0, 184, 365, 542, 715, 892, 1074],
    frameCounter: 0,
    fixedHeight: 0,
    widthList2: [183, 183, 177, 171, 174, 180, 185],
    srcHeight: 175,
    whereX: 100,
    whereY: 400,
    canvasWidth: 60,
    canvasHeight: 60,
    modularCounter: 0,
    modular: 10,
    frameAmount: 6
  })
)
*/

var delay = 1000; //1 second
console.log('py')
setTimeout(function() {console.log('js')}, 3000);
