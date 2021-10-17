<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$stmt = getDB()->prepare("SELECT UID, Completed, Grade FROM STE where EID = :eid");
$stmt->execute([":eid" => $eid]);
$students = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$uid = $row["UID"];
	$completed = $row["completed"];	
	if($completed == 0) {
		$completed = false;
	} else {
		$completed = true;
	}
	
	$grade = $row["grade"];

	$ustmt = getDB()->prepare("SELECT user_name FROM Users where UID = :uid");
	$ustmt->execute([":qid => $uid"]);
	$userName = $qstmt->fetch()["user_name"];

	$question = ["qid" => $qid, "title" => $title, "pts_earned" => $pointsEarned, "pts_total" => $pointsTotal];
	$student = ["uid" => $uid, "name" => $userName, "completed" => $completed, "grade" => $grade];
	array_push($students, $student);
}
echo json_encode($students);
?>
