<?php
session_start();
require(__DIR__."/dbconnection.php");
$sid = $_SESSION["sid"];
$eid = $_GET["eid"];
$qids = $_GET["qid"];
$answers = $_GET["answers"];
$uid = $_SESSION["uid"];
var_dump($qids);
for ($i = 0; $i < count($qids); $i++) {
	$stmt = getDB()->prepare("INSERT INTO Answers(UID, EID, QID, Answer) VALUES(:uid, :eid, :qid, :answer)");
	$stmt->execute([":uid" => $uid, ":eid" => $eid, ":qid" => $qids[$i], ":answers" => $answers[$i]]);
}
echo "<script>windows.location.replace('client.html')</script>";
?>
