const MobileMenu = document.getElementById("MobileMenu");
const MobileBackdrop = document.getElementById("MobileBackdrop");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuToggle1 = document.getElementById("mobileMenuToggle1");

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        // Ouvrir le menu
        MobileMenu.classList.remove("-translate-x-full");
        MobileMenu.classList.add("translate-x-0");

        // Afficher le backdrop
        MobileBackdrop.classList.remove("opacity-0", "pointer-events-none", "-translate-x-full");
        MobileBackdrop.classList.add("opacity-100", "pointer-events-auto", "translate-x-0");
    } else {
        // Fermer le menu
        MobileMenu.classList.remove("translate-x-0");
        MobileMenu.classList.add("-translate-x-full");

        // Cacher le backdrop
        MobileBackdrop.classList.remove("opacity-100", "pointer-events-auto", "translate-x-0");
        MobileBackdrop.classList.add("opacity-0", "pointer-events-none", "-translate-x-full");
    }
}

// Écouteur d'événement pour le bouton toggle
mobileMenuToggle.addEventListener("click", toggleMenu);
mobileMenuToggle1.addEventListener("click", toggleMenu);

// Fermer le menu quand on clique sur le backdrop
MobileBackdrop.addEventListener("click", toggleMenu);

// Fermer le menu avec la touche Échap
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen) {
        toggleMenu();
    }
});