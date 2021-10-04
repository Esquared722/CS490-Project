<?php
session_start();
require(__DIR__."/dbconnection.php");
header("Content-Type: text/json");
$SID = $_SESSION['sid'];
$UID = $_SESSION['uid'];
// select qid, title, prompt from db WHERE sid = $sid;

$stmt = getDB()=>prepare("SELECT * FROM Questions WHERE ");
$stmt => execute();
$questions = array();
while($row = $result) {
	$question = array("qid"=>"", "title"=>"", "prompt"=>"", "testcases"=>array());
	$question["qid"] = $row["qid"];
	$question["title"] = $row["title"];
	$question['prompt'] = $row['prompt'];
	// select testcases for question with $row['qid']
	$tc_result = ;
	while($tc_row = $tc_result) {
		$testcase = array("test"=>"", "expected"=>"", "pts"=>"");
		$testcase["test"] = $row['test'];
		$testcase["expected"] = $row['expected'];
		$testcase["pts"] = $row["pts"];
		array_push($data["testcases"], $testcase);
	}
	array_push($questions, $data);
}
echo json_encode($questions);
?>
