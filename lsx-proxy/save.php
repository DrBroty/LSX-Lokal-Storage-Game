<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Auth ──────────────────────────────────────────────
if (!isset($_SESSION['discord_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

// ── CSRF-Schutz ───────────────────────────────────────
$csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
}

// ── Größenlimit: max. 512 KB pro Save ─────────────────
$body = file_get_contents('php://input');
if (!$body) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty body']);
    exit;
}
if (strlen($body) > 512 * 1024) {
    http_response_code(413);
    echo json_encode(['error' => 'Save data too large (max 512 KB)']);
    exit;
}

// ── JSON validieren ───────────────────────────────────
$decoded = json_decode($body, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// ── Atomic Write (temp → rename, verhindert korrupte Dateien) ─
$file    = SAVES_DIR . $_SESSION['discord_id'] . '.json';
$tmpFile = $file . '.tmp_' . getmypid();
$result  = file_put_contents($tmpFile, $body);

if ($result === false) {
    @unlink($tmpFile);
    http_response_code(500);
    echo json_encode(['error' => 'Write failed']);
    exit;
}

if (!rename($tmpFile, $file)) {
    @unlink($tmpFile);
    http_response_code(500);
    echo json_encode(['error' => 'Rename failed']);
    exit;
}

echo json_encode(['ok' => true, 'bytes' => $result]);