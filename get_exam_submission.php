<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION['sid'];
$eid = $_GET['eid'];
$uid = $_GET['uid'];
$qid = $_GET["qid"];

$stmt = getDB()->prepare("SELECT user_name FROM Users WHERE UID = :uid");
$stmt->execute([":uid" => $uid]);
$name = $stmt->fetch()["user_name"];

$stmt = getDB()->prepare("SELECT Title FROM Questions WHERE QID = :qid");
$stmt->execute([":qid" => $qid]);
$questionTitle = $stmt->fetch()["Title"];

$stmt = getDB()->prepare("SELECT Points FROM EQ WHERE EID = :eid AND QID = :qid");
$stmt->execute([":eid" => $eid, ":qid" => $qid]);
$pointsTotal = $stmt->fetch()["Points"];

$stmt = getDB()->prepare("SELECT Answer, Comment, Points_Earned FROM Answers WHERE EID = :eid AND QID = :qid AND UID = :uid");
$stmt->execute([":eid" => $eid, ":qid" => $qid, ":uid" => $uid]);
$row = $stmt->fetch();
$answer = $row["Answer"];
$comment = $row["Comment"];
$pointsEarned = $row["Points_Earned"];

$question = ["name" => $name,"title" => $questionTitle, "answer" => $answer, "comments" => $comment, "points_earned" => $pointsEarned, "points_total" => $pointsTotal, "testcases" => []];

$stmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases where QID = :qid");
$stmt->execute([":qid" => $qid]);

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$tcid = $row["TCID"];
	$test = $row["test"];
	$expected = $row["expected"];
	$qstmt = getDB()->prepare("SELECT Output, Result FROM QTCS where QID = :qid AND UID = :uid AND TCID = :tcid");
	$qstmt->execute([":qid" => $qid, ":uid" => $uid, ":tcid" => $tcid]);
	$qrow = $qstmt->fetch();
	$output = $qrow["Output"];
	$result = $qrow["Result"];
	if($result == 0) {
		$result = false;
	} else {
		$result = true;
	}
	$testcase = ["input" => $test, "expected" => $expected, "user_output" => $output, "result" => $result];
	array_push($question["testcases"], $testcase);
}
echo json_encode($question);
?>
