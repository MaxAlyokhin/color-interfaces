// Обработчики событий
// Переменные для хранения абсолютных значений (без отрицательных)
let absoluteMotionAlpha = 0
let absoluteMotionBeta = 0
let absoluteMotionGamma = 0

function onMotion(event) {
  // Избавляемся от отрицательных значений и домножаем для эффектности

  absoluteMotionAlpha = Math.abs(event.acceleration.x)
  absoluteMotionBeta = Math.abs(event.acceleration.y)
  absoluteMotionGamma = Math.abs(event.acceleration.z)

  colorized()
}

// Раскрашиваем
let bodyElem = document.querySelector('body')
let colorElem = document.querySelector('.color')

let effect = 15 // Чувствительность

function colorized() {
  bodyElem.style.backgroundColor = `rgb(${absoluteMotionAlpha * effect},${absoluteMotionBeta * effect},${absoluteMotionGamma * effect})`

  document.querySelector('#motionAlphaValue').innerHTML = absoluteMotionAlpha.toFixed()
  document.querySelector('#motionBetaValue').innerHTML = absoluteMotionBeta.toFixed()
  document.querySelector('#motionGammaValue').innerHTML = absoluteMotionGamma.toFixed()

  document.querySelector('#motionRedness').innerHTML = `${((absoluteMotionAlpha * 100 * effect) / 256).toFixed(6)} %`
  document.querySelector('#motionGreenness').innerHTML = `${((absoluteMotionBeta * 100 * effect) / 256).toFixed(6)} %`
  document.querySelector('#motionBluenness').innerHTML = `${((absoluteMotionGamma * 100 * effect) / 256).toFixed(6)} %`
}

// Если события поддерживаются, то вешаем обработчик
export function motionInterface() {
  // iOS 13
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response == 'granted') {
          // Если разрешили, то вешаем соответствующий обработчик
          window.addEventListener('devicemotion', onMotion)
        }
      })
      .catch(console.error)
  }

  // iOS 12 и Android
  else if ('ondevicemotion' in window) {
    window.addEventListener('devicemotion', onMotion)
  }

  // Нет акселерометра
  else {
    document.querySelector('#motionSupported').innerHTML = 'Error: accelerometer is not supported.<br>Ошибка: акселерометр не поддерживается.<br>'
  }
}

// Отвязываем слушатели событий при переключении
export function exitFromMotion() {
  window.removeEventListener('devicemotion', onMotion)
}
