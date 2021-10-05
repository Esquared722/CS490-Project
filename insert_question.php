<?php
	require(__DIR__."/dbconnection.php");
	session_start();
	$user = $_SESSION["user"];
		
	$title = $_POST["title"];
	$prompt = $_POST["prompt"];
	$testCaseList = $_POST["test"];
	$expectedList = $_POST["expected"];
	
	var_dump($user);
	var_dump($title);
	var_dump($prompt);
	var_dump($testCaseList);
	var_dump($expectedList);
	
	//Get UID from Users table
	$stmt = getDB()->prepare("SELECT UID FROM Users WHERE user_name = :user");
	$stmt->execute([":user"=>$user]);
	$result = $stmt->fetch(PDO::FETCH_ASSOC);
	$UID = $result["UID"];

	//Insert into Questions table
	$stmt = getDB()->prepare("INSERT INTO Questions (title, prompt, UID) VALUES(:title, :prompt, :UID)");
	$stmt->execute([":title"=>$title, ":prompt"=>$prompt, ":UID"=>$UID]);
	
	//Get recently created question QID
	$QID = getDB()->lastInsertId();
	for ($i = 0; $i < count($testCaseList); $i++) {
		$testCase = $testCaseList[$i];
		$expected = $expectedList[$i];
		$stmt = getDB()->prepare("INSERT INTO TestCases (QID, test, expected) VALUES(:QID, :test, :expected)");
		$stmt->execute([":QID"=>$QID, ":test"=>$testCase, ":expected"=>$expected]);
	}

	echo "<script>window.location.replace = 'make_questions.html'; </script>
?>
