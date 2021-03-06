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

include_once 'phpColors/Color.php';

use Mexitek\PHPColors\Color;

$font = $_POST['font'];
$textFont = '../fonts/' . $font;
if ( !file_exists( $textFont ) )
	die();
$text = $_POST['text'];
$height = $_POST['height'];
$cFace = $_POST['couleurFace'];
$cFont = $_POST['font'];
$cChamp = $_POST['couleurChamp'];
$matiere = (int) $_POST['matiere'];
$epaisseur = $_POST['epaisseur'];
$perspective = $_POST['perspective'];
if ( $epaisseur <= 3 AND $matiere != 9 )
	$epaisseur = $epaisseur;
else
	$epaisseur = $epaisseur/2;

$background = new ImagickPixel( 'transparent' );

$im = new Imagick();
$im2 = new Imagick();
$draw = new ImagickDraw();
$draw2 = new ImagickDraw();

$draw->setFont( $textFont );
$draw->setFontSize( 200 );
if ( $matiere == 6 )
	$draw->setFillColor( '#FFFFFF' );
else
	$draw->setFillColor( $cFace );
$draw->setStrokeAntialias( true );
$draw->setTextAntialias( true );

$draw2->setFont( $textFont );
$draw2->setFontSize( 200 );
/* Face */
switch ( $matiere ) {
	case 3:
		$overlay = new Imagick( '../img/alu.jpg' );
		$draw->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw->popPattern();
		$draw->setFillPatternURL('#myOverlay');
		break;
	case 4:
		$overlay = new Imagick( '../img/bois.jpg' );
		$draw->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw->popPattern();
		$draw->setFillPatternURL('#myOverlay');
		break;
	case 7:
		$overlay = new Imagick( '../img/test.png' );
		$draw->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw->popPattern();
		$draw->setFillPatternURL('#myOverlay');
		break;
	case 8:
		$overlay = new Imagick( '../img/miroir.jpg' );
		$draw->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw->popPattern();
		$draw->setFillPatternURL('#myOverlay');
		break;
}
/* Champ */
switch ( $matiere ) {
	case 1:
		if ( $cFace == '#f7f7f7' )
			$draw2->setFillColor( '#ddd9d9' );
		else
			$draw2->setFillColor( '#ffffff' );
		break;
	case 2:
		$draw2->setFillColor( '#2d2d2d' );
		break;
	case 3:
	case 8:
		$draw2->setFillColor( '#cccccc' );
		break;
	case 4:
		$overlay = new Imagick( '../img/bois2.jpg' );
		$draw2->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw2->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw2->popPattern();
		$draw2->setFillPatternURL('#myOverlay');
		break;
	case 5:
		$newColor = new Color( $cFace );
		$champ = $newColor->darken();
		$draw2->setFillColor( '#' . $champ );
		break;
	case 6:
		$newColor = new Color( '#ffffff' );
		$champ = $newColor->darken();
		$draw2->setFillColor( '#' . $champ );
		break;
	case 7:
		$overlay = new Imagick( '../img/test.png' );
		$draw2->pushPattern( 'myOverlay', 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight());
		$draw2->composite(Imagick::COMPOSITE_COPY, 0, 0,
		$overlay->getImageWidth(), $overlay->getImageHeight(), $overlay);
		$draw2->popPattern();
		$draw2->setFillPatternURL('#myOverlay');
		break;
	default:
		$draw2->setFillColor( '#ffffff' );
		break;
}

$draw2->setStrokeAntialias( true );
$draw2->setTextAntialias( true );
$draw2->setStrokeOpacity( 0.7 );
/**/

$fm = $im->queryFontMetrics( $draw, $text );
$draw->annotation( $fm['boundingBox']['y2'], $fm['ascender'], $text );
$draw2->annotation( $fm['boundingBox']['y2'], $fm['ascender'], $text );

$im->newImage( $fm['textWidth'] + $fm['boundingBox']['y2'] + $fm['boundingBox']['x2'], $fm['textHeight'], $background );
$im->setImageFormat( 'png' );
$im->drawImage( $draw );

$im2->newImage( $fm['textWidth'] + $fm['boundingBox']['y2'] + $fm['boundingBox']['x2'], $fm['textHeight'], $background );
$im2->setImageFormat( 'png' );
$im2->drawImage( $draw2 );

if ( $perspective == 'true' ) {
	$fond= clone $im2;
	$fond->setImageBackgroundColor( new ImagickPixel( 'transparent' ) );
	$fond->compositeImage( $im, Imagick::COMPOSITE_OVER, $epaisseur, 0 );

	$shadow = clone $fond;
	$shadow->setImageBackgroundColor( new ImagickPixel( 'transparent' ) );
	$shadow->shadowImage( 40, 3, 5, 5 );
	$shadow->compositeImage( $fond, Imagick::COMPOSITE_OVER, 10, 5 );

	$shadow->setImageVirtualPixelMethod( Imagick::VIRTUALPIXELMETHOD_BACKGROUND );
	$controlPoints = array( 10, 50,
		10, 5,
		10, $im->getImageHeight() - 20,
		10, $im->getImageHeight() - 5,
		$im->getImageWidth() - 10, 10,
		$im->getImageWidth() - 10, 20,
		$im->getImageWidth() - 10, $im->getImageHeight() - 10,
		$im->getImageWidth() - 10, $im->getImageHeight() - 30
	);
	$shadow->distortImage( Imagick::DISTORTION_PERSPECTIVE, $controlPoints, TRUE );
	$shadow->trimImage( 0 );
	$result = $shadow;
} else {

	$shadow = clone $im;
	$shadow->setImageBackgroundColor( new ImagickPixel( 'transparent' ) );
	$shadow->shadowImage( 40, 3, 5, 5 );
	$shadow->compositeImage( $im, Imagick::COMPOSITE_OVER, 10, 5 );

	$shadow->setImageVirtualPixelMethod( Imagick::VIRTUALPIXELMETHOD_BACKGROUND );
	$shadow->trimImage( 0 );
	$result = $shadow;
}

$info = $im->getImageGeometry(); 
$ratio = $info['height'] / $info['width'];
$image = base64_encode( $result );
$array = array(
	'type'			=> 'relief',
	'image' 		=> $image,
	'texte' 		=> $text,
	'perspective' 	=> $perspective,
	'widthPx'		=> $info['width'],
	'heightPx'		=> $info['height'],
	'ratio'			=> $ratio,
	'widthCm'		=> round( $height / $ratio ),
	'heightCm'		=> $height
);
$_SESSION['rapidpub']['lettres_relief'] = $array;

header('Content-Type: application/json');
echo json_encode( $array );

?>
