<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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

// ── CSRF-Token erzeugen (einmal pro Session) ──────────
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$user = [
    'id'       => $_SESSION['discord_id'],
    'username' => $_SESSION['discord_username'],
    'avatar'   => $_SESSION['discord_avatar'], // bereits vollständige URL
    'csrf'     => $_SESSION['csrf_token'],      // sicher: nur über session
];

$file = SAVES_DIR . $_SESSION['discord_id'] . '.json';

if (!file_exists($file)) {
    echo json_encode(['newGame' => true, 'user' => $user]);
    exit;
}

$raw     = file_get_contents($file);
$decoded = json_decode($raw, true);

// ── Korrupte Datei abfangen ───────────────────────────
if (json_last_error() !== JSON_ERROR_NONE) {
    rename($file, $file . '.corrupt_' . time());
    echo json_encode(['newGame' => true, 'user' => $user]);
    exit;
}

$decoded['user'] = $user;
echo json_encode($decoded);