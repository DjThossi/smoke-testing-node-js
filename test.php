<?php

$returnCode = null;
$output = null;
exec('nodejs smoke-testing.js', $output, $returnCode);

var_dump($returnCode);