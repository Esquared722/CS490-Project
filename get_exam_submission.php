<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION['sid'];
$eid = $_GET['eid'];
$uid = $_GET['uid'];
$stmt = getDB()->prepare("SELECT Title FROM Exams where EID = :eid");
$stmt->execute([":eid" => $eid]);
$row = $stmt->fetch();
$examTitle = $row["Title"];
$stmt = getDB()->prepare("SELECT user_name FROM Users where UID = :uid");
$stmt->execute([":uid" => $uid]);
$row = $stmt->fetch();
$studentName = $row["user_name"];

$exams = ["exam_title"=>$examTitle, "student_name"=>$studentName, "exam_questions"=>[]];

$stmt = getDB()->prepare("SELECT QID, Points FROM EQ where EID = :eid");
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$question["total_pts"] = $row["Points"];
	
	$qstmt = getDB()->prepare("SELECT Title FROM Questions where QID = :qid");
	$qstmt->execute([":qid" => $row["QID"]]);
	$qrow = $stmt->fetch();
	$question["title"] = $qrow["Title"];

	$qstmt = getDB()->prepare("SELECT Answer, Comments FROM Answers WHERE EID = :eid AND UID = :uid AND QID = :qid");
	$qstmt->execute([":eid" => $eid, ":uid" => $uid, ":qid" => $row["QID"]]);
	$qrow = $stmt->fetch();
	$question["answer"] = $qrow["Answers"];
	$question["comments"] = $qrow["Comments"];

	
	//Testcases incomplete
	$qstmt = getDB()->prepare("SELECT test, expected FROM TestCases where QID = :qid, UID = :uid");
	$qstmt->execute([":qid" => $row["QID"], ":uid" => $uid]);
	while($tcrow = $qstmt->fetch(PDO::FETCH_ASSOC)) {
		$tcstmt = getDB()->prepare("SELECT Output, Result FROM QTCS WHERE QID = :qid, UID = :uid");
		$tcstmt->execute([":qid" => $row["QID"], ":uid" => $uid]);
		$question["testcases"] = ["test" => $tcrow["test"], "expected" => $tcrow["expected"], "user_output" => $tcrow["Output"], "result" => $tcrow["Result"]];
	}
	$qstmt = getDB()->prepare("SELECT Points_Earned FROM Answers where QID = :qid, UID = :uid, EID = :eid");
	$qstmt->execute([":qid" => $row["QID"], ":uid" => $uid, ":eid" => $eid]);
	
	$question["points_earned_on_question"] = $qstmt->fetch();

	array_push($exams["exam_questions"], $question);
}
echo json_encode($exams);
?>
