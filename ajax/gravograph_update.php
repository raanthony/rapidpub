<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

error_reporting(E_ALL);
ini_set('display_errors', '1');

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

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else	die();

if ( isset( $_POST['id'] ) ) {

	$id = $_POST['id'];
	$type = $_POST['type'];
	$color = $_POST['couleur'];

	switch( $type ) {
		case 'texte':
			// Image retournée
			$background = new ImagickPixel( 'transparent' );
			$im = new Imagick();
			$draw = new ImagickDraw();
			$draw->setFont( $_SESSION['rapidpub'][$productID]['text'][$id]['font'] );
			$draw->setFontSize( 400 );
			//$draw->setFillColor( $color );
			$draw->setStrokeAntialias( true );
			$draw->setTextAntialias( true );
			$fm = $im->queryFontMetrics( $draw, $_SESSION['rapidpub'][$productID]['text'][$id]['text'] );
			$draw->annotation( $fm['boundingBox']['y2'], $fm['ascender'], $_SESSION['rapidpub'][$productID]['text'][$id]['text'] );
			$im->newImage( $fm['textWidth'] + $fm['boundingBox']['y2'] + $fm['boundingBox']['x2'], $fm['textHeight'], $background );
			$im->setImageFormat( 'png' );
			$im->drawImage( $draw );
			$im->colorizeImage($color, 0.0);
			$im->trimImage( 0 );
			$_SESSION['rapidpub'][$productID]['text'][$id]['color'] = $color;
			$_SESSION['rapidpub'][$productID]['text'][$id]['image'] = base64_encode( $im );
			echo base64_encode( $im );
		break;
		case 'motif':
			$im = new Imagick('.' . $_SESSION['rapidpub'][$productID]['motif'][$id]['motif']);
			$im->colorizeImage($color, 0.0);
			$im->trimImage( 0 );
			$_SESSION['rapidpub'][$productID]['motif'][$id]['color'] = $color;
			$_SESSION['rapidpub'][$productID]['motif'][$id]['image'] = base64_encode( $im );
			echo base64_encode( $im );
		break;
		default: die();
	}

}
?>