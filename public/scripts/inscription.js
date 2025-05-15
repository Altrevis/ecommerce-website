// Attend que le DOM soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    // Récupère le formulaire d'inscription par son ID
    const form = document.getElementById('registerForm');
    if (!form) return; // Si le formulaire n'existe pas, on arrête le script

    // Ajoute un écouteur d'événement sur la soumission du formulaire
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupère les données saisies par l'utilisateur
        const data = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        };

        // Envoie une requête POST à l'API pour tenter l'inscription
        const response = await fetch('http://localhost:8000/?action=register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Récupère la réponse JSON du serveur
        const result = await response.json();

        if (result.success) {
            // Si l'inscription a réussi, redirige vers la page d'accueil
            window.location.href = 'Accueil.html';
        } else {
            // Affiche une alerte en cas d'erreur
            alert('Erreur lors de l\'inscription.');
        }
    });
});