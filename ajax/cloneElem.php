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

error_reporting(E_ALL);
ini_set('display_errors', '1');

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else	die();

if ( isset( $_POST['type'] ) AND isset( $_POST['action'] ) AND $_POST['action'] == 'clone' ) {

	$id = $_POST['id'];
	$newid = md5( uniqid( rand(), true ) );

	switch ( $_POST['type'] ) {
		case 'text':
			$type = 'text';
			break;

		case 'image':
			$type = 'image';
			break;

		case 'motif':
			$type = 'motif';
			break;

		case 'fond':
			$type = 'fond';
			break;

		case 'forme':
			$type = 'forme';
			break;

		default:
			die();
			break;
	}

	$_SESSION['rapidpub'][$productID][$type][$newid] = $_SESSION['rapidpub'][$productID][$type][$id];
	$_SESSION['rapidpub'][$productID][$type][$newid]['id'] = $newid;

	echo json_encode( $_SESSION['rapidpub'][$productID][$type][$newid] );

}
?>
