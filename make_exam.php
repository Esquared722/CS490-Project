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

	for($i = 0, $j = 0; $i < count($qid); $i++){
		$QID = $qid[$i];
		while($j <= $i && $points[$j] == "" ) {
			$j++;
		}
		$pts = $points[$j];
		$stmt->execute([":EID"=>$EID, ":QID"=>$QID, ":points"=>$pts]);
	}
	echo "<script>window.location.replace('exams.html') </script>";
?>