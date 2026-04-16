<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ── Auth ──────────────────────────────────────────────
if (!isset($_SESSION['discord_id'])) {
    http_response_code(401);
    exit;
}

// ── CSRF-Schutz ───────────────────────────────────────
$csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    exit;
}

// ── Rate Limiting: max. 15 Webhooks / Minute pro IP ───
$ip   = $_SERVER['REMOTE_ADDR'];
$file = sys_get_temp_dir() . '/lsx_rl_' . md5($ip) . '.json';
$now  = time();
$data = [];
if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true) ?? [];
}
if (empty($data) || ($now - ($data['start'] ?? 0)) > 60) {
    $data = ['count' => 0, 'start' => $now];
}
$data['count']++;
file_put_contents($file, json_encode($data));
if ($data['count'] > 15) {
    http_response_code(429);
    exit;
}

// ── Payload validieren ────────────────────────────────
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body || !isset($body['embeds'][0]['title'])) {
    http_response_code(400);
    exit;
}

// ── Erlaubte Embed-Titel ──────────────────────────────
$allowed = [
    '🏆 Milestone',
    '📈 Neues Portfolio',
    '📈 Großer Kauf',
    '💹 Großer Verkauf',
    '💸 Herber Verlust',
    '🛡 Stop-Loss',
    '📉 Short gedeckt',
    '⏱ Limit-Order',
    '💰 Dividenden',
];
$valid = false;
foreach ($allowed as $prefix) {
    if (str_starts_with($body['embeds'][0]['title'], $prefix)) {
        $valid = true;
        break;
    }
}
if (!$valid) {
    http_response_code(403);
    exit;
}

// ── Discord-Ping mit echter User-ID ───────────────────
$discordId = $_SESSION['discord_id'];
$body['content'] = "<@{$discordId}>";

$ch = curl_init(DISCORD_WEBHOOK_URL);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     json_encode($body));
curl_setopt($ch, CURLOPT_HTTPHEADER,     ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT,        5);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($status >= 200 && $status < 300 ? 200 : $status);