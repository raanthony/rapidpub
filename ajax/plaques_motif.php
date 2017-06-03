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

$session = md5( session_id()+time() );
require_once( '../includes/connexion.php' );
require_once( '../includes/functions.php' );

if ( isset( $_POST['motif'] ) AND $_POST['motif'] != '' AND isset( $_POST['action'] ) AND $_POST['action'] == 'update'  AND file_exists( '../img/motifs/' . $_POST['folder'] . '/' . $_POST['motif'] ) ) {

	$motifUrl = $_POST['motif']; // motif
	$motifFolder = $_POST['folder']; // répertoire motifs
	$color = $_POST['couleur']; //couleur du texte
	$unitPrice = 0.30;
	$url = '';
	$id = md5( uniqid( rand(), true ) );

	$data = array(
		'id'			=> $id,
		'motif'			=> './img/motifs/' . $motifFolder . '/' . $motifUrl,
		'code'			=> $motifUrl,
		'color'			=> $color,
		'expDate'		=> date( 'Yd/m/Y', strtotime( "+2 days" ) ),
		'prix_unitaire' => $unitPrice
	);

	$_SESSION['rapidpub']['motif'][$id] = $data;

	echo json_encode( $data );

}

?>
