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

error_reporting(E_ALL);
ini_set('display_errors', '1');

$session = md5( session_id()+time() );
require_once( '../includes/connexion.php' );
require_once( '../includes/functions.php' );

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else die();

if ( isset( $_POST['motif'] ) AND $_POST['motif'] != '' AND isset( $_POST['action'] ) AND $_POST['action'] == 'update'  AND file_exists( '../img/motifs/' . $_POST['folder'] . '/' . $_POST['motif'] ) ) {

	$motifUrl = $_POST['motif']; // motif
	$motifFolder = $_POST['folder']; // répertoire motifs
	$color = $_POST['couleur']; //couleur du texte
	$getFile = '../img/motifs/' . $_POST['folder'] . '/' . $motifUrl;
	$url = '';
	$id = md5( uniqid( rand(), true ) );

	$im = new Imagick( $getFile );
	$im->setImageAlphaChannel( Imagick::ALPHACHANNEL_EXTRACT );
	$im->setImageBackgroundColor( $color);
	$im->setImageAlphaChannel( Imagick::ALPHACHANNEL_SHAPE );
	$im->trimImage( 0 );

	$data = array(
		'id'			=> $id,
		'motif'			=> './img/motifs/' . $motifFolder . '/' . $motifUrl,
		'imgMotif'		=> base64_encode( $im->getImageBlob() ),
		'code'			=> $motifUrl,
		'color'			=> $color,
		'expDate'		=> date( 'Yd/m/Y', strtotime( "+2 days" ) )
	);

	$_SESSION['rapidpub'][$productID]['motif'][$id] = $data;

	echo json_encode( $data );

}

?>
