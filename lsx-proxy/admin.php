<?php
require_once 'config.php';

// ── Admin-Key NUR via POST-Header, nie als GET-Parameter ─
// Aufruf: fetch('/lsx-proxy/admin.php', { headers: { 'X-Admin-Key': '...' } })
$ADMIN_PASSWORD = getenv('LSX_ADMIN_KEY') ?: 'UCJtwc5WRVFnTncgcAgrHa77cz2eqhmW8XNe';

$auth = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
if (!hash_equals($ADMIN_PASSWORD, $auth)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

header('Content-Type: application/json');

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
    // Größenlimit auch im Admin
    $json = json_encode($state);
    if (strlen($json) > 1024 * 1024) { // 1 MB Limit für Admin
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
    // ── Alle Saves auflisten (für Admin-Übersicht) ────
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
            'netWorth' => round($nw, 2),
            'gameDay'  => $data['gameDay'] ?? 0,
            'savedAt'  => $data['savedAt'] ?? 0,
        ];
    }
    // Sortiert nach Net Worth
    usort($saves, fn($a, $b) => $b['netWorth'] <=> $a['netWorth']);
    echo json_encode($saves);

} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown action']);
}