<?php
// Paramètres de connexion à la base de données
$host = 'localhost';
$db   = 'ecommerce_db';
$user = 'leo'; // à remplacer par ton login MySQL
$pass = 'leo'; // à remplacer par ton mot de passe MySQL
$port = 3307; // à remplacer par le port de ton serveur MySQL
$charset = 'utf8mb4';

// Construction du DSN (Data Source Name) pour PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Options de configuration pour PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Active les exceptions en cas d'erreur
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Retourne les résultats sous forme de tableau associatif
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Désactive l'émulation des requêtes préparées
];

try {
    // Création de la connexion PDO
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // En cas d'échec de connexion, retourne une erreur JSON et arrête le script
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
?>