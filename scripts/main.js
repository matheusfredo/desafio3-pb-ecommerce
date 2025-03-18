document.addEventListener("DOMContentLoaded", function () {
    preventAnchorJump();
    setupEmailValidation();
    initializeCarousel(".carousel-track", ".carousel-slide", ".carousel-dots");
    initializeCarousel(".opinions-track", ".opinions-slide", ".opinions-dots");
});
function preventAnchorJump() {
    document.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();
            }
        });
    });
}
function setupEmailValidation() {
    var emailForm = document.getElementById("emailForm");
    var emailInput = document.getElementById("email-input");
    var messageContainer = document.getElementById("email-message-container");
    if (emailForm && emailInput && messageContainer) {
        emailForm.addEventListener("submit", function (event) {
            event.preventDefault();
            validateEmail(emailInput, messageContainer);
        });
    }
}
function validateEmail(emailInput, messageContainer) {
    var email = emailInput.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailInput.style.borderColor = "red";
        emailInput.style.color = "red";
        emailInput.value = "";
        emailInput.placeholder = "E-mail inválido!";
        showMessage(messageContainer, "Por favor, insira um e-mail válido.", "error-message");
    }
    else {
        emailInput.style.borderColor = "green";
        emailInput.style.color = "green";
        emailInput.value = "";
        emailInput.placeholder = "E-mail válido!";
        showMessage(messageContainer, "E-mail enviado com sucesso!", "success-message");
    }
}
function showMessage(container, message, className) {
    container.textContent = message;
    container.classList.add(className);
    container.style.display = "block";
    setTimeout(function () {
        container.style.display = "none";
    }, 3000);
}
/**
 * @param trackSelector
 * @param slideSelector
 * @param dotsSelector
 */
function initializeCarousel(trackSelector, slideSelector, dotsSelector) {
    var track = document.querySelector(trackSelector);
    var slides = document.querySelectorAll(slideSelector);
    var dotsContainer = document.querySelector(dotsSelector);
    if (!track || !dotsContainer || slides.length === 0)
        return;
    var currentIndex = 0;
    var totalSlides = slides.length;
    slides.forEach(function (_, index) {
        var dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (index === 0)
            dot.classList.add("active");
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateCarousel(track, dotsContainer, totalSlides, currentIndex);
        });
        dotsContainer.appendChild(dot);
    });
    setInterval(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(track, dotsContainer, totalSlides, currentIndex);
    }, 5000);
    updateCarousel(track, dotsContainer, totalSlides, currentIndex);
}
function updateCarousel(track, dotsContainer, totalSlides, currentIndex) {
    var offset = currentIndex * -100;
    track.style.transform = "translateX(".concat(offset, "%)");
    var dots = dotsContainer.querySelectorAll("button");
    dots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === currentIndex);
    });
}
