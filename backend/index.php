<?php
// Point d'entrée principal du backend de l'application

// Inclusion du fichier de configuration de la base de données
require_once 'config/db.php';
// Inclusion des routes de l'API (gère les différentes actions possibles)
require_once __DIR__ . '/routes/api.php';

// Définition des headers pour autoriser les requêtes CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *"); // Autorise toutes les origines
header("Access-Control-Allow-Headers: Content-Type"); // Autorise l'en-tête Content-Type
header("Content-Type: application/json; charset=UTF-8"); // Définit le type de contenu en JSON
