<?php
// Classe User : gère les opérations liées aux utilisateurs (inscription, connexion)
class User {
    // Propriété privée pour stocker la connexion PDO à la base de données
    private $pdo;

    // Constructeur : initialise la connexion PDO
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Inscription d'un nouvel utilisateur
    // Prend en paramètre le nom d'utilisateur, l'email et le mot de passe
    public function register($username, $email, $password) {
        // Hash le mot de passe pour la sécurité
        $hash = password_hash($password, PASSWORD_DEFAULT);
        // Prépare et exécute la requête d'insertion dans la table users
        $stmt = $this->pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        return $stmt->execute([$username, $email, $hash]);
    }

    // Connexion d'un utilisateur
    // Prend en paramètre l'email et le mot de passe
    public function login($email, $password) {
        // Recherche l'utilisateur par email
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        // Vérifie que l'utilisateur existe et que le mot de passe est correct
        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']); // Supprime le mot de passe du tableau retourné pour la sécurité
            return $user; // Retourne les infos de l'utilisateur (sans le mot de passe)
        }
        return false; // Retourne false si la connexion échoue
    }
}