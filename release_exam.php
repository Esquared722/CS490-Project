<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["EID"];
$stmt = getDB()->prepare("UPDATE Exams SET Released = 1 WHERE EID = :eid");
$stmt->execute([":eid" => $eid]);
?>
