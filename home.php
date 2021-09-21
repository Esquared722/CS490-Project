<?php
	session_start();
	$user = $_SESSION["user"];
	$role = $_SESSION["role"];

?>
<html>
<body>
<?php	
	if($role == "admin") {
		echo "<h1>Admin Page</h1>";
	} else {
		echo "<h1>Client Page</h1>";
	}
		echo "<h2>Hello, " . $user;
?>
	
</body>
</html>
