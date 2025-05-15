<?php
// Autorise toutes les origines pour les requêtes CORS
header('Access-Control-Allow-Origin: *');
// Autorise l'en-tête Content-Type pour les requêtes CORS
header('Access-Control-Allow-Headers: Content-Type');
// Définit le type de contenu de la réponse en JSON
header('Content-Type: application/json');

// Récupère l'email passé en paramètre GET
$email = $_GET['email'] ?? '';
if (!$email) {
    // Si l'email est manquant, retourne une erreur en JSON et arrête le script
    echo json_encode(['error' => 'Email manquant']);
    exit;
}

try {
    // Crée une connexion PDO à la base de données
    $pdo = new PDO('mysql:host=127.0.0.1;port=3307;dbname=ecommerce_db;charset=utf8mb4', 'leo', 'leo');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prépare et exécute la requête pour récupérer les infos de l'utilisateur
    $stmt = $pdo->prepare('SELECT name, phone, address, email FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Retourne les infos de l'utilisateur en JSON (ou un tableau vide si non trouvé)
    echo json_encode($user ?: []);
} catch (PDOException $e) {
    // En cas d'erreur, retourne le message d'erreur en JSON
    echo json_encode(['error' => $e->getMessage()]);
}