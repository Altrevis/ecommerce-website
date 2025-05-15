<?php
// Contrôleur Product : gère les opérations liées aux produits

require_once __DIR__ . '/../models/Product.php';

class ProductController {
    // Propriété pour stocker le modèle Product
    private $productModel;

    // Constructeur : initialise le modèle Product avec la connexion PDO
    public function __construct($pdo) {
        $this->productModel = new Product($pdo);
    }

    // Méthode pour récupérer tous les produits via le modèle
    public function getAllProducts() {
        return $this->productModel->getAll();
    }

    // Méthode pour créer un nouveau produit
    // Prend en paramètre un tableau de données produit
    public function createProduct($data) {
        // Prépare et exécute la requête d'insertion (à déplacer idéalement dans le modèle)
        $stmt = $this->pdo->prepare('INSERT INTO products (user_email, creator_name, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)');
        return $stmt->execute([
            $data['user_email'],
            $data['creator_name'],
            $data['name'],
            $data['description'],
            $data['price'],
            $data['image'] ?? null
        ]);
    }
}
?>