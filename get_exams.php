<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION['sid'];
$stmt = getDB()->prepare("SELECT EID, Title, Released FROM Exams where SID = :sid");
$stmt->execute([":sid" => $sid]);
$exams = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$exam["EID"] = $row["EID"];
	$exam["title"] = $row["Title"];
	
	if ($row["Released"] == 0){
		$exam["released"] = false;
	} else {
		$exam["released"] = true;
	}
	
	array_push($exams, $exam);
}
echo json_encode($exams);
?>
