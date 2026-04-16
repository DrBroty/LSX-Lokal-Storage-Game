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

// ── Schritt 2: Code gegen Access Token tauschen ──────
$tokenResp = file_get_contents('https://discord.com/api/oauth2/token', false,
    stream_context_create(['http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query([
            'client_id'     => DISCORD_CLIENT_ID,
            'client_secret' => DISCORD_CLIENT_SECRET,
            'grant_type'    => 'authorization_code',
            'code'          => $_GET['code'],
            'redirect_uri'  => DISCORD_REDIRECT_URI,
        ])
    ]])
);
$tokenData = json_decode($tokenResp, true);

if (!isset($tokenData['access_token'])) {
    die('OAuth Fehler – bitte erneut versuchen.');
}

// ── Schritt 3: Discord-Userdaten holen ───────────────
$userResp = file_get_contents('https://discord.com/api/users/@me', false,
    stream_context_create(['http' => [
        'method' => 'GET',
        'header' => 'Authorization: Bearer ' . $tokenData['access_token'] . "\r\n"
    ]])
);
$user = json_decode($userResp, true);

if (!isset($user['id'])) {
    die('Konnte User-Daten nicht laden.');
}

// ── Schritt 4: Session setzen ─────────────────────────
$_SESSION['discord_id']       = $user['id'];
$_SESSION['discord_username'] = $user['username'];
$_SESSION['discord_avatar']   = 'https://cdn.discordapp.com/avatars/'
                                 . $user['id'] . '/'
                                 . $user['avatar'] . '.png';

// ── Zurück zum Spiel ──────────────────────────────────
header('Location: https://los-santos-exchange.de/index.html');
exit;