<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ── Auth ──────────────────────────────────────────────
if (empty($_SESSION['discord_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

// ── CSRF ──────────────────────────────────────────────
$csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
}

// ── Body lesen ────────────────────────────────────────
$body = file_get_contents('php://input');
if (strlen($body) > 524288) {
    http_response_code(413);
    echo json_encode(['error' => 'Save too large']);
    exit;
}

$data = json_decode($body, true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// ── Net Worth berechnen für Leaderboard ───────────────
$netWorth  = (float)($data['cash'] ?? 0);
$holdings  = $data['holdings'] ?? [];
$prices    = $data['prices']   ?? [];
foreach ($holdings as $ticker => $h) {
    $netWorth += ($h['qty'] ?? 0) * ($prices[$ticker] ?? 0);
}
$totalTrades = (int)($data['stats']['totalTrades'] ?? 0);

// ── In DB speichern ───────────────────────────────────
try {
    $db   = getDB();
    $stmt = $db->prepare("
        INSERT INTO saves (discord_id, username, avatar, save_data, net_worth, total_trades)
        VALUES (:id, :username, :avatar, :data, :nw, :trades)
        ON DUPLICATE KEY UPDATE
            username     = VALUES(username),
            avatar       = VALUES(avatar),
            save_data    = VALUES(save_data),
            net_worth    = VALUES(net_worth),
            total_trades = VALUES(total_trades),
            updated_at   = NOW()
    ");
    $stmt->execute([
        ':id'       => $_SESSION['discord_id'],
        ':username' => $_SESSION['discord_username'] ?? '',
        ':avatar'   => $_SESSION['discord_avatar']   ?? '',
        ':data'     => $body,
        ':nw'       => round($netWorth, 2),
        ':trades'   => $totalTrades,
    ]);
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB error: ' . $e->getMessage()]);
}