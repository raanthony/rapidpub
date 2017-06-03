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

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else die();

if ( isset( $_POST['action'] ) AND $_POST['action'] == 'delete' AND isset( $_POST['id'] ) AND $_POST['id'] != '' ) {

	switch ($_POST['typedel']) {
		case 'text':
		case 'image':
		case 'motif':
		case 'fond':
		case 'forme':
			if ( isset( $_SESSION['rapidpub'][$productID][$_POST['typedel']][$_POST['id']] ) )
				unset( $_SESSION['rapidpub'][$productID][$_POST['typedel']][$_POST['id']] );
			break;
		
		default:
			die();
			break;
	}

}
?>
