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
	$totalExamPoints = 0;
	$totalQuestionPointsEarned = 0;
	while($qrow = $qstmt->fetch(PDO::FETCH_ASSOC)){
		//loop through questions and check each test case
		$qid = $qrow["QID"];
		$totalExamPoints += $qrow["Points"];
		$astmt = getDB()->prepare("SELECT title, restriction FROM Questions WHERE QID = :qid");
		$astmt->execute([":qid" => $qid]);
		$q = $astmt->fetch();
		$title = $q["title"];
		$restriction = $q["restriction"];
		$astmt = getDB()->prepare("SELECT Answer FROM Answers WHERE UID = :uid AND QID = :qid AND EID = :eid");
		$astmt->execute([":uid" => $uid, ":qid" => $qid, ":eid" => $eid]);
		$answer = $astmt->fetch()["Answer"];

		if($answer === null) {
			$astmt = getDB()->prepare("INSERT INTO Answers(UID, EID, QID, Answer) VALUES(:uid, :eid, :qid, :answer)");
        		$astmt->execute([":uid" => $uid, ":eid" => $eid, ":qid" => $qid, ":answer" => ""]);			
			$answer = "";
			$stmt = getDB()->prepare("UPDATE STE SET Completed = 1 WHERE UID = :uid AND EID = :eid");
			$stmt->execute([":uid" => $uid, ":eid" => $eid]);	
		}

		$tstmt = getDB()->prepare("SELECT COUNT(TCID) as count FROM TestCases WHERE QID = :qid AND test <> 'uses correct function name' AND test <> 'uses restriction'");
		$tstmt->execute([":qid" => $qid]);
		$numTC = $tstmt->fetch()["count"];
		
		$tstmt = getDB()->prepare("SELECT TCID, test, expected FROM TestCases WHERE QID = :qid");
		$tstmt->execute([":qid" => $qid]);

		if($restriction != "None"){
			$functionNameGrade = 0.1;
			$functionNameCorrect = 0;
			$restrictGrade = 0.2;
			$restrictCorrect = 0;
			$testCaseGrade = 0.7;
		} else {
			$functionNameGrade = 0.1;
			$functionNameCorrect = 0;
			$restrictGrade = 0;
			$restrictCorrect = 0;
			$testCaseGrade = 0.9;
		}
		
		while($trow = $tstmt->fetch(PDO::FETCH_ASSOC)) {
			$pointsEarned = 0;
			$output = "";
			$result = 0;
			$test = $trow["test"];
			//check for function name
			$lines = explode("\n", $answer);
			if($test == "uses correct function name") {
				$output = "Correct Function Name";
				$maxPoints = $functionNameGrade * $qrow["Points"];
				foreach($lines as $line) {
					$lineWords = explode(" ", $line);
					if($lineWords[0] == "def") {
						$correctName = substr($title, 0, strpos($title, "("));
						$userFunctionName = substr($lineWords[1], 0, strpos($lineWords[1], "("));
						if($userFunctionName == $correctName) {
							$result = 1;
							$pointsEarned = $maxPoints;
							break;
						} else {
							$answer = str_replace(" ".$userFunctionName."(", " ".$correctName."(", $answer);
						}
					}
				}
			} else if($test == "uses restriction") {
				$maxPoints = $restrictGrade * $qrow["Points"];
				$restrictionFound = 0;
				$output = "Restriction Applied";
				if($restriction == "For Loop") {
					$restrictionName = "for";
				} else if ($restriction == "While Loop") {
					$restrictionName = "while";
				} else if ($restriction == "Recursion") {
					$restrictionName = substr($title, 0, strpos($title, "("));
				}
				foreach($lines as $line) {
					if(strpos($line, "def")) {
						continue;
					} else {
						if(strpos($line, $restrictionName)) {
							$restrictionFound = 1;
							$result = 1;
							$pointsEarned = $maxPoints;
							break;
						}
					}
				}
			}
			else{		
				$maxPoints = (1/$numTC) * $testCaseGrade * $qrow["Points"];
				$fileName = $_SERVER["DOCUMENT_ROOT"]."/$uid$eid$qid.test.py";	
				if($answer != "") {
					$myfile = fopen($fileName, "a") or die ("Cant open");
					fwrite($myfile, $answer);
					fwrite($myfile, "\n"."print($test)");
					fclose($myfile);
					exec("python3 " . $fileName, $out);
					if(count($out) > 0) {
						$output = $out[count($out) - 1];
						if($output === $trow["expected"]) {
							$result = 1;
							$pointsEarned = $maxPoints;
						}
					}
				
				unlink($fileName);
				unset($out);
				}
			
				$tcstmt = getDB()->prepare("INSERT INTO QTCS(EID, QID, TCID, UID, Output, Result, Points, Max_Points) VALUES (:eid, :qid, :tcid, :uid, :output, :result, :pointsEarned, :maxPoints) ON DUPLICATE KEY UPDATE EID = :eid, QID = :qid, TCID = :tcid, UID = :uid, Output = :output, Result = :result, Points = :pointsEarned, Max_Points = :maxPoints");
				$tcstmt->execute([":eid"=>$eid, ":qid" => $qid, ":tcid" => $trow["TCID"], ":uid" => $uid, ":output" => $output,":result" => $result, ":pointsEarned"=>$pointsEarned, ":maxPoints"=>$maxPoints]);
			
			}
		}
		
		$pstmt = getDB()->prepare("SELECT SUM(Points) as totalPointsEarned, SUM(Max_Points) as totalPoints FROM QTCS WHERE QID = :qid AND EID = :eid AND UID = :uid");
		$pstmt->execute([":qid"=>$qid, ":eid"=>$eid, ":uid"=>$uid]);
		$answerPoints = $pstmt->fetch();
		$questionPointsEarned = ($answerPoints["totalPointsEarned"]/$answerPoints["totalPoints"])*$qrow["Points"];
		$totalQuestionPointsEarned += $questionPointsEarned;
		$pstmt = getDB()->prepare("UPDATE Answers SET Points_Earned = :points_earned WHERE QID = :qid AND EID = :eid AND UID = :uid");
		$pstmt->execute([":points_earned" => ($answerPoints["totalPointsEarned"]/$answerPoints["totalPoints"])*$qrow["Points"], ":qid" => $qid, ":eid" => $eid, ":uid" => $uid]);
	}
	$finalGrade = ($totalQuestionPointsEarned/$totalExamPoints) * 100;
	$qstmt = getDB()->prepare("UPDATE STE SET Grade = :finalGrade WHERE UID = :uid AND EID = :eid");
	$qstmt->execute([":finalGrade" => $finalGrade, ":uid" => $uid, ":eid" => $eid]);
	$qstmt = getDB()->prepare("SELECT Grade FROM STE WHERE UID = :uid AND EID = :eid");
	$qstmt->execute([":uid" => $uid, ":eid" => $eid]);
	$finalGrade = $qstmt->fetch()["Grade"];
	$student = [$userName => $finalGrade];
	array_push($students, $student);
	
}
?>
