<?php
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');
session_start();
define('DISCORD_CLIENT_ID',     '1493266354063806584');
define('DISCORD_CLIENT_SECRET', 'nGycwawopWNZ2kaL20RSrMYJM2j0Mpev');
define('DISCORD_REDIRECT_URI',  'https://los-santos-exchange.de/lsx-proxy/oauth.php');
define('DISCORD_WEBHOOK_URL',   'https://discord.com/api/webhooks/1493608402604003388/h0zUQwbWLVGkeyn6lBIdQzjJXI7CDL8Bbncv2qKbwPWn3ZbxL-AxGZd6lRpUpYVDmNZK');
define('SAVES_DIR',             __DIR__ . '/saves/');
define('SESSION_SECRET',        'lUF4Qt06AWdcIq9T6mnX5pUEgPoFOwFY');

// Sicherstellen dass saves/ existiert
if (!is_dir(SAVES_DIR)) mkdir(SAVES_DIR, 0755, true);