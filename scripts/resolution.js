export function resolution() {
  let subpixels = window.screen.width * Math.floor(window.devicePixelRatio) * (window.screen.height * Math.floor(window.devicePixelRatio)) * 3
  return subpixels
}
