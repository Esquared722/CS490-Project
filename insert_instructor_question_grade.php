<?php
session_start();
require(__DIR__."/dbconnection.php");
$uid = $_POST["uid"];
$qid = $_POST["qid"];
$eid = $_POST["eid"];
$comment = $_POST["comment"];
$grade = $_POST["grade"];
$title = $_POST["title"];
$name = $_POST["name"];
$stmt = getDB()->prepare("UPDATE Answers SET Comment = :comment, Points_Earned = :pointsEarned WHERE UID = :uid AND EID = :eid AND QID = :qid");
$stmt->execute([":comment" => $comment, ":pointsEarned" => $grade, ":uid" => $uid, ":eid" => $eid, ":qid" => $qid]);


echo "<script>window.location.replace('exam_student_questions.html?eid=$eid&uid=$uid&title=$title&name=$name');</script>";
?>
