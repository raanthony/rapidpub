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

$productID = $_SESSION['prodID'];
if ( !isset( $productID ) )
	die();

if ( isset( $_POST['action'] ) AND $_POST['action'] == 'getsize' ) {

	$id = $_POST['id'];
	
	$vitWidthpx = $_POST['vitWidthpx'];
	$vitHeightpx = $_POST['vitHeightpx'];
	$vitWidthcm = $_POST['vitWidthcm'];
	$vitHeightcm = $_POST['vitHeightcm'];
	$elemWidth = $_POST['elemWidth'];
	$elemHeight = $_POST['elemHeight'];

	$ratio = $vitWidthpx / $vitWidthcm;

	$newWidth = $elemWidth / $ratio;
	$newHeight = $elemHeight / $ratio;

	/* Image longueur */
	$background = new ImagickPixel( 'transparent' );

	$imL = new Imagick();
	$drawL = new ImagickDraw();
	$drawL->setFont( '../fonts/Arial.ttf' );
	$drawL->setFontSize( 10 );
	$drawL->setFillColor( '#ff0000' );
	$drawL->setStrokeAntialias( true );
	$drawL->setTextAntialias( true );
	$fmL = $imL->queryFontMetrics( $drawL, number_format((float)$newWidth, 2, '.', '') );
	$drawL->annotation( 0, 0, number_format((float)$newWidth, 2, '.', '') );
	$imL->newImage( $elemWidth, 12, $background );
	$imL->setGravity(Imagick::GRAVITY_CENTER);
	$imL->setImageFormat( 'png' );
	$imL->drawImage( $drawL );

	$imH = new Imagick();
	$drawH = new ImagickDraw();
	$drawH->setFont( '../fonts/Arial.ttf' );
	$drawH->setFontSize( 10 );
	$drawH->setFillColor( '#ff0000' );
	$drawH->setStrokeAntialias( true );
	$drawH->setTextAntialias( true );
	$fmH = $imH->queryFontMetrics( $drawH, number_format((float)$newHeight, 2, '.', '') );
	$drawH->annotation( 0, 0, number_format((float)$newHeight, 2, '.', '') );
	$imH->newImage( $elemHeight, 30, $background );
	$imH->setGravity(Imagick::GRAVITY_CENTER);
	$imH->setImageFormat( 'png' );
	$imH->drawImage( $drawH );
	$imH->rotateImage(new ImagickPixel('#00000000'), 270);

	$surface = $newWidth * $newHeight;

	$tarif = $surface * 0.0070;

	switch ($_POST['type']) {
		case 'motif':
		case 'text':
		case 'image':
		case 'fond':
		case 'forme':
			$_SESSION['rapidpub'][$productID][$_POST['type']][$id]['tarif'] = $tarif;
			$_SESSION['rapidpub'][$productID][$_POST['type']][$id]['surface'] = $surface;
			$_SESSION['rapidpub'][$productID][$_POST['type']][$id]['motifWidth'] = $newWidth;
			$_SESSION['rapidpub'][$productID][$_POST['type']][$id]['motifHeight'] = $newHeight;
			break;
		default:
			die();
			break;
	}

	$data = array(
		'id'		=> $id,
		'type'		=> 'banderole',
		'longueur' 	=> number_format((float)$newWidth, 2, '.', ''),
		'hauteur'	=> number_format((float)$newHeight, 2, '.', ''),
		'imgL'		=> base64_encode( $imL ),
		'imgH'		=> base64_encode( $imH ),
		'ratio'		=> $ratio,
		'surface'	=> $newWidth * $newHeight,
		'tarifHT'	=> number_format( round( $tarif, 2 ), 2 )
	);

	echo json_encode( $data );

	$imL->clear();
	$imL->destroy();

}
?>
