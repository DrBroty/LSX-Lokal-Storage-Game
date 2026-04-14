<?php
require_once 'config.php';
session_destroy();
header('Location: https://los-santos-exchange.de/index.html');
exit;