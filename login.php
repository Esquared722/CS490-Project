<?php
	session_start();
	require(__DIR__."/dbconnection.php");
	header("Content-Type: application/x-www-form-urlencoded");
	$user = $_POST['user'];
	$passwd = hash("sha512", $_POST['passwd'], false);
	$stmt = getDB()->prepare("Select role FROM Users where user_name = :username AND password = :password LIMIT 1");
	$stmt->execute([":username"=>$user, ":password"=>$passwd]);
	$result = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($result) {
		$_SESSION["user"] = $user;
		$_SESSION["role"] = $result["role"];
		echo $result["role"];
	}
	else {
		echo "Invalid Credentials";
	}
