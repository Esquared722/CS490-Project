<?php
	require(__DIR__."/dbconnection.php");
	session_start();
	$uid = $_SESSION["uid"];
		
	$title = $_POST["title"];
	$prompt = $_POST["prompt"];
	$testCaseList = $_POST["test"];
	$expectedList = $_POST["expected"];
	
	//Insert into Questions table
	$stmt = getDB()->prepare("INSERT INTO Questions (title, prompt, UID) VALUES(:title, :prompt, :uid)");
	$stmt->execute([":title"=>$title, ":prompt"=>$prompt, ":uid"=>$uid]);
	
	//Get recently created question QID
	$qid = getDB()->lastInsertId();
	for ($i = 0; $i < count($testCaseList); $i++) {
		$testCase = $testCaseList[$i];
		$expected = $expectedList[$i];
		$stmt = getDB()->prepare("INSERT INTO TestCases (QID, test, expected) VALUES(:QID, :test, :expected)");
		$stmt->execute([":QID"=>$qid, ":test"=>$testCase, ":expected"=>$expected]);
	}

	echo "<script>window.location.replace('make_questions.html'); </script>";
?>

