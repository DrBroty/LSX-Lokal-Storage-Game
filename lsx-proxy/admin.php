<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); exit;
}

// ── Auth: Discord-Session + Whitelist ────────────────
if (!isset($_SESSION['discord_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

if (!in_array($_SESSION['discord_id'], ADMIN_IDS, true)) {
    http_response_code(403);
    echo json_encode(['error' => 'Not an admin']);
    exit;
}

// ── CSRF ─────────────────────────────────────────────
$csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
}

$body   = json_decode(file_get_contents('php://input'), true);
$action = $body['action'] ?? '';
$id     = preg_replace('/[^0-9]/', '', $body['id'] ?? '');
$file   = SAVES_DIR . $id . '.json';

// ── Aktionen ──────────────────────────────────────────
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
    $json = json_encode($state);
    if (strlen($json) > 1024 * 1024) {
        http_response_code(413);
        echo json_encode(['error' => 'State too large']);
        exit;
    }
    file_put_contents($file, $json);
    echo json_encode(['ok' => true]);

} elseif ($action === 'delete') {
    if ($id && file_exists($file)) unlink($file);
    echo json_encode(['ok' => true]);

} elseif ($action === 'list') {
    $saves = [];
    foreach (glob(SAVES_DIR . '*.json') as $f) {
        $data = json_decode(file_get_contents($f), true);
        if (!$data) continue;
        $discordId = basename($f, '.json');
        $nw = ($data['cash'] ?? 0);
        foreach ($data['holdings'] ?? [] as $t => $h) {
            $nw += ($h['qty'] ?? 0) * ($data['prices'][$t] ?? 0);
        }
        $saves[] = [
            'id'       => $discordId,
            'username' => $data['user']['username'] ?? '?',
            'avatar'   => $data['user']['avatar']   ?? '',
            'netWorth' => round($nw, 2),
            'cash'     => round($data['cash'] ?? 0, 2),
            'gameDay'  => $data['gameDay'] ?? 0,
            'trades'   => $data['stats']['totalTrades'] ?? 0,
            'savedAt'  => $data['savedAt'] ?? 0,
        ];
    }
    usort($saves, fn($a, $b) => $b['netWorth'] <=> $a['netWorth']);
    echo json_encode($saves);

} elseif ($action === 'check') {
    // Prüft ob der aktuelle User Admin ist — für das Frontend
    echo json_encode([
        'ok'       => true,
        'username' => $_SESSION['discord_username'],
        'avatar'   => $_SESSION['discord_avatar'],
        'id'       => $_SESSION['discord_id'],
    ]);

} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown action']);
}