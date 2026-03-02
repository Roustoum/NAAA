// Initialisation de l'accordéon FAQ
function initAccordionCSS() {
    document.querySelectorAll("[data-accordion-css-init]").forEach((accordion) => {
        // Vérifie si on doit fermer les autres sections quand on en ouvre une
        const closeSiblings = "true" === accordion.getAttribute("data-accordion-close-siblings");

        accordion.addEventListener("click", (e) => {
            // Trouve la section faq__item cliquée
            const section = e.target.closest("[data-accordion-status]");
            if (!section) return;

            // Évite de déclencher l'animation si on clique sur du contenu interactif à l'intérieur
            // (au cas où vous auriez des liens ou boutons plus tard)
            if (e.target.closest("a, button, [role='button']")) return;

            // Vérifie l'état actuel de la section
            const isActive = "active" === section.getAttribute("data-accordion-status");

            // Change l'état (active → not-active ou vice-versa)
            section.setAttribute("data-accordion-status", isActive ? "not-active" : "active");

            // Si l'option closeSiblings est activée ET qu'on vient d'ouvrir une section
            if (closeSiblings && !isActive) {
                // Trouve toutes les sections actives et les ferme (sauf celle qu'on vient d'ouvrir)
                accordion.querySelectorAll('[data-accordion-status="active"]').forEach((otherSection) => {
                    if (otherSection !== section) {
                        otherSection.setAttribute("data-accordion-status", "not-active");
                    }
                });
            }
        });
    });
}

// Lance l'initialisation quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    initAccordionCSS();
});