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

if ( isset( $_POST['imageCanvas'] ) ) {
	$image = str_replace('data:image/png;base64,', '', $_POST['imageCanvas']);
	$img = new Imagick();
	$img->readimageblob( base64_decode( $image ) );
	$id = md5( uniqid( rand(), true ) );
	$img->setImageFormat( "png" );
	$img->writeImage('../uploads/' . $id . '.png');
}
?> 