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

console.log(-1 % 2400)
console.log(-2 % 2400)
console.log(-3 % 2400)
console.log(-4 % 2400)
console.log(-5 % 2400)
console.log(-6 % 2400)
console.log(-7 % 2400)
console.log(-2400 % 2400)