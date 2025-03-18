document.addEventListener("DOMContentLoaded", () => {
    preventAnchorJump();
    setupEmailValidation();
    initializeCarousel(".carousel-track", ".carousel-slide", ".carousel-dots");
    initializeCarousel(".opinions-track", ".opinions-slide", ".opinions-dots");
});


function preventAnchorJump(): void {
    document.querySelectorAll<HTMLAnchorElement>("a").forEach(link => {
        link.addEventListener("click", event => {
            if (link.getAttribute("href") === "#") {
                event.preventDefault();
            }
        });
    });
}

function setupEmailValidation(): void {
    const emailForm = document.getElementById("emailForm") as HTMLFormElement | null;
    const emailInput = document.getElementById("email-input") as HTMLInputElement | null;
    const messageContainer = document.getElementById("email-message-container") as HTMLDivElement | null;

    if (emailForm && emailInput && messageContainer) {
        emailForm.addEventListener("submit", event => {
            event.preventDefault();
            validateEmail(emailInput, messageContainer);
        });
    }
}

function validateEmail(emailInput: HTMLInputElement, messageContainer: HTMLDivElement): void {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailInput.style.borderColor = "red";
        emailInput.style.color = "red";
        emailInput.value = "";
        emailInput.placeholder = "E-mail inválido!";
        showMessage(messageContainer, "Por favor, insira um e-mail válido.", "error-message");
    } else {
        emailInput.style.borderColor = "green";
        emailInput.style.color = "green";
        emailInput.value = "";
        emailInput.placeholder = "E-mail válido!";
        showMessage(messageContainer, "E-mail enviado com sucesso!", "success-message");
    }
}


function showMessage(container: HTMLDivElement, message: string, className: string): void {
    container.textContent = message;
    container.classList.add(className);
    container.style.display = "block";

    setTimeout(() => {
        container.style.display = "none";
    }, 3000);
}

/**
 * @param trackSelector 
 * @param slideSelector 
 * @param dotsSelector 
 */
function initializeCarousel(trackSelector: string, slideSelector: string, dotsSelector: string): void {
    const track = document.querySelector(trackSelector) as HTMLElement | null;
    const slides = document.querySelectorAll(slideSelector) as NodeListOf<HTMLElement>;
    const dotsContainer = document.querySelector(dotsSelector) as HTMLElement | null;

    if (!track || !dotsContainer || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel(track, dotsContainer, totalSlides, currentIndex);
        });

        dotsContainer.appendChild(dot);
    });
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(track, dotsContainer, totalSlides, currentIndex);
    }, 5000);

    updateCarousel(track, dotsContainer, totalSlides, currentIndex);
}

function updateCarousel(track: HTMLElement, dotsContainer: HTMLElement, totalSlides: number, currentIndex: number): void {
    const offset = currentIndex * -100;
    track.style.transform = `translateX(${offset}%)`;
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}
