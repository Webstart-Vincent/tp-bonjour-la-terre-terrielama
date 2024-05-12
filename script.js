/** @type {HTMLElement} */
const previousButton = document.querySelector('.bi-chevron-left')

/** @type {HTMLElement} */
const nextButton = document.querySelector('.bi-chevron-right')

/** @type {HTMLElement} */
const slidesContainer = document.querySelector('.slides-container')

/** @type {HTMLElement} */
const body = document.querySelector('body')

/** @type {NodeListOf<HTMLElement>} */
const sections = document.querySelectorAll('section')

/** @type {NodeListOf<HTMLElement>} */
const bullets = document.querySelectorAll('.bullets > button')

const locationItems = document.querySelectorAll('.location-item')
const weatherDescription = document.querySelector('.weather-description')
const weatherTemperature = document.querySelector('.weather-temperature')
const weatherIcon = document.querySelector('.weather-icon')

// -----------------------------------------
let index = 0
const maxIndex = 2

const setUi = () => {
  if (index === 0) previousButton.style.display = 'none'
  else previousButton.style.display = 'grid'

  if (index === maxIndex) nextButton.style.display = 'none'
  else nextButton.style.display = 'grid'

  slidesContainer.style.transform = `translateX(-${index * 100}%)`

  const { backgroundColor } = getComputedStyle(sections[index])
  body.style.backgroundColor = backgroundColor

  for (const bullet of bullets) bullet.classList.remove('active')
  bullets[index].classList.add('active')
}
setUi()

previousButton.addEventListener('click', () => {
  if (index > 0) index--
  setUi()
})
nextButton.addEventListener('click', () => {
  if (index < maxIndex) index++
  setUi()
})

const touchData = {
  carouselWidth: slidesContainer.offsetWidth,
  startTouchX: 0,
  lastDeltaX: 0,
}

slidesContainer.addEventListener('touchstart', (e) => {
  touchData.startTouchX = e.touches[0].screenX
  touchData.carouselWidth = slidesContainer.offsetWidth
  slidesContainer.style.transition = 'none'
})

slidesContainer.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].screenX - touchData.startTouchX

  if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0)) return

  touchData.lastDeltaX = deltaX

  const basePercentTranslate = index * -100
  const percentTranslate =
    basePercentTranslate + (100 * deltaX) / touchData.carouselWidth
  slidesContainer.style.transform = `translate(${percentTranslate}%)`
})

slidesContainer.addEventListener('touchend', (e) => {
  if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
    if (index !== 0 && touchData.lastDeltaX > 0) index--
    if (index !== maxIndex && touchData.lastDeltaX < 0) index++
  }
  slidesContainer.style.transition = ''
  setUi()
})

for (let i = 0; i < bullets.length; i++)
  bullets[i].addEventListener('click', () => {
    index = i
    setUi()
  })

// -------------------------------------



// Fonction pour récupérer les données météorologiques d'un lieu
function getWeatherData(lat, lon, lang, units, appid) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${appid}`;

  // Effectuer une requête fetch vers l'API OpenWeather
  fetch(apiUrl)
    .then((response) => {
      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error('Erreur de récupération des données météorologiques.')
      }
      // Si la requête est réussie, analyser la réponse JSON
      return response.json()
    })
    .then((data) => {
      // Traiter les données météorologiques
      const weatherDescription = data.weather[0].description; // Description météo
      const temperature = data.main.temp; // Température

      // Utilisez ces données comme vous le souhaitez, par exemple :
      console.log('Description météo :', weatherDescription);
      console.log('Température :', temperature);
    })
    .catch((error) => {
      // Gérer les erreurs de récupération des données météorologiques
      console.error('Erreur :', error);
    })
    .finally(() => {
      // Passer à la prochaine clé API dans le tableau
      apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
    });
}


// Exemple d'utilisation : récupérer les données météorologiques de l'Alaska
// getWeatherData(61.989154, -154.467778)
// ou de paris
// getWeatherData(48.8566, 2.3522);
