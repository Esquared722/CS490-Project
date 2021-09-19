<?php 
	session_start();
	require(__DIR__."/dbconnection.php");
	$username = $_POST["user"];
	$password = hash("sha512", $_POST["pass"], false);
	$stmt = getDB()->prepare("Select role FROM Users where user_name = :username AND password = :password LIMIT 1");
	$stmt->execute([":username"=>$username, ":password"=>$password]);
	$result = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($result) {
		$_SESSION["user"] = $username;
		$_SESSION["role"] = $result["role"];
		echo "<script>alert('Login Success $password')</script>";
		echo "<script>window.location = 'home.php'; </script>";
	}
	else {
		echo "<script>alert('Login Failed')</script>";
		echo "<script>window.location = 'login.html'; </script>";
	}
?>
