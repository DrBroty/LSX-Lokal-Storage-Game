<?php
session_start();
session_destroy();
header('Location: https://los-santos-exchange.de/index.html');
exit;