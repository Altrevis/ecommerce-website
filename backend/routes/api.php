<?php
// filepath: /ecommerce-website/ecommerce-website/backend/routes/api.php

// Inclusion des fichiers nécessaires pour la configuration et les contrôleurs
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/ProductController.php';

// Définit le type de contenu de la réponse en JSON
header('Content-Type: application/json');

// Instancie les contrôleurs d'authentification et de produits avec la connexion PDO
$auth = new AuthController($pdo);
$product = new ProductController($pdo);

// Si la requête est de type POST (inscription ou connexion)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupère les données JSON envoyées dans la requête
    $input = json_decode(file_get_contents('php://input'), true);

    // Si l'action demandée est 'register', on tente d'inscrire l'utilisateur
    if (isset($_GET['action']) && $_GET['action'] === 'register') {
        $result = $auth->register($input);
        echo json_encode(['success' => $result]);
    }
    // Si l'action demandée est 'login', on tente de connecter l'utilisateur
    elseif (isset($_GET['action']) && $_GET['action'] === 'login') {
        $user = $auth->login($input);
        echo json_encode(['user' => $user]);
    }
}
// Si la requête est de type GET (récupération des produits)
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Si l'action demandée est 'products', on retourne la liste des produits
    if (isset($_GET['action']) && $_GET['action'] === 'products') {
        $products = $product->getAllProducts();
        echo json_encode(['products' => $products]);
    }
}