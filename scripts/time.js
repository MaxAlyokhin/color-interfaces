import { roundToFixed } from '/scripts/rounding.js'
import { hslToRgb } from '/scripts/hsltorgb.js'

// Используем цветовое пространство HSL. У H максимум 360, а у S и L 100, поэтому работаем отдельно с H и отдельно с группой SL
let h = 0
let sl = 0
let timeInMilliseconds // Время в формате суммы миллисекунд
let bodyElement = document.querySelector('body') // Чтобы менять цвет фона
const colorCoefficientForH = 86400000 / 360 // Коэффициенты цветности времени (86400000 - сумма миллисекунд в сутках)
const colorCoefficientForSL = 86400000 / 100

// Переводим текущее время в сумму миллисекунд
function getTimeInMilliseconds() {
  let now = new Date()
  timeInMilliseconds = now.getHours() * 3600000 + now.getMinutes() * 60000 + now.getSeconds() * 1000 + now.getMilliseconds()
}

let intervalForTimeInterface
let rgbArray = [] // Массив из R, G и B
let regexp = /\d/ // Чтобы искать первую цифру в процентах (в 93 это будет 9)
let currentBackgroundColor // Среднее арифметическое из процентов цветностей
let currentFontColor // Сила инверсии для цвета шрифта

// После чего поддерживаем актуальность цвета
export function timeInterface() {
  intervalForTimeInterface = setInterval(() => {
    getTimeInMilliseconds()
    h = Math.floor(timeInMilliseconds / colorCoefficientForH)
    sl = Math.floor(timeInMilliseconds / colorCoefficientForSL)
    bodyElement.style.backgroundColor = `hsl(${h},${sl}%,${sl}%)`

    let now = new Date()
    document.querySelector('#currentTime').innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`

    rgbArray = hslToRgb(timeInMilliseconds / colorCoefficientForH, timeInMilliseconds / colorCoefficientForSL, timeInMilliseconds / colorCoefficientForSL)
    document.querySelector('#timeRedness').innerHTML = `${roundToFixed((rgbArray[0] * 100) / 255)} %`
    document.querySelector('#timeGreenness').innerHTML = `${roundToFixed((rgbArray[1] * 100) / 255)} %`
    document.querySelector('#timeBluenness').innerHTML = `${roundToFixed((rgbArray[2] * 100) / 255)} %`

    // Нахлабучиваем контрастность в зависимости от цвета
    currentBackgroundColor = ((rgbArray[0] * 100) / 255 + (rgbArray[1] * 100) / 255 + (rgbArray[2] * 100) / 255) / 3
    currentFontColor = Math.round(10 - currentBackgroundColor.toString().match(regexp))
    document.querySelector('.footer').style.filter = `invert(0.${currentFontColor - 5})`
    document.querySelector('.time').style.filter = `invert(0.${currentFontColor - 5})`
  }, 1)
}
// Функция остановки счёта времени
export function exitFromTime() {
  clearInterval(intervalForTimeInterface)
}
