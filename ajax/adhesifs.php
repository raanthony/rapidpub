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

if ( isset( $_SESSION['prodID'] ) ) $productID = $_SESSION['prodID']; else die();

if ( isset( $_POST['text'] ) AND $_POST['text'] != '' AND isset( $_POST['action'] ) AND $_POST['action'] == 'update' ) {

	$text = rawurldecode( $_POST['text'] ); // texte
	$color = $_POST['couleur']; //couleur du texte
	$unitPrice = 0.30;
	$length = strlen( $text );
	$qty = intval( $_POST['nb'] );
	$font = $_POST['font'];
	$height = floatval( $_POST['height'] ); //dimensions en mm
	$width = floatval( $_POST['width'] ); // dimensions en mm

	$font = $_POST['font'];
	$textFont = '../fonts/' . $font;
	if ( !file_exists( $textFont ) )
		die();

	// Image retournée
	$background = new ImagickPixel( 'transparent' );
	$im = new Imagick();
	$draw = new ImagickDraw();
	$draw->setFont( $textFont );
	$draw->setFontSize( 200 );
	$draw->setFillColor( $color );
	$draw->setStrokeAntialias( true );
	$draw->setTextAntialias( true );
	$fm = $im->queryFontMetrics( $draw, $text );
	$draw->annotation( $fm['boundingBox']['y2'], $fm['ascender'], $text );
	$im->newImage( $fm['textWidth'] + $fm['boundingBox']['y2'] + $fm['boundingBox']['x2'], $fm['textHeight'], $background );
	$im->setImageFormat( 'png' );
	$im->drawImage( $draw );
	$im->trimImage( 0 );

	$d = $im->getImageGeometry();
	$w = $d['width'];
	$h = $d['height'];

	$ratio = $h / $w;

	if ( $height != 0 ) {

		$newWidth = $height / $ratio;
		$data = array(
			'image' 	=> base64_encode( $im ),
			'text'		=> $text,
			'height'	=> $height,
			'width'		=> round( $newWidth, 2 ),
			'ratio'		=> floatval( $ratio ),
			'expDate'	=> date( 'd/m/Y', strtotime( "+2 days" ) ),
			'nombreLettres' => $length,
			'prix'		=> $length * $unitPrice * $qty,
			'prix_unitaire' => $length * $unitPrice
		);

	} elseif ( $width != 0 ) {

		$newHeight = $width * $ratio;
		$data = array(
			'image' 		=> base64_encode( $im ),
			'text'			=> $text,
			'height'		=> round( $newHeight, 2 ),
			'width'			=> $width,
			'ratio'			=> floatval( $ratio ),
			'expDate'		=> date( 'Yd/m/Y', strtotime( "+2 days" ) ),
			'nombreLettres' => $length,
			'prix'			=> $length * $unitPrice * $qty,
			'prix_unitaire' => $length * $unitPrice,
			'origin'		=> $_SERVER['HTTP_ORIGIN']
		);

	}

	$_SESSION['rapidpub'][$productID][$data];

	echo json_encode( $data );

	$im->clear();
	$im->destroy();

}

?>
