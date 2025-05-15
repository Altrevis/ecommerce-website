<?php
// Contrôleur d'authentification : gère l'inscription et la connexion des utilisateurs

require_once __DIR__ . '/../models/User.php';

class AuthController {
    // Propriété pour stocker le modèle User
    private $userModel;

    // Constructeur : initialise le modèle User avec la connexion PDO
    public function __construct($pdo) {
        $this->userModel = new User($pdo);
    }

    // Méthode pour inscrire un nouvel utilisateur
    // Prend en paramètre un tableau de données (username, email, password)
    public function register($data) {
        if (
            isset($data['username'], $data['email'], $data['password'])
        ) {
            // Appelle la méthode register du modèle User
            return $this->userModel->register($data['username'], $data['email'], $data['password']);
        }
        // Retourne false si des champs sont manquants
        return false;
    }

    // Méthode pour connecter un utilisateur
    // Prend en paramètre un tableau de données (email, password)
    public function login($data) {
        if (
            isset($data['email'], $data['password'])
        ) {
            // Appelle la méthode login du modèle User
            return $this->userModel->login($data['email'], $data['password']);
        }
        // Retourne false si des champs sont manquants
        return false;
    }
}