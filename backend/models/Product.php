<?php

// Classe représentant le modèle Product pour interagir avec la table 'products'
class Product {
    // Propriété privée pour stocker l'objet PDO (connexion à la base de données)
    private $pdo;

    // Constructeur : reçoit la connexion PDO et l'assigne à la propriété $pdo
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Méthode pour récupérer tous les produits de la base de données
    public function getAll() {
        // Exécute une requête SQL pour sélectionner tous les produits
        $stmt = $this->pdo->query("SELECT * FROM products");
        // Retourne tous les résultats sous forme de tableau associatif
        return $stmt->fetchAll();
    }
}
?>