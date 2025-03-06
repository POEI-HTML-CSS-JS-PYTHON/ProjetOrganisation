// Scroll du header
window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("header-fixed");
    } else {
        header.classList.remove("header-fixed");
    }
});

// Active boutton ville
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("#cont-sec button");

    let activeButton = document.querySelector("#active-v");
    activeButton.classList.add("active-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            activeButton.classList.remove("active-btn");

            this.classList.add("active-btn");

            activeButton = this;
        });
    });
});

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    for (let slide of slides) {
        slide.classList.remove('active');
    }
    slides[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1; // Retour à la dernière diapositive
    } else if (currentSlide >= slides.length) {
        currentSlide = 0; // Retour à la première diapositive
    }
    showSlide(currentSlide);
}

// Montre la première diapositive au chargement
showSlide(currentSlide);