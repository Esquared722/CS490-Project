<?php
session_start();
//Give data to find student exam and grade it
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$uid = $_GET["uid"];
$sid = $_SESSION["sid"];

$stmt = getDB()->prepare("SELECT UID FROM Users WHERE SID = :sid AND role = client");
$stmt->execute([":sid" => $sid]);
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	//select questions from the exam
	$qstmt = getDB()->prepare("SELECT QID, Points FROM EQ WHERE EID = :eid");
	$qstmt->execute([":eid" => $eid]);
	while($qrow = $qstmt->fetch(PDO::FETCH_ASSOC)){
		//loop through questions and check each test case
		$astmt = getDB()->prepare("SELECT Answer FROM Answers WHERE UID = :uid AND QID = :qid");
		$astmt->execute([":uid" => $uid, ":qid" => $qid]);
		$answer = $astmt->fetch();

		$tstmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases QID = :qid");
		$tstmt->execute([":qid" => $qid]);
		$numCases = 0;
		$numCasesCorrect = 0;
		while($trow = $tstmt->fetch(PDO::FETCH_ASSOC)) {
			$numCases += 1;
			$fileName = $uid . $eid . $qrow["QID"] . $trow["TCID"] .".py";
			$myfile = fopen($fileName, "w") or die ("Cant open");
			fwrite($myfile, $answer);
			fwrite($myfile. $test);
			fclose($myfile);
			passthru("python3 " . $fileName, $output);
			$result = 0;
			if($output === $trow["expected"]) {
				$result = 1;
				$numCasesCorrect += 1;
			}
			$tcstmt = getDB()->prepare("REPLACE INTO QTCS VALUES (:qid, :tcid, :uid, :result)");
			$tcstmt->execute([":qid" => $row["QID"], ":tcid" => $row["TCID"], ":uid" => $uid, ":result" => $result]);
			//unlink($fileName);
		}
		$points_earned = $qrow["Points"] / $numCases * $numCasesCorrect;
		$pstmt = getDB()->prepare("REPLACE INTO Answers (Points_Earned) VALUES (:points_earned) WHERE QID = :qid, EID = :eid, UID = :uid");
		$pstmt->execute([":points_earned" = > $points_earned, ":eid" => $row["EID"], ":qid" => $row["QID"], ":uid" => $uid]);
	}
}
?>
