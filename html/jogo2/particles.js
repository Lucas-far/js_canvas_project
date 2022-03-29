const particlesArray = []

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

function hslaTable() {
  let hue = []
  let saturationAndLightness = []
  let alpha = []

  for (let i = 0; i < 360; i++) {
    hue.push(i)
  }

  for (let i = 0; i < 100; i++) {
    saturationAndLightness.push(`${i}%`)
  }
  for (let i = 0; i < 1; i+=0.1) {
    alpha.push(`${i}`)
  }

  let hueChoice = hue[randomIndex(hue)]
  let saturation = saturationAndLightness[randomIndex(saturationAndLightness)]
  let lightness = saturationAndLightness[randomIndex(saturationAndLightness)]
  let alphaChoice = alpha[randomIndex(alpha)]

  return `hsla(${hueChoice},${saturation},${lightness},${alphaChoice})`
}

function handleParticles(particlesAmount, removeAmount) {
  particlesArray.unshift(new Particle())

  for (let i = 0; i < particlesArray.length; i++) {
    // funções referênciadas pelos objetos add acima
    particlesArray[i].draw()
    particlesArray[i].update()
  }
  // Ao chegar em 30, retirar metade (impedir sobrecarga)
  if (particlesArray.length > particlesAmount) {
    for (let i = 0; i < removeAmount; i++) {
      particlesArray.pop(particlesArray[i])
    }
  }
}

class Particle {
  constructor() {
    this.x = bird.x + 7 // posicionar próximo ao pássaro na vertical
    this.y = bird.y + 7 // posicionar próximo ao pássaro na horizontal
    this.width = Math.random() * 7 + 3 // Número entre: 3.01 até 6.99
    this.height = Math.random() * 7 + 3
    this.speedY = Math.random() * 0.5 - 0.25 // Número entre: - 0.49 até 0.99
  }

  update() {
    this.x -= gameSpeed // main.js
    this.y += this.speedY
  }

  draw() {
    ctx.beginPath()
    // ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`
    ctx.fillStyle = rgbTable()
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fill()
  }
}
