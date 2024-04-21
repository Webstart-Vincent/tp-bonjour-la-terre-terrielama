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

const puce = document.querySelectorAll('.carousel-puce');

// ----------puces--------
const puce1 = document.querySelector('.puce1');
const puce2 = document.querySelector('.puce2');
const puce3 = document.querySelector('.puce3');


// ----------------Desktop------------------------------

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


// ----------------touchstart----------------------

const touchData = {

  carouselWidth: slidesContainer.offsetWidth, // Largeur du carrousel
  startTouchX: 0, // Position du doigt sur l’axe horizontal quand il commence à toucher l’écran
  lastDeltaX: 0, // Dernier mouvement connu du doigt sur l’axe horizontal

}


// J’écrirai la suite de mon code dans les accolades de chaque callback
slidesContainer.addEventListener('touchstart', (e) => 
{
slidesContainer.addEventListener('touchstart', (e) => {})
slidesContainer.addEventListener('touchmove', (e) => {})
slidesContainer.addEventListener('touchend', (e) => {})
})

slidesContainer.addEventListener('touchstart', (e) =>
 {
  touchData.startTouchX = e.touches[0].screenX; // Mettre à jour la position de départ du toucher
});

slidesContainer.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Empêcher le défilement par défaut
  
  const deltaX = e.touches[0].screenX - touchData.startTouchX;

  if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0)) return;

  touchData.lastDeltaX = deltaX;

  const basePercentTranslate = index * -100;
  const percentTranslate = basePercentTranslate + (100 * deltaX) / touchData.carouselWidth;
  slidesContainer.style.transform = `translateX(${percentTranslate}%)`; // Mettre à jour la transformation
});

// ----------------touchmove----------------------

slidesContainer.addEventListener('touchmove', (e) => 
{
  const deltaX = e.touches[0].screenX - touchData.startTouchX
  if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0)) return
  touchData.lastDeltaX = deltaX
  const basePercentTranslate = index * -100
  const percentTranslate =
    basePercentTranslate + (100 * deltaX) / touchData.carouselWidth
  slidesContainer.style.transform = `translate(${percentTranslate}%)`

})


// ------------------touchend-------------------------------

slidesContainer.addEventListener('touchend', (e) => {

  if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {

    if (index !== 0 && touchData.lastDeltaX > 0) index--

    if (index !== maxIndex && touchData.lastDeltaX < 0) index++

  }

  slidesContainer.style.transition = ''
  setUi()

})


// ------------------puce------------------------------


const updateSlide = (index) => {
  const slideWidth = slidesContainer.offsetWidth;
  slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  // Mettre à jour l'apparence des puces
  puces.forEach((puce, i) => {
    puce.classList.toggle('active', i === index);
  });
};

puce1.addEventListener('click', () => {
  updateSlide(0); 
});

puce2.addEventListener('click', () => {
  updateSlide(1); 
});

puce3.addEventListener('click', () => {
  updateSlide(2); 
});

// Initialiser le carrousel à la première diapositive
updateSlide(0);

