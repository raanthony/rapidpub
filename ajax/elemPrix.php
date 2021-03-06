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

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else	die();

$prix = 00.00;

if ( isset( $_SESSION['rapidpub'][$productID]['motif'] ) AND !empty( $_SESSION['rapidpub'][$productID]['motif'] ) ) {
	$elemM = $_SESSION['rapidpub'][$productID]['motif'];
	foreach ( $elemM AS $element ) {
		if ( isset( $element['tarif'] ) )
			$prix += $element['tarif'];
	}
}

if ( isset( $_SESSION['rapidpub'][$productID]['text'] ) AND !empty( $_SESSION['rapidpub'][$productID]['text'] ) ) {
	$elemT = $_SESSION['rapidpub'][$productID]['text'];
	foreach ( $elemT AS $element ) {
		if ( isset( $element['tarif'] ) )
			$prix += $element['tarif'];
	}
}

if ( isset( $_SESSION['rapidpub'][$productID]['image'] ) AND !empty( $_SESSION['rapidpub'][$productID]['image'] ) ) {
	$elemT = $_SESSION['rapidpub'][$productID]['image'];
	foreach ( $elemT AS $element ) {
		if ( isset( $element['tarif'] ) )
			$prix += $element['tarif'];
	}
}

if ( isset( $_SESSION['rapidpub'][$productID]['fond'] ) AND !empty( $_SESSION['rapidpub'][$productID]['fond'] ) ) {
	$elemT = $_SESSION['rapidpub'][$productID]['fond'];
	foreach ( $elemT AS $element ) {
		if ( isset( $element['tarif'] ) )
			$prix += $element['tarif'];
	}
}

if ( isset( $_SESSION['rapidpub'][$productID]['forme'] ) AND !empty( $_SESSION['rapidpub'][$productID]['forme'] ) ) {
	$elemT = $_SESSION['rapidpub'][$productID]['forme'];
	foreach ( $elemT AS $element ) {
		if ( isset( $element['tarif'] ) )
			$prix += $element['tarif'];
	}
}

echo $prix;
?>