<?php
session_start();
$myObj->user_name = $_SESSION["user"];

$myJSON = json_encode($myObj);

echo $myJSON;

