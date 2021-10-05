<?php
session_start();
$myObj->user_name = $_SESSION["user"];
$myObj->role = $_SESSION["role"];

$myJSON = json_encode($myObj);

echo $myJSON;
?>
