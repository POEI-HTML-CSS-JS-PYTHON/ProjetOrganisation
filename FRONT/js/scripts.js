document.addEventListener("DOMContentLoaded", function () {
    // Scroll du header
    window.addEventListener("scroll", function () {
        let header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("header-fixed");
        } else {
            header.classList.remove("header-fixed");
        }
    })});