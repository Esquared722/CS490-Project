<?php
session_start();
//Give data to find student exam and grade it
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$uid = $_GET["uid"];

//select questions from the exam
$stmt = getDB()->prepare("SELECT QID, Points FROM EQ WHERE EID = :eid");
$stmt->execute([":eid" => $eid]);
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	//loop through questions and check each test case
	$stmt = getDB()->prepare("SELECT Answer FROM Answers WHERE UID = :uid AND QID = :qid");
	$stmt->execute([":uid" => $uid, ":qid" => $qid]);
	$answer = $stmt->fetch();

	$stmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases QID = :qid");
	$stmt->execute([":qid" => $qid]);
	$numCases = 0;
	$numCasesCorrect = 0;
	while($qrow = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$numCases += 1;
		$fileName = $uid . $eid . $row["QID"] . $qrow["TCID"] .".py";
		$myfile = fopen($fileName, "w") or die ("Cant open");
		fwrite($myfile, $answer);
		fwrite($myfile. $test);
		fclose($myfile);
		passthru("python3 " . $fileName, $output);
		$result = 0;
		if($output === $qrow["expected"]) {
			$result = 1;
			$numCasesCorrect += 1;
		}
		$stmt = getDB()->prepare("REPLACE INTO QTCS VALUES (:qid, :tcid, :uid, :result)");
		$stmt->execute([":qid" => $row["QID"], ":tcid" => $row["TCID"], ":uid" => $uid, ":result" => $result]);
		//unlink($fileName);
	}
		$points_earned = $row["Points"] / $numCases * $numCasesCorrect;
		$stmt = getDB()->prepare("REPLACE INTO Answers (Points_Earned) VALUES (:points_earned) WHERE QID = :qid, EID = :eid, UID = :uid");
		$stmt->execute([":points_earned" = > $points_earned, ":eid" => $row["EID"], ":qid" => $row["QID"], ":uid" => $uid]);

}
?>
