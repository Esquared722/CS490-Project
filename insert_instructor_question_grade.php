<?php
session_start();
require(__DIR__."/dbconnection.php");
$uid = $_GET["uid"];
$qid = $_GET["qid"];
$eid = $_GET["eid"];
$comment = $_GET["comment"];
$grade = $_GET["grade"];
$stmt = getDB()->prepare("UPDATE Answers SET Comment = :comment, Points_Earned = :pointsEarned WHERE UID = :uid AND EID = :eid AND QID = :qid");
$stmt->execute([":comment" => $comment, ":pointsEarned" => $grade, ":uid" => $uid, ":eid" => $eid, ":qid" => $qid]);


echo "<script>windows.location.replace('exam_students.html?eid=$eid&uid=$uid');</script>";
?>
