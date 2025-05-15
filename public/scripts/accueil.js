// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', async function () {
    const productsList = document.getElementById('products-list'); // Récupère l'élément HTML où afficher les produits
    const userEmail = localStorage.getItem('userEmail') || 'guest'; // Récupère l'email utilisateur depuis le localStorage, ou "guest" par défaut
    const cartKey = `cart_${userEmail}`; // Clé unique pour le panier de l'utilisateur

    try {
        // Appel à l'API pour récupérer les produits
        const response = await fetch('http://localhost:8000/?action=products');
        const data = await response.json(); // Parse la réponse en JSON
        console.log('Produits reçus:', data);

        // Si des produits sont disponibles
        if (data.products && data.products.length > 0) {
            productsList.innerHTML = ''; // Vide le conteneur des produits

            // Parcourt chaque produit et le rend visuellement
            data.products.forEach(product => {
                const div = document.createElement('div'); // Crée un conteneur pour le produit
                div.className = 'product-card'; // Ajoute une classe CSS

                // Détermine l'URL de l'image du produit
                let imageSrc = product.image;
                if (imageSrc && (imageSrc.startsWith('http://') || imageSrc.startsWith('https://'))) {
                    // Lien externe correct, on ne change rien
                } else if (imageSrc) {
                    // Image locale, on ajoute le chemin relatif
                    imageSrc = '../images/' + imageSrc;
                } else {
                    // Image manquante, on affiche un placeholder
                    imageSrc = 'https://via.placeholder.com/150x150?text=Image';
                }

                // Corrige les chemins mal formés commençant par "/http" ou "/https"
                if (imageSrc && (imageSrc.startsWith('/http://') || imageSrc.startsWith('/https://'))) {
                    imageSrc = imageSrc.substring(1); // Supprime le premier caractère "/"
                }

                // Crée le HTML du produit
                div.innerHTML = `
                    <img src="${imageSrc}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>${product.price} €</strong></p>
                    <p class="product-creator">Créé par : <strong>${product.creator_name}</strong></p>
                    <button class="btn-primary">Ajouter au panier</button>
                `;

                // Ajoute un événement au clic sur le bouton "Ajouter au panier"
                div.querySelector('button').addEventListener('click', function () {
                    console.log('userEmail utilisé pour le panier:', userEmail);
                    console.log('userEmail:', userEmail, 'cartKey:', cartKey);

                    // Récupère le panier existant ou crée un panier vide
                    let panier = JSON.parse(localStorage.getItem(cartKey)) || [];

                    // Ajoute le produit au panier
                    panier.push(product);

                    // Enregistre le panier dans le localStorage
                    localStorage.setItem(cartKey, JSON.stringify(panier));

                    // Redirige l'utilisateur vers la page du panier
                    window.location.href = 'Panier.html';
                });

                // Ajoute le produit au DOM
                productsList.appendChild(div);
            });
        } else {
            // Aucun produit trouvé, on affiche un message
            productsList.innerHTML = "<p>Aucun produit disponible.</p>";
        }
    } catch (err) {
        // En cas d'erreur dans la requête, on affiche un message d'erreur
        productsList.innerHTML = "<p>Erreur lors du chargement des produits.</p>";
        console.error(err); // Affiche l'erreur dans la console
    }
});
