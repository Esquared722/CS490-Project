<?php
	require(__DIR__."/dbconnection.php");
	session_start();
	$uid = $_SESSION["uid"];
	$title = $_POST["title"];
	$prompt = $_POST["prompt"];
	$testCaseList = $_POST["test"];
	$expectedList = $_POST["expected"];
	$category = $_POST["topic"];
	$difficulty = $_POST["difficulty"];
	$restriction = $_POST["constraint"];	

	//Insert into Questions table
	$stmt = getDB()->prepare("INSERT INTO Questions (title, prompt, UID, category, difficulty, restriction) VALUES(:title, :prompt, :uid, :category, :difficulty, :restriction)");
	$stmt->execute([":title"=>$title, ":prompt"=>$prompt, ":uid"=>$uid, ":category"=>$category, ":difficulty"=>$difficulty, ":restriction"=>$restriction]);
	
	//Get recently created question QID
	$qid = getDB()->lastInsertId();

	//add test for method name
	
	$stmt = getDB()->prepare("INSERT INTO TestCases (QID, test, expected) VALUES(:QID, :test, :expected)");
	$stmt->execute([":QID"=>$qid, ":test"=>"uses correct function name", ":expected"=>"uses correct function name"]);

	//add test for restriction if not none
	if($restriction != "none") {
		$stmt = getDB()->prepare("INSERT INTO TestCases (QID, test, expected) VALUES(:QID, :test, :expected)");
		$stmt->execute([":QID"=>$qid, ":test"=>"uses restriction", ":expected"=>"uses restriction"]);
	}
	
	for ($i = 0; $i < count($testCaseList); $i++) {
		$testCase = $testCaseList[$i];
		$expected = $expectedList[$i];
		$stmt = getDB()->prepare("INSERT INTO TestCases (QID, test, expected) VALUES(:QID, :test, :expected)");
		$stmt->execute([":QID"=>$qid, ":test"=>$testCase, ":expected"=>$expected]);
	}
	echo "<script>alert('Question Added Successfully');</script>";
	echo "<script>window.location.replace('make_questions.html'); </script>";
?>

