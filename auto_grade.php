<?php
session_start();
//Give data to find student exam and grade it
require(__DIR__."/dbconnection.php");
$eid = $_GET["eid"];
$sid = $_SESSION["sid"];

$stmt = getDB()->prepare("SELECT UID, user_name FROM Users WHERE SID = :sid AND role = 'client'");
$stmt->execute([":sid" => $sid]);
$students = [];
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$uid = $row["UID"];
	$userName = $row["user_name"];
	//select questions from the exam
	$qstmt = getDB()->prepare("SELECT QID, Points FROM EQ WHERE EID = :eid");
	$qstmt->execute([":eid" => $eid]);
	$totalPoints = 0;
	$totalPointsEarned = 0;
	while($qrow = $qstmt->fetch(PDO::FETCH_ASSOC)){
		//loop through questions and check each test case
		$qid = $qrow["QID"];
		$astmt = getDB()->prepare("SELECT Answer FROM Answers WHERE UID = :uid AND QID = :qid");
		$astmt->execute([":uid" => $uid, ":qid" => $qid]);
		$answer = $astmt->fetch()["Answer"];

		$tstmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases WHERE QID = :qid");
		$tstmt->execute([":qid" => $qid]);
		$numCases = 0;
		$numCasesCorrect = 0;
		while($trow = $tstmt->fetch(PDO::FETCH_ASSOC)) {
			$test = $trow["test"];
			$numCases += 1;
			$fileName = $_SERVER["DOCUMENT_ROOT"]."/$uid$eid$qid.test.py";
			$myfile = fopen($fileName, "a") or die ("Cant open");
			fwrite($myfile, $answer);
			fwrite($myfile, "\n"."print($test)");
			fclose($myfile);
			exec("python3 " . $fileName, $output);
			$result = 0;
			if($output[0] === $trow["expected"]) {
				$result = 1;
				$numCasesCorrect += 1;
			}
			$tcstmt = getDB()->prepare("REPLACE INTO QTCS(EID, QID, TCID, UID, Output, Result) VALUES (:eid, :qid, :tcid, :uid, :output, :result)");
			$tcstmt->execute([":eid"=>$eid, ":qid" => $qid, ":tcid" => $trow["TCID"], ":uid" => $uid, ":output" => $output[0],":result" => $result]);
			unset($output);
			unlink($fileName);
		}
		$points_earned = $qrow["Points"] / $numCases * $numCasesCorrect;
		$totalPoints += $qrow["Points"];
		$totalPointsEarned += $points_earned;
		$pstmt = getDB()->prepare("UPDATE Answers SET Points_Earned = :points_earned WHERE QID = :qid AND EID = :eid AND UID = :uid");
		$pstmt->execute([":points_earned" => $points_earned, ":qid" => $qid, ":eid" => $eid, ":uid" => $uid]);
	}
	$finalGrade = ($totalPointsEarned/$totalPoints) * 100;
	$stmt = getDB()->prepare("UPDATE STE SET Grade = :finalGrade WHERE UID = :uid AND EID = :eid");
	$stmt->execute([":finalGrade" => $finalGrade, ":uid" => $uid, ":eid" => $eid]);
	$stmt = getDB()->prepare("SELECT Grade FROM STE WHERE UID = :uid AND EID = :eid");
	$stmt->execute([":uid" => $uid, ":eid" => $eid]);
	$finalGrade = $stmt->fetch()["Grade"];
	$students = [$userName => $finalGrade];
}
echo json_encode($students);
?>
