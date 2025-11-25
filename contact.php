<?php
header('Content-Type: application/json');

// Prepare default response
$response = [
    'success' => false,
    'message' => 'Došlo je do pogreške. Pokušajte ponovno kasnije.'
];

// Accept only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode($response);
    exit;
}

// Simple honeypot field check
if (!empty($_POST['website'])) {
    echo json_encode($response);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Basic validation
if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode($response);
    exit;
}

// Build email content
$to = 'info@casinocezar.hr';
$subject = 'Nova poruka s kontakt forme - Casino Cezar';

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$emailMessage = "Ime i prezime: {$safeName}\n" .
    "Email: {$safeEmail}\n\n" .
    "Poruka:\n{$safeMessage}";

// Use a sender from the same domain and set Reply-To to the user
$fromAddress = 'info@casinocezar.hr';
$headers = "From: Casino Cezar <{$fromAddress}>\r\n" .
    "Reply-To: {$safeEmail}\r\n" .
    "Content-Type: text/plain; charset=UTF-8\r\n" .
    "X-Mailer: PHP/" . phpversion();

// Specify envelope sender to improve deliverability
$additionalParameters = '-f ' . $fromAddress;

if (mail($to, $subject, $emailMessage, $headers, $additionalParameters)) {
    $response['success'] = true;
    $response['message'] = 'Hvala vam! Vaša poruka je uspješno poslana. Odgovorit ćemo vam u najkraćem mogućem roku.';
}

echo json_encode($response);
