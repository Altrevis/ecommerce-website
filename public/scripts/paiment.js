// Attend que le DOM soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {
    // Récupère le formulaire de paiement par son ID
    const paymentForm = document.getElementById('payment-form');
    
    // Vérifie que le formulaire existe sur la page
    if (paymentForm) {
        // Ajoute un écouteur d'événement sur la soumission du formulaire
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page
            processPayment(); // Appelle la fonction de traitement du paiement
        });
    }

    // Fonction pour traiter le paiement
    function processPayment() {
        // Récupère les valeurs saisies dans le formulaire de paiement
        const paymentData = {
            cardNumber: document.getElementById('card-number').value,
            expirationDate: document.getElementById('expiration-date').value,
            cvv: document.getElementById('cvv').value,
            amount: document.getElementById('amount').value
        };

        // Affiche les données de paiement dans la console (à remplacer par un appel backend réel)
        console.log('Processing payment...', paymentData);
    }
});