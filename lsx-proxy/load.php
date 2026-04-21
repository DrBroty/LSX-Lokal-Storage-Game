<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ── CSRF-Token erzeugen ───────────────────────────────
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// ── Auth ──────────────────────────────────────────────
if (empty($_SESSION['discord_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

$user = [
    'id'       => $_SESSION['discord_id'],
    'username' => $_SESSION['discord_username'] ?? '',
    'avatar'   => $_SESSION['discord_avatar']   ?? '',
    'csrf'     => $_SESSION['csrf_token'],
];

// ── Aus DB laden ──────────────────────────────────────
try {
    $db   = getDB();
    $stmt = $db->prepare("SELECT save_data FROM saves WHERE discord_id = :id");
    $stmt->execute([':id' => $_SESSION['discord_id']]);
    $row  = $stmt->fetch();

    if (!$row) {
        echo json_encode(['newGame' => true, 'user' => $user]);
        exit;
    }

    $save = json_decode($row['save_data'], true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['newGame' => true, 'user' => $user]);
        exit;
    }

    $save['user'] = $user;
    echo json_encode($save);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB error: ' . $e->getMessage()]);
}