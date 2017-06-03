<?php
define( 'DBHOST','localhost' );
define( 'DBNAME','rapidpub' );
define( 'DBUSER','rapidpub' );
define( 'DBPASS','5jL-9mVVX_71' );

try {

	$db = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

}

catch (Exception $e){

	echo "Connexion à MySQL impossible : ", $e->getMessage();
	die();

}
?>