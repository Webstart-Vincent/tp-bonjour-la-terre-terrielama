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

// ----------const puces--------
const puce1 = document.querySelector('.puce1');
const puce2 = document.querySelector('.puce2');
const puce3 = document.querySelector('.puce3');
const puces = document.querySelectorAll('.puce');


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
  // updatePuces(index);
  setUi()
})
nextButton.addEventListener('click', () => {
  if (index < maxIndex) index++
  // updatePuces(index);
  setUi()
})


// ---------------------touchstart----------------------

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
  touchData.startTouchX = e.touches[0].screenX; 
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

    if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) 
    {
      if (index !== 0 && touchData.lastDeltaX > 0) index--
      if (index !== maxIndex && touchData.lastDeltaX < 0) index++
    }

  slidesContainer.style.transition = ''
  // Mettre à jour l'interface utilisateur
    setUi()
})



// mettre à jour l'affichage en fonction de l'index
const updateSlide = (index) => {
  const slideWidth = slidesContainer.offsetWidth;
  slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;

  
// ------------------puces----------------------------

 
puces.forEach((puce, i) => {
  if (i === index) 
    {
      puce.classList.add('active'); 
   } else 
      {
      puce.classList.remove('active');
    }
  });
};

  // fonction pour que le background change quand on click
const updateBackgroundColor = (index) => {
  const { backgroundColor } = getComputedStyle(sections[index]);
  body.style.backgroundColor = backgroundColor;
  console.log()
};


puces.forEach((puce, i) => {
  puce.addEventListener('click', () => {
    updateSlide(i); // Mettre à jour la diapositive lorsque la puce est cliquée
    index = i;
    setUi(); 
  });
});

// -----------------click sur les puces--------------

puce1.addEventListener('click', () => {
  updateSlide(0);
  updateBackgroundColor(0);
  index = 0; 
  puce1.classList.add('active');
  puce2.classList.remove('active');
  puce3.classList.remove('active');
  setUi();
});

puce2.addEventListener('click', () => {
  updateSlide(1);
  updateBackgroundColor(1);
  index = 1; 
  puce2.classList.add('active');
  puce1.classList.remove('active');
  puce3.classList.remove('active');
  setUi(); 
});

puce3.addEventListener('click', () => {
  updateSlide(2);
  updateBackgroundColor(2);
  index = 2; 
  puce3.classList.add('active');
  puce1.classList.remove('active');
  puce2.classList.remove('active');
   setUi(); 
});




// const updatePuces = (index) => {
//   puces.forEach((puce, i) => {
//     if (i === index) {
//       puce.style.backgroundColor = "#94ce5a";
//       puce.style.border = "#21315a 2px solid";
//       puce.style.width = "20px";
//       puce.style.height = "20px";
//     } else {
//       puce.style.backgroundColor = "#21315a";
//       puce.style.border = "#94ce5a 2px solid";
//       puce.style.width = "15px";
//       puce.style.height = "15px";
//     }
//   });
// };



// -----------------click sur les puces--------------


// puce1.addEventListener('click', () => {
//   index = 0;
//   updateSlide(index);
//   updateBackgroundColor(index);
//   updatePuces(index); 
//   setUi(); 
// });

// puce2.addEventListener('click', () => {
//   index = 1;
//   updateSlide(index);
//   updateBackgroundColor(index);
//   updatePuces(index); 
//   setUi(); 
// });

// puce3.addEventListener('click', () => {
//   index = 2;
//   updateSlide(index);
//   updateBackgroundColor(index);
//   updatePuces(index); 
//   setUi(); 
// });