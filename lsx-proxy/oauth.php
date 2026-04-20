<?php
require_once 'config.php';

// ── Schritt 1: Weiterleitung zu Discord ──────────────
if (!isset($_GET['code'])) {
    $url = 'https://discord.com/oauth2/authorize'
         . '?client_id='     . DISCORD_CLIENT_ID
         . '&redirect_uri='  . urlencode(DISCORD_REDIRECT_URI)
         . '&response_type=code'
         . '&scope=identify';
    header('Location: ' . $url);
    exit;
}

// ── Helper: cURL mit Timeout (statt file_get_contents) ──
function curlPost(string $url, array $data): ?array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,          // max 8s
        CURLOPT_CONNECTTIMEOUT => 4,          // max 4s connect
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $resp = curl_exec($ch);
    curl_close($ch);
    return $resp ? json_decode($resp, true) : null;
}

function curlGet(string $url, string $bearer): ?array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $bearer],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $resp = curl_exec($ch);
    curl_close($ch);
    return $resp ? json_decode($resp, true) : null;
}

// ── Schritt 2: Code gegen Access Token tauschen ──────
$tokenData = curlPost('https://discord.com/api/oauth2/token', [
    'client_id'     => DISCORD_CLIENT_ID,
    'client_secret' => DISCORD_CLIENT_SECRET,
    'grant_type'    => 'authorization_code',
    'code'          => $_GET['code'],
    'redirect_uri'  => DISCORD_REDIRECT_URI,
]);

if (!isset($tokenData['access_token'])) {
    die('OAuth Fehler – bitte erneut versuchen.');
}

// ── Schritt 3: Discord-Userdaten holen ───────────────
$user = curlGet('https://discord.com/api/users/@me', $tokenData['access_token']);

if (!isset($user['id'])) {
    die('Konnte User-Daten nicht laden.');
}

// ── Schritt 4: Session setzen ─────────────────────────
$_SESSION['discord_id']       = $user['id'];
$_SESSION['discord_username'] = $user['username'];
$_SESSION['discord_avatar']   = 'https://cdn.discordapp.com/avatars/'
                                 . $user['id'] . '/'
                                 . ($user['avatar'] ?? 'default') . '.png';

// ── Zurück zum Spiel ──────────────────────────────────
header('Location: https://los-santos-exchange.de/');
exit;
