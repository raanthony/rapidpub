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

if ( isset( $_POST['motifs'] ) AND $_POST['motifs'] != '' ) {

	$motifs = $_POST['motifs'];
	$files = glob( '../img/motifs/' . $motifs . '/*.{png}', GLOB_BRACE );
	$arrayFiles = [];

	foreach ( $files AS $file ) {

		$code = basename( $file );
		$arrayFiles[] = ['code' => $code, 'path' => substr( $file, 3 ) ];

	}

	echo json_encode( $arrayFiles );

}
?>
