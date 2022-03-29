class Bird {
  constructor() {
    this.x = 100
    this.y = 200
    this.vy = 0
    this.width = 20
    this.height = 20
    this.weight = 1
  }

  landOnGround() {
    // (this.height * int) = caso não queira pousar no chão (presença de superfície)
    let groundPosition = canvas.height - this.height
    let gravitySmoother = 0.9

    // Chegando ao "chão", zerar a vel. de queda
    if (this.y > groundPosition) {
      this.y = groundPosition
      this.vy = 0
    }
    // Não chegando ao chão, continuar caindo
    else {
      this.vy += this.weight // vel. de queda vertical com base no peso
      this.vy *= gravitySmoother // torna a queda menos agressiva, e evita uso reincidente da tecla W
      this.y += this.vy // queda vertical com base na vel. de queda
    }
  }

  fly() {
    if (keyPressedIsW) {
      this.vy -= 2 // -y move para cima
    }
  }

  roofCollision() {
    // O topo da tela + altura do objeto
    let roof = 0 + this.height

    // Alcançando o topo
    if (this.y < roof) {
      this.y = roof // iguala a altura do objeto a do teto
      this.vy = 0 // queda imediata após saltar a tecla
    }
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = 'violet'
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.fill()
  }

  update() {
    this.landOnGround()
    this.fly()
    this.roofCollision()
  }
}

const bird = new Bird()
