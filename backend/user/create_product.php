<?php
// Autorise toutes les origines pour les requêtes CORS
header('Access-Control-Allow-Origin: *');
// Autorise l'en-tête Content-Type pour les requêtes CORS
header('Access-Control-Allow-Headers: Content-Type');
// Définit le type de contenu de la réponse en JSON
header('Content-Type: application/json');

// Récupère les données JSON envoyées dans la requête POST
$data = json_decode(file_get_contents('php://input'), true);

try {
    // Crée une nouvelle connexion PDO à la base de données
    $pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=ecommerce_db;charset=utf8mb4', 'leo', 'leo');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prépare la requête d'insertion pour ajouter un produit
    $stmt = $pdo->prepare('INSERT INTO products (user_email, creator_name, name, description, price, image) VALUES (?, ?, ?, ?, ?, ?)');
    // Exécute la requête avec les données reçues
    $stmt->execute([
        $data['user_email'],
        $data['creator_name'],
        $data['name'],
        $data['description'],
        $data['price'],
        $data['image'] ?? null
    ]);

    // Retourne une réponse JSON indiquant le succès
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    // En cas d'erreur, retourne une réponse JSON avec le message d'erreur
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}