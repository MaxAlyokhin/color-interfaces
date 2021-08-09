// Обработчики событий
// Переменные для хранения абсолютных значений с датчиков (без отрицательных)

let absoluteAlpha = 0
let absoluteBeta = 0
let absoluteGamma = 0

function onOrientation(event) {
  // Избавляемся от отрицательных значений
  // Отнимаем 180, чтобы не было резкого перехода с 360 на 0, а затем ещё раз отнимаем, чтобы инвертировать значения и сделать "север" чёрным

  if (typeof event.webkitCompassHeading === 'undefined') {
    absoluteAlpha = Math.abs(Math.abs(event.alpha - 180) - 180)
  } else {
    absoluteAlpha = Math.abs(Math.abs(event.webkitCompassHeading - 180) - 180)
  }

  absoluteBeta = Math.abs(event.beta)
  absoluteGamma = Math.abs(event.gamma)

  //   document.querySelector("#orientationAlphaValue").innerHTML = `${roundToFixed(absoluteAlpha)}`;
  document.querySelector('#orientationAlphaValue').innerHTML = absoluteAlpha.toFixed(1)
  document.querySelector('#orientationBetaValue').innerHTML = absoluteBeta.toFixed(1)
  document.querySelector('#orientationGammaValue').innerHTML = absoluteGamma.toFixed(1)

  document.querySelector('#orientationRedness').innerHTML = `${(((absoluteAlpha / alphaRed) * 100) / 256).toFixed(3)} %`
  document.querySelector('#orientationGreenness').innerHTML = `${(((absoluteBeta / alphaRed) * 100) / 256).toFixed(3)} %`
  document.querySelector('#orientationBluenness').innerHTML = `${(((absoluteGamma / alphaRed) * 100) / 256).toFixed(3)} %`

  // Нахлабучиваем контрастность в зависимости от цвета
  // document.querySelector('.footer').style.filter = `invert(0.${100 - (( Math.round((((absoluteAlpha / alphaRed) * 100) / 256 )) + Math.round((((absoluteBeta / betaGreen) * 100) / 256 )) + Math.round((((absoluteGamma / gammaBlue) * 100) / 256 )) ) / 3 )})`;
  // document.querySelector('.orientation').style.filter = `invert(0.${100 - (( Math.round((((absoluteAlpha / alphaRed) * 100) / 256 )) + Math.round((((absoluteBeta / betaGreen) * 100) / 256 )) + Math.round((((absoluteGamma / gammaBlue) * 100) / 256 )) ) / 3 )})`;

  if ('oncompassneedscalibration' in window) {
    document.querySelector('#compassneedscalibration').innerHTML = `Компас нуждается в калибровке`
  }

  colorized()
}

// Получаем коэффициенты "цветности" координат - делим градусы на количество цветов каждого субпикселя
let alphaRed = 180 / 256
let betaGreen = 180 / 256
let gammaBlue = 90 / 256

let bodyElem = document.querySelector('body')
let colorElem = document.querySelector('.color')

// Раскрашиваем
function colorized() {
  bodyElem.style.backgroundColor = `rgb(${absoluteAlpha / alphaRed - 1},${absoluteBeta / betaGreen - 1},${absoluteGamma / gammaBlue - 1})`
  // colorElem.innerHTML = `Цвет пространства: ${bodyElem.style.backgroundColor},<br> event.webkitCompassHeading = ${event.webkitCompassHeading},<br> DeviceOrientationEvent.absolute = ${DeviceOrientationEvent.absolute}`;
}

// Если события поддерживаются, то вешаем обработчик
// Сначала проверяем наличие компаса; если его нет, то альфа будет относительно начального положения устройства
export function orientationInterface() {
  // Если можем запросить разрешение - значит перед нами iOS 13
  // В iOS 13 необходимо запрашивать разрешение на доступ к датчикам
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response == 'granted') {
          // Если разрешили, то вешаем соответствующий обработчик
          window.addEventListener('deviceorientation', onOrientation)
        }
      })
      .catch(console.error)
  }

  // Для Android с компасом
  else if ('ondeviceorientationabsolute' in window) {
    window.addEventListener('deviceorientationabsolute', onOrientation)
  }

  // Android, но без компаса || iOS 12
  else if ('ondeviceorientation' in window) {
    window.addEventListener('deviceorientation', onOrientation)
    // document.querySelector("#orientationSupported").innerHTML = "Compass is not supported. Relative coordinates mode enabled.<br>Компас не поддерживается. Включён режим относительных координат.<br>";
  }

  // Android без компаса и гироскопа
  else {
    document.querySelector('#orientationSupported').innerHTML = 'Gyroscope is not supported.<br>Гироскоп не поддерживается.<br>'
  }
}

// Отвязываем слушатели событий при переключении
export function exitFromOrientation() {
  window.removeEventListener('deviceorientation', onOrientation)
  window.removeEventListener('deviceorientationabsolute', onOrientation)
}
