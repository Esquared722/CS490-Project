<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION["sid"];
$uid = $_SESSION["uid"];
$stmt = getDB()->prepare("SELECT EID, Title, Released FROM Exams where SID = :sid");
$stmt->execute([":sid" => $sid]);
$exams = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$exam["EID"] = $row["EID"];
	$exam["title"] = $row["Title"];
	$exam["released"] = $row["Released"];
	$estmt = getDB()->prepare("SELECT Complete FROM STE where UID = :uid AND EID = :eid");
	$estmt->execute([":uid" => $uid, ":eid" => $exam["EID"]]);
	$exam["completed"] = $estmt->fetch();
	array_push($exams, $exam);
}
echo json_encode($exams);
?>
