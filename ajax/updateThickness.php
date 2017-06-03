<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

if ( 'POST' == $_SERVER['REQUEST_METHOD'] ) {
	if ( isset( $_SERVER['HTTP_ORIGIN'] ) ) {
		$address = 'http://' . $_SERVER['SERVER_NAME'];
		if ( strpos( $address, $_SERVER['HTTP_ORIGIN'] ) !== 0 ) {
			exit( 'CSRF protection in POST request: detected invalid Origin header: ' . $_SERVER['HTTP_ORIGIN'] );
		}
	}
}

require_once( '../includes/connexion.php' );
require_once( '../includes/functions.php' );

if ( isset( $_POST['thickness'] ) AND is_numeric( $_POST['thickness'] ) ) {
	$epaisseur = (int)$_POST['thickness'];
	$_SESSION['prodEpaisseur'] = $epaisseur;
}

?>