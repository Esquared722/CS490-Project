<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION["sid"];
$uid = $_GET["uid"];
$eid = $_GET["eid"];
$stmt = getDB()->prepare("SELECT QID, Points FROM EQ where EID = :eid");
$stmt->execute([":eid" => $eid]);
$questions = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$qid = $row["QID"];
	$pointsTotal = $row["Points"];
	$qstmt = getDB()->prepare("SELECT Title FROM Questions where QID = :qid");
	$qstmt->execute([":qid => $qid"]);
	$title = $qstmt->fetch();

	$qstmt = getDB()->prepare("SELECT Points_Earned FROM Answers where UID = :uid AND EID = :eid AND QID = :qid");
	$qstmt->execute([":uid" => $uid, ":eid" => $eid, ":qid => $qid"]);
	$pointsEarned = $qstmt->fetch();
	$question = ["qid" => $qid, "title" => $title, "pts_earned" => $pointsEarned, "pts_total" => $pointsTotal];	
	
	array_push($questions, $question);
}
echo json_encode($questions);
?>
