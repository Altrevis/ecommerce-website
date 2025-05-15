// Attend que le DOM soit totalement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments du DOM
    const userInfo = document.getElementById('user-info'); // Zone d'affichage des infos utilisateur
    const userEmail = localStorage.getItem('userEmail'); // Récupération de l'email stocké localement
    const profileImgInput = document.getElementById('profile-img-input'); // Champ input pour la photo de profil
    const changeImgBtn = document.getElementById('change-img-btn'); // Bouton pour changer la photo
    const profileImg = document.getElementById('profile-img'); // Image de profil affichée
    const editForm = document.getElementById('edit-info-form'); // Formulaire de modification des infos
    let userData = JSON.parse(localStorage.getItem('userData_' + userEmail)) || {}; // Données utilisateur stockées localement (si dispo)

    // Fonction pour aller chercher les infos à jour du serveur
    function fetchAndRenderUserInfo() {
        fetch('http://localhost:8000/user/get_user.php?email=' + encodeURIComponent(userEmail))
            .then(res => res.json())
            .then(userData => {
                renderUserInfo(userData); // Affiche les données dans la page
                // Pré-remplit le formulaire avec les infos
                editForm['user-name'].value = userData.name || '';
                editForm['user-phone'].value = userData.phone || '';
                editForm['user-address'].value = userData.address || '';
            });
    }

    // Affiche les données utilisateur dans la section `user-info`
    function renderUserInfo(userData) {
        userInfo.innerHTML = `
            <p><strong>Nom :</strong> ${userData.name || '-'}</p>
            <p><strong>Email :</strong> ${userData.email || '-'}</p>
            <p><strong>Téléphone :</strong> ${userData.phone || '-'}</p>
            <p><strong>Adresse :</strong> ${userData.address || '-'}</p>
        `;
    }

    // Si l'utilisateur est connecté (email présent), on affiche les infos
    if (userEmail) {
        userInfo.innerHTML = `<p>Email : <strong>${userEmail}</strong></p>`;
        fetchAndRenderUserInfo(); // Charge les infos à jour depuis le backend
    } else {
        userInfo.innerHTML = "<p>Vous n'êtes pas connecté.</p>";
    }

    // Si une image de profil a déjà été enregistrée, on l'affiche
    if (userData.profileImg) {
        profileImg.src = userData.profileImg;
    }

    // Quand on clique sur le bouton de changement de photo, on ouvre l'explorateur de fichiers
    changeImgBtn.addEventListener('click', () => profileImgInput.click());

    // Quand une nouvelle image est sélectionnée
    profileImgInput.addEventListener('change', function() {
        const file = this.files[0]; // Récupère le fichier sélectionné
        if (file) {
            const reader = new FileReader(); // Utilisé pour lire le fichier image
            reader.onload = function(e) {
                // Enregistre l'image encodée en base64 dans le localStorage
                userData.profileImg = e.target.result;
                localStorage.setItem('userData_' + userEmail, JSON.stringify(userData));
                profileImg.src = e.target.result; // Affiche l'image dans la page
            };
            reader.readAsDataURL(file); // Convertit l'image en base64
        }
    });

    // Gestion de la soumission du formulaire de modification des infos
    editForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page

        // Prépare les données à envoyer
        const userData = {
            email: userEmail,
            name: editForm['user-name'].value,
            phone: editForm['user-phone'].value,
            address: editForm['user-address'].value
        };

        // Envoie les nouvelles données au serveur via POST
        fetch('http://localhost:8000/user/update_user.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); // Affiche la réponse complète pour debug
            if (data.success) {
                fetchAndRenderUserInfo(); // Recharge les données mises à jour
                console.log('Mise à jour réussie');
            } else {
                alert('Erreur lors de la mise à jour : ' + (data.error || ''));
            }
        })
        .catch(() => alert('Erreur lors de la mise à jour.')); // En cas d'erreur réseau
    });
});
