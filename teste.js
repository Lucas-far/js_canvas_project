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

function timeFunction(action, delay) {
  setTimeout(function () {
    console.log(action)
  }, delay)
}

console.log(0)
timeFunction((action = ''), (delay = 3000))
timeFunction((action = '2'), (delay = 1000))
timeFunction((action = '3'), (delay = 2000))
