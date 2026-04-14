<?php
require_once 'config.php';

// ── Passwortschutz ──────────────────────────────────────
$ADMIN_PASSWORD = 'UCJtwc5WRVFnTncgcAgrHa77cz2eqhmW8XNe'; // ← ändern!
$auth = $_SERVER['HTTP_X_ADMIN_KEY'] ?? $_GET['key'] ?? '';
if ($auth !== $ADMIN_PASSWORD) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

header('Content-Type: application/json');
$body   = json_decode(file_get_contents('php://input'), true);
$action = $body['action'] ?? $_GET['action'] ?? '';
$id     = preg_replace('/[^0-9]/', '', $body['id'] ?? $_GET['id'] ?? '');
$file   = SAVES_DIR . $id . '.json';

if ($action === 'load') {
    if (!$id || !file_exists($file)) {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
        exit;
    }
    echo file_get_contents($file);

} elseif ($action === 'save') {
    $state = $body['state'] ?? null;
    if (!$state || !$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Bad request']);
        exit;
    }
    file_put_contents($file, json_encode($state));
    echo json_encode(['ok' => true]);

} elseif ($action === 'delete') {
    if (file_exists($file)) unlink($file);
    echo json_encode(['ok' => true]);

} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown action']);
}