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

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else	die();

if ( isset( $_POST['fileName'] ) AND file_exists( '../img/motifs/' . $_POST['folder'] . '/' . $_POST['fileName'] ) AND $_POST['fileColor'] != '' ) :

	$getFile = '../img/motifs/' . $_POST['folder'] . '/' . $_POST['fileName'];
	$color = $_POST['fileColor'];
	$id = $_POST['id'];

	$_SESSION['rapidpub'][$productID]['motif'][$id]['color'] = $color;

	$im = new Imagick( $getFile );
	if ( isset( $_POST['vitType'] ) AND $_POST['vitType'] == 'adhesif-microperfore' )
		$im->evaluateImage(Imagick::EVALUATE_MULTIPLY, 0.85, Imagick::CHANNEL_ALPHA);
	$im->setImageAlphaChannel( Imagick::ALPHACHANNEL_EXTRACT );
	$im->setImageBackgroundColor( $color);
	$im->setImageAlphaChannel( Imagick::ALPHACHANNEL_SHAPE );
	$im->trimImage( 0 );

	//$im->floodFillPaintImage( 'black', 10, 'red', 0, 0, false );

	echo base64_encode( $im->getImageBlob() );
	$im->clear();
	$im->destroy();

endif;
?>
