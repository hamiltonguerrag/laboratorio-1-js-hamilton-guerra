let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J', 'Q', 'K', 'A']

let puntosJugador = 0
let puntosComputadora = 0

//Referencias al HTML
const btnPedir = document.querySelector('#btn-pedir')
// const smallPuntajeJugador = document.querySelector('small')
const btnDetener = document.querySelector('#btn-detener')
const btnNuevo = document.querySelector('#btn-nuevo')

const puntsHTML = document.querySelectorAll('small')
const divJugadorCartas = document.querySelector('#jugador-cartas')
const divComputadoraCartas = document.querySelector('#computadora-cartas')

const crearBaraja = () => {
  //Se ha pobrlado el arreglo con los números y tipos de la baraja
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      baraja.push(i + tipo)
    }
  }
  //Se ha poblado el arreglo con letras y con tipos de la baraja
  for (let letra of letras) {
    for (let tipo of tipos) baraja.push(letra + tipo)
  }

  baraja = _.shuffle(baraja)
}

crearBaraja()

// console.log(baraja)

//Esta funcion pide una carta

const pedirCarta = () => {
  const barajaTamanio = baraja.length
  if (barajaTamanio === 0) throw 'No hay cartas en la baraja'

  const index = Math.floor(Math.random() * barajaTamanio)
  // console.log({ index })
  const carta = baraja.splice(index, 1)[0]
  // console.log({ carta })
  //   console.log(baraja)
  return carta
}

// pedirCarta()

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
}

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta()
    puntosComputadora += valorCarta(carta)
    puntsHTML[1].innerText = puntosComputadora

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divComputadoraCartas.append(imgCarta)

    if (puntosMinimos > 21) break
  } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21)

  setTimeout(() => {
    if (puntosMinimos === puntosComputadora) alert('hubo empate')
    else if (puntosMinimos > 21) alert('computadora gana')
    else if (puntosComputadora > 21) alert('Súper, ganaste')
    else alert('La computadora gana')
  }, 100)
}

//Eventos

btnPedir.addEventListener('click', () => {
  // console.log('click')
  const carta = pedirCarta()
  // console.log({ carta })
  puntosJugador += valorCarta(carta)
  console.log({ puntosJugador })
  puntsHTML[0].innerText = puntosJugador

  // /* <img class="carta" src="assets/cartas/grey_back.png" alt="" /> */

  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divJugadorCartas.append(imgCarta)

  if (puntosJugador > 21) {
    btnPedir.disabled = true
    btnDetener.disabled = true
    console.warn('lo siento, has perdido')
    turnoComputadora(puntosJugador)
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true
    btnDetener.disabled = true
    console('Genial has ganado a la maquina')
    turnoComputadora(puntosJugador)
  }
})

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', () => {
  puntosJugador = 0
  puntosComputadora = 0
  btnPedir.disabled = false
  btnDetener.disabled = false
  puntsHTML[0].innerText = 0
  puntsHTML[1].innerText = 0
  divJugadorCartas.innerText = ''
  divComputadoraCartas.innerText = ''
  console.clear()
  crearBaraja()
})
