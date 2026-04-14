<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SESSION['discord_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

$body = file_get_contents('php://input');
if (!$body || !json_decode($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

$file   = SAVES_DIR . $_SESSION['discord_id'] . '.json';
$result = file_put_contents($file, $body);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Write failed']);
    exit;
}

echo json_encode(['ok' => true, 'bytes' => $result]);