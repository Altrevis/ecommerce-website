// Attend que le DOM soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm'); // Récupère le formulaire d'identification
    if (!form) return; // Si le formulaire n'existe pas, on arrête le script

    // Ajoute un écouteur sur la soumission du formulaire
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupère les données du formulaire
        const data = {
            email: form.email.value,
            password: form.password.value
        };

        // Envoie une requête POST à l'API pour tenter de se connecter
        const response = await fetch('http://localhost:8000/?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // On indique qu'on envoie du JSON
            body: JSON.stringify(data) // On transforme les données JS en JSON
        });

        const result = await response.json(); // Parse la réponse en JSON

        if (result.user) {
            // Si l'utilisateur est reconnu, on stocke son email dans le localStorage
            localStorage.setItem('userEmail', result.user.email);

            // Et on redirige vers la page d'accueil
            window.location.href = 'Accueil.html';
        } else {
            // Si l'authentification échoue, on affiche un message d'erreur

            let errorDiv = document.getElementById('login-error'); // Vérifie si une div d'erreur existe déjà
            if (!errorDiv) {
                // Si elle n'existe pas, on la crée
                errorDiv = document.createElement('div');
                errorDiv.id = 'login-error';
                errorDiv.style.color = 'red'; // On colore le texte en rouge
                form.prepend(errorDiv); // On l'ajoute au début du formulaire
            }
            errorDiv.textContent = 'Identifiants incorrects.'; // Message d'erreur
        }
    });
});
