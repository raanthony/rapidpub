<?php
session_start();
if ( 'POST' == $_SERVER['REQUEST_METHOD'] ) {
	if ( isset( $_SERVER['HTTP_ORIGIN'] ) ) {
		$address = 'http://' . $_SERVER['SERVER_NAME'];
		if ( strpos( $address, $_SERVER['HTTP_ORIGIN'] ) !== 0 ) {
			exit( 'CSRF protection in POST request: detected invalid Origin header: ' . $_SERVER['HTTP_ORIGIN'] );
		}
	}
}
error_reporting(E_ALL);
ini_set('display_errors', '1');
if ( isset( $_SESSION['rapidpub'] ) ) {
	$prodID = $_SESSION['prodID'];
	unset( $_SESSION['rapidpub'] );
	$_SESSION['prodID'] = $prodID;
	echo json_encode(['reset' => true]);
} else {
	echo json_encode(['reset' => false]);
}
?>