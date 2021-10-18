<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$stmt = getDB()->prepare("SELECT UID, Completed, Grade FROM STE where EID = :eid");
$stmt->execute([":eid" => $eid]);
$students = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$uid = $row["UID"];
	$completed = $row["Completed"];	
	if($completed == 0) {
		$completed = false;
	} else {
		$completed = true;
	}
	
	$grade = $row["Grade"];

	$ustmt = getDB()->prepare("SELECT user_name FROM Users where UID = :uid");
	$ustmt->execute([":uid" => $uid]);
	$userName = $ustmt->fetch()["user_name"];

	$student = ["uid" => $uid, "name" => $userName, "completed" => $completed, "grade" => $grade];
	array_push($students, $student);
}
echo json_encode($students);
?>
