<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$stmt = getDB()->prepare("SELECT Title FROM Exams where EID = :eid");
$stmt->execute([":eid" => $eid]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$exam = ["title" => $row["Title"], "eid" => $eid, "questions" => []];

$stmt = getDB()->prepare("SELECT * FROM EQ where EID = :eid");
$stmt->execute([":eid" => $eid]);

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
	$question = array();
	$qstmt = getDB()->prepare("SELECT * FROM Questions where QID = :qid");
	$qstmt->execute([":qid" => $row["QID"]]);
	while($qrow = $qstmt->fetch(PDO::FETCH_ASSOC)) {	
		$question = ["qid" => $row["QID"], "title" => $qrow["title"], "prompt" => $qrow["prompt"], "pts" => $row["Points"]];
	}
	array_push($exam["questions"], $question);
}
echo json_encode($exam);
?>
