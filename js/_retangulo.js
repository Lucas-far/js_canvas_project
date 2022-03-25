const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Se subtraidos, impedem os personagens de estar ao fundo da tela
canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100
