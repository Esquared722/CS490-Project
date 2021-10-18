<?php
session_start();
require(__DIR__."/dbconnection.php");
$qid = $_POST["qid"];
$uid = $_POST["uid"];
$eid = $_POST["eid"];
$comment = $_POST["comment"];
$grade = $_POST["grade"];
$title = $_POST["title"];
$name = $_POST["name"];



$stmt = getDB()->prepare("UPDATE Answers SET COMMENT = :comment, Points_Earned = :pointsEarned WHERE UID = :uid AND EID = :eid AND QID = :qid");
$stmt->execute([":comment" => $comment, ":pointsEarned" => $grade, ":uid" => $uid, ":eid" => $eid, ":qid" => $qid]);

$stmt = getDB()->prepare("SELECT SUM(Points_Earned) Points_Earned FROM Answers WHERE UID = :uid AND EID = :eid");
$stmt->execute([":uid" => $uid, ":eid" => $eid]);
$totalPointsEarned = $stmt->fetch()["Points_Earned"];

$stmt = getDB()->prepare("SELECT SUM(Points) Points FROM EQ WHERE EID = :eid");
$stmt->execute([":eid" => $eid]);
$totalPoints = $stmt->fetch()["Points"];

$finalGrade = ($totalPointsEarned / $totalPoints) * 100;

$stmt = getDB()->prepare("UPDATE STE SET Grade = :finalGrade WHERE UID = :uid AND EID = :eid");
$stmt->execute([":finalGrade" => $finalGrade, ":uid" => $uid, ":eid" => $eid]);

echo "<script>window.location.replace('exam_student_questions.html?uid=$uid&eid=$eid&title=$title&name=$name');</script>";
?>
