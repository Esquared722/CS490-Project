<?php
	require(__DIR__."/dbconnection.php");
	header("Content-Type: application/x-www-form-urlencoded");
	$user = $_POST['user'];
	$passwd = hash("sha512", $_POST['passwd'], false);
	$stmt = getDB()->prepare("Select uid, role, sid FROM Users where user_name = :username AND password = :password LIMIT 1");
	$stmt->execute([":username"=>$user, ":password"=>$passwd]);
	$result = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($result) {
		session_start();
		$_SESSION["user"] = $user;
		$_SESSION["role"] = $result["role"];
		$_SESSION["sid"] = $result["sid"];
		$_SESSION["uid"] = $result["uid"];

		echo $result["role"];
	}
	else {
		echo "Invalid Credentials";
	}
?>
