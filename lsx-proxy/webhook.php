<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: https://los-santos-exchange.de');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ── Nur eingeloggte Spieler ───────────────────────────
if (!isset($_SESSION['discord_id'])) {
    http_response_code(401);
    exit;
}

// ── Rate Limiting ─────────────────────────────────────
$ip   = $_SERVER['REMOTE_ADDR'];
$file = sys_get_temp_dir() . '/lsx_rl_' . md5($ip) . '.json';
$now  = time();
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count' => 0, 'start' => $now];
if ($now - $data['start'] > 60) $data = ['count' => 0, 'start' => $now];
$data['count']++;
file_put_contents($file, json_encode($data));
if ($data['count'] > 15) { http_response_code(429); exit; }

// ── Payload validieren ────────────────────────────────
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!$body || !isset($body['embeds'][0]['title'])) { http_response_code(400); exit; }

$allowed = [
    '🏆 Milestone',       // Vermögens-Meilensteine
    '📈 Neues Portfolio', // All-Time High
    '📈 Großer Kauf',     // Großer BUY-Trade
    '💹 Großer Verkauf',  // Großer SELL-Trade
    '💸 Herber Verlust',  // Großer Verlust
    '🛡 Stop-Loss',       // Stop-Loss ausgelöst
    '📉 Short gedeckt',   // Short gedeckt
    '⏱ Limit-Order',     // Limit-Order ausgeführt
    '💰 Dividenden',      // Dividendenausschüttung
];
$valid = false;
foreach ($allowed as $prefix) {
    if (str_starts_with($body['embeds'][0]['title'], $prefix)) { $valid = true; break; }
}
if (!$valid) { http_response_code(403); exit; }

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

http_response_code($status);