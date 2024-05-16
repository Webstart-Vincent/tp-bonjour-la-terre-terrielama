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

      // Mettre à jour les éléments HTML avec les données météorologiques
      // Sélection des boutons de localisation


const weatherDescriptionElement = document.querySelector('.weather-condition');
    const weatherTemperatureElement = document.querySelector('.temperature');
    const weatherIconElement = document.querySelector('.weather-image');
    const locationButtons = document.querySelectorAll('.location-button, .location-subbutton');

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

// -----------------------meteo-------------------------------

  // Données météorologiques provenant du JSON
  const jsonWeatherData = [
    {
      "name": "France",
      "temperature": 19,
      "description": "Pluvieux",
      "icon": "09d"
    },
    {
      "name": "Alaska",
      "temperature": -10.58,
      "description": "Légères chutes de neige",
      "icon": "13n"
    },
    {
      "name": "Japon",
      "temperature": 17,
      "description": "Très nuageux",
      "icon": "04d"
    },
    {
      "name": "Mont Kilimanjaro",
      "temperature": 12,
      "description": "Partiellement nuageux",
      "icon": "02d"
    },
    {
      "name": "Mexique",
      "temperature": 18,
      "description": "Dégagé",
      "icon": "01n"
    }
  ];
  function updateWeatherInfo(index) {
    const weatherData = jsonWeatherData[index];
    if (weatherData) {
      weatherDescriptionElement.textContent = "Chargement...";
      weatherTemperatureElement.textContent = "";
      weatherIconElement.src = "./icons/loader.svg"; // Affichez le loader
  
      // Après 3 secondes, affichez les vraies données
      setTimeout(() => {
        weatherDescriptionElement.textContent = weatherData.description;
        weatherTemperatureElement.textContent = weatherData.temperature + ' °C';
        weatherIconElement.src = `./icons/${weatherData.icon}.svg`;
      }, 3000); // 3000 millisecondes = 3 secondes
    } else {
      console.error('Données météorologiques non trouvées.');
    }
  }
  
  // Écouteurs d'événements pour chaque bouton de localisation
  locationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      locationButtons.forEach(btn => btn.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      button.classList.add('active');
      // Mettre à jour les informations météorologiques
      updateWeatherInfo(index);
    });
  });
  
  // Affichage initial des données pour la première localisation
  updateWeatherInfo(0);
  


  // Écouteurs d'événements pour chaque bouton de localisation
  locationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      updateWeatherInfo(index);
    });
  });



  // Affichage initial des données pour la première localisation
  updateWeatherInfo(0);