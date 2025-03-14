const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement;
const navLinks = document.querySelector(".nav-links") as HTMLElement;

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

