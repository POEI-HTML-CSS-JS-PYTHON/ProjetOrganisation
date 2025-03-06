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