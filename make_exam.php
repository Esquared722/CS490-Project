<?php
	require(__DIR__."/dbconnection.php");
	session_start();
	$sid = $_SESSION["sid"];
		
	$title = $_POST["title"];
	$qid = $_POST["qid"];	
	$points = $_POST["points"];
	//create new exam	
	$stmt = getDB()->prepare("INSERT INTO Exams (title, SID, Created_On) VALUES(:title, :sid, now())");
	$stmt->execute([":title"=>$title, ":sid"=>$sid]);
	
	//Get recently created EID
	$EID = getDB()->lastInsertId();

	//Insert into EQ table
	$stmt = getDB()->prepare("INSERT INTO EQ (EID, QID, Points) VALUES(:EID, :QID, :points)");

	for($i = 0/*, $j = 0*/; $i < count($qid); $i++){
		$QID = $qid[$i];
		/* Since we are adding questions, don't think we need this while anymore
		while($j <= $i && $points[$j] == "" ) {
			$j++;
		}
		 */
		$pts = $points[$i];
		//$j++;
		$stmt->execute([":EID"=>$EID, ":QID"=>$QID, ":points"=>$pts]);
	}
	$stmt = getDB()->prepare("SELECT UID FROM Users WHERE SID = :sid AND role = 'client'");
	$stmt->execute([":sid"=>$sid]);
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {	
		$estmt = getDB()->prepare("INSERT INTO STE (UID, EID, Completed) VALUES(:UID, :EID, :completed)");
		$estmt->execute([":UID"=>$row["UID"], ":EID"=>$EID, ":completed"=>0]);
	}
	echo "<script>alert('Exam: " . $title . " Created!');window.location.replace('exams.html');</script>";
?>
