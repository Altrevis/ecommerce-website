// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Affiche un message dans la console pour indiquer que le script principal est chargé
    console.log('Main script loaded');

    // Sélectionne tous les liens de navigation dans la barre de navigation
    const navLinks = document.querySelectorAll('nav a');
    // Pour chaque lien de navigation, ajoute un écouteur d'événement au clic
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Affiche dans la console l'URL vers laquelle l'utilisateur souhaite naviguer
            console.log(`Navigating to ${event.target.href}`);
        });
    });
});