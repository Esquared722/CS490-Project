<?php
session_start();
require(__DIR__."/dbconnection.php");
if($_SESSION["role"] == "client") {
	$uid = $_SESSION["uid"];
} else {
	$uid = $_GET['uid'];
}

$eid = $_GET['eid'];
$qid = $_GET["qid"];

$stmt = getDB()->prepare("SELECT user_name FROM Users WHERE UID = :uid");
$stmt->execute([":uid" => $uid]);
$name = $stmt->fetch()["user_name"];

$stmt = getDB()->prepare("SELECT Title, category, difficulty, restriction FROM Questions WHERE QID = :qid");
$stmt->execute([":qid" => $qid]);
$row = $stmt->fetch();
$questionTitle = $row["Title"];
$category = $row["category"];
$difficulty = $row["difficulty"];
$restriction = $row["restriction"];

$stmt = getDB()->prepare("SELECT Points FROM EQ WHERE EID = :eid AND QID = :qid");
$stmt->execute([":eid" => $eid, ":qid" => $qid]);
$pointsTotal = $stmt->fetch()["Points"];

$stmt = getDB()->prepare("SELECT Answer, Comment, Points_Earned FROM Answers WHERE EID = :eid AND QID = :qid AND UID = :uid");
$stmt->execute([":eid" => $eid, ":qid" => $qid, ":uid" => $uid]);
$row = $stmt->fetch();
$answer = $row["Answer"];
$comment = $row["Comment"];
$pointsEarned = $row["Points_Earned"];

$question = ["name" => $name,"title" => $questionTitle, "answer" => $answer, "comments" => $comment, "category" => $category, "difficulty" => $difficulty, "restriction" => $restriction, "points_earned" => $pointsEarned, "points_total" => $pointsTotal, "testcases" => []];

$stmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases where QID = :qid");
$stmt->execute([":qid" => $qid]);

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$tcid = $row["TCID"];
	$test = $row["test"];
	$expected = $row["expected"];
	$qstmt = getDB()->prepare("SELECT Output, Result, Points, Max_Points FROM QTCS where QID = :qid AND UID = :uid AND TCID = :tcid AND EID = :eid");
	$qstmt->execute([":qid" => $qid, ":uid" => $uid, ":tcid" => $tcid, ":eid" => $eid]);
	$qrow = $qstmt->fetch();
	$output = $qrow["Output"];
	$result = $qrow["Result"];
	if($result == 0) {
		$result = false;
	} else {
		$result = true;
	}
	$pointsEarned = $qrow["Points"];
	$maxPoints = $qrow["Max_Points"];
	$testcase = ["tcid" => $tcid, "input" => $test, "expected" => $expected, "output" => $output, "result" => $result, "points_earned" => $pointsEarned, "max_points" => $maxPoints];
	array_push($question["testcases"], $testcase);
}
echo json_encode($question);
?>
