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

$productID = $_SESSION['prodID'];
if ( !isset( $productID ) )
	die();

$longueur = $_POST['bLong'];
$hauteur = $_POST['bHaut'];

$surface = $longueur * $hauteur;
$tarif = $surface * 0.0040;

$data = array(
	'productID'	=> $productID,
	'longueur' 	=> $longueur,
	'hauteur'	=> $hauteur,
	'surface'	=> $surface,
	'prixHT'	=> $tarif
);

$_SESSION['rapidpub'][$productID]['info'] = $data;

echo json_encode( $data ); 
