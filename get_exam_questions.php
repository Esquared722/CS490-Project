<?php
session_start();
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$stmt = getDB()->prepare("SELECT Title FROM Exams where EID = :eid");
$stmt->execute([":eid" => $eid]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$exam = ["title" => $row["title"], "eid" => $eid, "questions" => [["qid" => "", "title" => "", "prompt" => "", "pts" => ""]]];

$stmt = getDB()->prepare("SELECT * FROM EQ where EID = :eid");
$stmt->execute([":eid" => $eid]);

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
	$qstmt = getDB()->prepare("SELECT * FROM Questions where QID = :qid");
	$qstmt->execute([":qid" => $row["qid"]);
	while($qrow = $qstmt->fetch(PDO::FETCH_ASSOC)) {	
		$question = ["qid" => $row["qid"], "title" => $qrow["title"], "prompt" => $qrow["prompt"], "pts" => $qrow["points"]];
	}
	array_push($exam["questions"], $question);
}
echo json_encode($exams);
?>
