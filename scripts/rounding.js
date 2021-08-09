// Округление до четырёх знаков после запятой
export function roundToFixed(value) {
  return value == null ? value : value.toFixed(8)
}

export function roundToFixedArray(values) {
  return values
    .map(function (value) {
      return roundToFixed(value)
    })
    .join(', ')
}
