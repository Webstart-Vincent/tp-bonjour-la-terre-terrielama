
const previousButton = document.querySelector('.bi-chevron-left')
const nextButton = document.querySelector('.bi-chevron-right')
const slidesContainer = document.querySelector('.deplacement')
const bodyColor = document.querySelector("body");
let index = 0
const maxIndex = 2

// ---------------Changer la couleur du fond (body)----------------------------

const setUi = () => {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    if (index == 0) {
        bodyColor.style.backgroundColor = `#242830`;
    } else if (index == 1) {
        bodyColor.style.backgroundColor = `#f5f7f8`;
    } else if (index == 2) {
        bodyColor.style.backgroundColor = `#000`;
    }

//----------------Afficher ou cacher les boutons----------------

    if (index == 0) {
        previousButton.style.visibility = `hidden`;
    } else {
        previousButton.style.visibility = `visible`;
    }
    if (index == 1) {
        previousButton.style.visibility = `visible`;
    } 
    
    if (index == 2) {
        nextButton.style.visibility = `hidden`;
    } else {
        nextButton.style.visibility = `visible`;
    }
};

previousButton.addEventListener("click", () => {
    if (index > 0) index--;

    setUi();
});
nextButton.addEventListener("click", () => {
    if (index < maxIndex) index++;

    setUi();
});
  
  
  
  
  
  
  
  
