import { orientationInterface, exitFromOrientation } from '/scripts/orientation.js'
import { timeInterface, exitFromTime } from '/scripts/time.js'
import { motionInterface, exitFromMotion } from '/scripts/motion.js'
import { resolution } from '/scripts/resolution.js'

function main() {
  let clickForLanguage = null

  const langMarkerFromURL = document.location.search.slice(1)

  if (langMarkerFromURL === 'ru') {
    clickForLanguage = false
  } else if (langMarkerFromURL === 'en') {
    clickForLanguage = true
  } else {
    clickForLanguage = 'ru' == navigator.language.slice(0, 2) ? false : true
  }

  let allRu = document.querySelectorAll('.ru')
  let allEn = document.querySelectorAll('.en')

  document.querySelector('.resolution').innerHTML = resolution()

  function languageChange() {
    if (clickForLanguage) {
      for (let i = 1; i < allRu.length; i++) {
        allRu[0].style.opacity = 0
        allRu[i].style.opacity = 0
        allEn[0].style.display = 'block'
        allEn[i].style.display = 'inline'

        setTimeout(() => {
          allRu[0].style.display = 'none'
          allRu[i].style.display = 'none'
          allEn[0].style.opacity = 1
          allEn[i].style.opacity = 1
        }, 1000)
      }
      clickForLanguage = 0
      document.querySelector('.resolution-en').innerHTML = resolution()
    } else {
      for (let i = 1; i < allRu.length; i++) {
        allEn[0].style.opacity = 0
        allEn[i].style.opacity = 0
        setTimeout(() => {
          allEn[0].style.display = 'none'
          allEn[i].style.display = 'none'
          allRu[0].style.display = 'block'
          allRu[i].style.display = 'inline'
        }, 1000)
        setTimeout(() => {
          allRu[0].style.opacity = 1
          allRu[i].style.opacity = 1
        }, 1500)
      }
      clickForLanguage = 1
    }
  }

  languageChange()

  // Управление языком
  document.querySelector('.language').addEventListener('click', function () {
    languageChange()
  })

  // Управление двойным тапом
  let count = 0
  let tapped = false
  let click = 0

  document.querySelector('html').addEventListener('touchstart', function (event) {
    if (!tapped) {
      tapped = setTimeout(() => {
        tapped = null
        // Один тап
      }, 300) // В течение 300 мс ждём следующий тап
    } else if (click == 0 && count !== 0 && event.touches.length == 1) {
      // Обработка двойного тапа
      clearTimeout(tapped) // Тормозим таймаут
      tapped = null
      document.querySelector('.container').style.display = 'none'
      click = 1
    } else if (click == 1 && count !== 0 && event.touches.length == 1) {
      // Если двойной тап повторился, показываем обратно интерфейс
      clearTimeout(tapped)
      tapped = null
      document.querySelector('.container').style.display = 'block'
      click = 0
    }
  })

  document.querySelector('#zero').onclick = function () {
    count = 0
    menu()
  }
  document.querySelector('#one').onclick = function () {
    count = 1
    menu()
  }
  document.querySelector('#two').onclick = function () {
    count = 2
    menu()
  }
  document.querySelector('#tree').onclick = function () {
    count = 3
    menu()
  }

  function menu() {
    switch (count) {
      case 0:
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000)

        document.querySelector('.greetings').style.display = 'block'
        setTimeout(() => {
          document.querySelector('.greetings').style.opacity = 1
        }, 1000)

        document.querySelector('.orientation').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.orientation').style.display = 'none'
        }, 1000)
        exitFromOrientation()

        document.querySelector('.time').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.time').style.display = 'none'
        }, 1000)
        exitFromTime()

        document.querySelector('body').style.transition = 'all 1000ms'
        document.querySelector('body').style.backgroundColor = 'white'
        document.querySelector('.motion').style.opacity = 0
        document.querySelector('.footer').style.filter = `none`
        document.querySelector('.footer').classList.remove('white')
        setTimeout(() => {
          document.querySelector('.motion').style.display = 'none'
        }, 1000)
        exitFromMotion()

        break
      case 1:
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000)

        document.querySelector('.greetings').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.greetings').style.display = 'none'
        }, 1000)

        setTimeout(() => {
          document.querySelector('.orientation').style.opacity = 1
        }, 1000)
        document.querySelector('.orientation').style.display = 'block'
        orientationInterface()

        document.querySelector('.time').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.time').style.display = 'none'
        }, 1000)
        document.querySelector('.footer').style.filter = `none`
        exitFromTime()

        document.querySelector('body').style.transition = 'all 1000ms'
        document.querySelector('.motion').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.motion').style.display = 'none'
        }, 1000)
        setTimeout(() => {
          document.querySelector('.footer').classList.remove('white')
        }, 1000)
        exitFromMotion()

        break
      case 2:
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000)

        document.querySelector('.greetings').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.greetings').style.display = 'none'
        }, 1000)

        document.querySelector('.orientation').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.orientation').style.display = 'none'
        }, 1000)
        exitFromOrientation()

        setTimeout(() => {
          document.querySelector('.time').style.opacity = 1
        }, 1000)
        document.querySelector('.time').style.display = 'block'
        timeInterface()

        document.querySelector('body').style.transition = 'all 1000ms'
        document.querySelector('.motion').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.motion').style.display = 'none'
        }, 1000)
        setTimeout(() => {
          document.querySelector('.footer').classList.remove('white')
        }, 1000)
        exitFromMotion()

        break
      case 3:
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 1000)

        document.querySelector('.greetings').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.greetings').style.display = 'none'
        }, 1000)

        document.querySelector('.orientation').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.orientation').style.display = 'none'
        }, 1000)
        exitFromOrientation()

        document.querySelector('.time').style.opacity = 0
        setTimeout(() => {
          document.querySelector('.time').style.display = 'none'
        }, 1000)
        document.querySelector('.footer').style.filter = `none`
        exitFromTime()

        setTimeout(() => {
          document.querySelector('.motion').style.opacity = 1
        }, 1000)
        document.querySelector('.motion').style.display = 'block'
        setTimeout(() => {
          document.querySelector('.footer').classList.add('white')
        }, 1000)
        setTimeout(() => {
          document.querySelector('body').style.transition = 'all 0ms'
        }, 1500)
        document.querySelector('body').style.backgroundColor = 'black'
        motionInterface()

        break
    }
  }
}

main()
