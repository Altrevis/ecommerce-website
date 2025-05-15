// Récupère l'email et le nom du créateur depuis le localStorage
const userEmail = localStorage.getItem('userEmail');
const creatorName = localStorage.getItem('userName'); // Peut être récupéré autrement selon ton app

// Ajoute un écouteur d'événement sur la soumission du formulaire de création de produit
document.getElementById('create-product-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Envoie une requête POST au backend pour créer un nouveau produit
    fetch('http://localhost:8000/user/create_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_email: userEmail,
            creator_name: creatorName,
            name: this['product-name'].value,
            description: this['product-description'].value,
            price: this['product-price'].value,
            image: this['product-image'].value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Si la création a réussi, affiche un message et réinitialise le formulaire
            console.log('Produit créé avec succès !');
            this.reset();
        } else {
            // Affiche une alerte en cas d'erreur
            alert('Erreur : ' + (data.error || ''));
        }
    });
});