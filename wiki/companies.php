<?php
// wiki/companies.php
// Gibt automatisch alle *.json Dateien aus dem companies/ Verzeichnis zurück.
// Kein manuelles index.json nötig — neue Firma hochladen = fertig.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$dir     = __DIR__ . '/companies/';
$files   = glob($dir . '*.json');
$companies = [];

foreach ($files as $file) {
    $raw = file_get_contents($file);
    $obj = json_decode($raw, true);
    // Nur gültige Firmen-JSONs (müssen ticker, name, sector haben)
    if ($obj && isset($obj['ticker'], $obj['name'], $obj['sector'])) {
        $companies[] = $obj;
    }
}

// Sortiert nach Sector-Reihenfolge, dann Name
$sectorOrder = ['FOOD','FINANCE','TECH','TRANSPORT','RETAIL','ENERGY','PHARMA','MEDIA'];
usort($companies, function($a, $b) use ($sectorOrder) {
    $ai = array_search($a['sector'], $sectorOrder);
    $bi = array_search($b['sector'], $sectorOrder);
    if ($ai === false) $ai = 99;
    if ($bi === false) $bi = 99;
    if ($ai !== $bi) return $ai - $bi;
    return strcmp($a['name'], $b['name']);
});

echo json_encode($companies);
