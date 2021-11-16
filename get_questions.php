<?php
session_start();
require(__DIR__."/dbconnection.php");
$uid = $_SESSION['uid'];
$stmt = getDB()->prepare("select qid, title, prompt, category, difficulty, restriction FROM Questions where uid = :uid");
$stmt->bindValue(":uid", $uid);
$stmt->execute();

$questions = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$question = array("qid"=>"", "title"=>"", "prompt"=>"", "category"=>"", "difficulty"=>"", "restriction"=>"", "testcases"=>array());
	$question["qid"] = $row["qid"];
	$question["title"] = $row["title"];
	$question['prompt'] = $row['prompt'];
	$question['category'] = $row['category'];
	$question['difficulty'] = $row['difficulty'];
	$question['restriction'] = $row['restriction'];

	// select testcases for question with $row['qid']
	$tc_stmt = getDB()->prepare("select test, expected FROM TestCases where qid = :qid LIMIT 2,100");
	$tc_stmt->bindValue(":qid", $row["qid"]);
	$tc_stmt->execute();
	while($tc_row = $tc_stmt->fetch(PDO::FETCH_ASSOC)) {
		$testcase = array("input"=>"", "expected"=>"");
		$testcase["input"] = $tc_row['test'];
		$testcase["expected"] = $tc_row['expected'];
		array_push($question["testcases"], $testcase);
	}
	array_push($questions, $question);
}
echo json_encode($questions);
?>
