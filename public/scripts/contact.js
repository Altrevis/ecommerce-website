console.log('contact.js chargé');

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupère les valeurs saisies dans le formulaire
            const data = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value
            };

            // Envoie les données au backend via une requête POST
            fetch('http://localhost:8000/user/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // Si l'envoi a réussi, affiche une alerte de succès et réinitialise le formulaire
                if (data.success) {
                    alert('Votre message a bien été envoyé !');
                    contactForm.reset();
                } else {
                    // Sinon, affiche une alerte d'erreur
                    alert('Erreur lors de l\'envoi du message.');
                }
            })
            .catch(error => {
                // En cas d'erreur réseau ou autre, affiche une alerte d'erreur
                alert('Erreur lors de l\'envoi du message.');
            });
        });
    }
});