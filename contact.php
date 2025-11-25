<?php
header('Content-Type: application/json');

$response = [
    'success' => false,
    'message' => 'Došlo je do pogreške. Pokušajte ponovno kasnije.'
];

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

if ($name === '' || $email === '' || $message === '') {
    echo json_encode($response);
    exit;
}

$to = 'info@casinocezar.hr';
$subject = 'Nova poruka s kontakt forme - Casino Cezar';
$emailMessage = "Ime i prezime: {$name}\n" .
    "Email: {$email}\n\n" .
    "Poruka:\n{$message}";

$headers = [
    'From' => 'noreply@casinocezar.hr',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$formattedHeaders = '';
foreach ($headers as $key => $value) {
    $formattedHeaders .= $key . ': ' . $value . "\r\n";
}

if (mail($to, $subject, $emailMessage, $formattedHeaders)) {
    $response['success'] = true;
    $response['message'] = 'Hvala vam! Vaša poruka je uspješno poslana. Odgovorit ćemo vam u najkraćem mogućem roku.';
}

echo json_encode($response);
