<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["EID"];
$stmt = getDB()->prepare("UPDATE Released FROM Exams where EID = :eid");
$stmt->execute([":eid" => $eid]);
?>
