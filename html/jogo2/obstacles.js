const obstaclesArray = []

function randomIndex(targetVar) {
  const index = Math.floor(Math.random() * targetVar.length)
  return index
}

function rgbTable() {
  let arrayVar = []

  for (let i = 0; i < 255; i++) {
    arrayVar.push(i)
  }

  let indexForRed = randomIndex(arrayVar)
  let indexForGreen = randomIndex(arrayVar)
  let indexForBlue = randomIndex(arrayVar)

  return `rgba(${arrayVar[indexForRed]},${arrayVar[indexForGreen]},${arrayVar[indexForBlue]})`
}

function handleObstacles(frameAmount) {
  // Add um novo obstáculo a cada: endValue = qtd. de frames
  if (frame % frameAmount === 0) {
    obstaclesArray.unshift(new Obstacle())
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    // funções referênciadas pelos objetos add abaixo
    obstaclesArray[i].draw()
    obstaclesArray[i].update()
  }

  // Ao chegar em 30, retirar metade (impedir sobrecarga)
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0])
  }
}

class Obstacle {
  constructor() {
    // Tamanho dos retângulos ficam entre: 20 até 153
    this.top = (Math.random() * canvas.height) / 3 + 20
    this.bottom = (Math.random() * canvas.height) / 3 + 20
    
    // Configurar retângulos para nascer no final do canvas ->
    this.x = canvas.width 
    
    // Retângulos são pequeno horizontalmente
    this.width = 20 
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = rgbTable()

    // Retângulos no topo (y = 0)
    ctx.fillRect(this.x, 0, this.width, this.top)
    // Retângulos no chão (ao subtrair por "this.bottom", os retângulos antes escondidos abaixo do canvas, aparecem ao chão)
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom)

    ctx.fill()
  }

  update() {
    this.x -= gameSpeed
    // this.draw()
  }
}
