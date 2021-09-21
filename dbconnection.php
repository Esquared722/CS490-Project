<?php
require(__DIR__ . "/../admin.php");
function getDB(){
	global $db;
	if(!isset($db)){
                $dbName = getDBName();
		$dbUser = getUser();
                $dbPass = getPass();
                //DO NOT COMMIT PRIVATE CREDENTIALS TO A REPOSITORY EVER
                $conn_string = "mysql:host=localhost;dbname=".$dbName;//TODO should pull from config or env variables
                $db = new PDO($conn_string, $dbUser, $dbPass);
        }
        return $db;
}
?>	
