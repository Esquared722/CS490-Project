<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION["sid"];
$eid = $_POST["eid"];
$qids = $_POST["qid"];
$answers = $_POST["answers"];
$uid = $_SESSION["uid"];
for ($i = 0; $i < count($qids); $i++) {
	$stmt = getDB()->prepare("INSERT INTO Answers(UID, EID, QID, Answer) VALUES(:uid, :eid, :qid, :answer)");
	$stmt->execute([":uid" => $uid, ":eid" => $eid, ":qid" => $qids[$i], ":answer" => $answers[$i]]);
}
$stmt = getDB()->prepare("UPDATE STE SET Completed = 1 WHERE UID = :uid AND EID = :eid");
$stmt->execute([":uid" => $uid, ":eid" => $eid]);

echo "<script>window.location.replace('client.html');</script>";
?>
