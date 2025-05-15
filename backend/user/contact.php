<?php
// Importe les classes PHPMailer nécessaires
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charge automatiquement les dépendances (PHPMailer)
require __DIR__ . '/vendor/autoload.php';

// Définit le type de contenu de la réponse en JSON
header('Content-Type: application/json');

// Récupère les données envoyées en POST (JSON)
$data = json_decode(file_get_contents('php://input'), true);

// Vérifie que toutes les données nécessaires sont présentes
if (!$data || !isset($data['name'], $data['email'], $data['message'])) {
    echo json_encode(['success' => false]);
    exit;
}

// Crée une nouvelle instance de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuration SMTP pour Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ton.email@gmail.com'; // Remplace par ton adresse Gmail
    $mail->Password   = 'TON-MDP-APPLICATION'; // Remplace par ton mot de passe d'application Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Définit l'expéditeur et le destinataire
    $mail->setFrom('ton.email@gmail.com', 'Formulaire Contact');
    $mail->addAddress('leo.benazeth@gmail.com'); // Adresse de réception

    // Prépare le contenu du mail
    $mail->isHTML(false); // Envoie le mail en texte brut
    $mail->Subject = 'HELP ME NOW !';
    $mail->Body    = "Nom: {$data['name']}\nEmail: {$data['email']}\n\nMessage:\n{$data['message']}";

    // Envoie le mail
    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // En cas d'erreur, retourne le message d'erreur
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
