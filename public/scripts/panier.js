// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Récupère l'email de l'utilisateur ou 'guest' si non connecté
    const userEmail = localStorage.getItem('userEmail') || 'guest';
    // Définit la clé du panier pour cet utilisateur
    const cartKey = `cart_${userEmail}`;
    // Récupère les articles du panier depuis le localStorage
    let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    // Sélectionne le conteneur qui affichera les articles du panier
    const cartContainer = document.getElementById('cart-items');
    // Sélectionne l'élément qui affichera le prix total
    const totalPriceElement = document.getElementById('total-price');

    let total = 0;
    cartContainer.innerHTML = '';

    // Si le panier contient des articles
    if (cartItems.length > 0) {
        cartItems.forEach((prod, index) => {
            // Crée un élément pour chaque article du panier
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <strong>${prod.name}</strong> - ${prod.price} €
                <button class="btn-supprimer" data-index="${index}">Supprimer</button>
            `;
            // Ajoute un gestionnaire d'événement pour le bouton "Supprimer"
            itemDiv.querySelector('.btn-supprimer').addEventListener('click', function() {
                cartItems.splice(index, 1); // Retire l'article du tableau
                localStorage.setItem(cartKey, JSON.stringify(cartItems)); // Met à jour le localStorage
                location.reload(); // Recharge la page pour mettre à jour l'affichage
            });
            cartContainer.appendChild(itemDiv);
            total += parseFloat(prod.price); // Ajoute le prix de l'article au total
        });
    } else {
        // Si le panier est vide, affiche un message
        cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
    }

    // Affiche le prix total du panier
    totalPriceElement.textContent = total.toFixed(2) + ' €';
});