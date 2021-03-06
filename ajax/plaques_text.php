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

if ( isset( $_POST['text'] ) AND $_POST['text'] != '' AND isset( $_POST['action'] ) AND $_POST['action'] == 'update' ) {

	$text = rawurldecode( $_POST['text'] ); // texte
	$color = $_POST['couleur']; //couleur du texte
	$unitPrice = 0.30;
	$url = '';
	$length = strlen( $text );
	$dimensions = 0;
	$height_plaque = 1;
	$width_plaque = 0;
	$height_text = ( !isset( $_POST['textHeight'] ) ) ? 0 : floatval( $_POST['textHeight'] ); // dimensions text
	$width_text = ( !isset( $_POST['textWidth'] ) ) ? 0 : floatval( $_POST['textWidth'] ); // dimensions text

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

	if ( isset( $_POST['id'] ) ) {
		$id = $_POST['id'];
	} else {
		$id = md5( uniqid( rand(), true ) );
	}

	$data = array(
		'image' 	=> base64_encode( $im ),
		'id' 		=> $id,
		'text'		=> $text,
		'color'		=> $color,
		'font'		=> $textFont,
		'height'	=> $h,
		'width'		=> $w,
		'ratio'		=> floatval( $ratio ),
		'expDate'	=> date( 'Yd/m/Y', strtotime( "+2 days" ) ),
		'nombreLettres' => $length,
		'prix'		=> $length * $unitPrice,
		'prix_unitaire' => $length * $unitPrice
	);

	$_SESSION['rapidpub']['text'][$id] = $data;

	echo json_encode( $data );

	$im->clear();
	$im->destroy();

}

?>
