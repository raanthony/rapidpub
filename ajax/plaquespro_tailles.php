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

if ( isset( $_POST['id'] ) AND is_numeric( $_POST['id'] ) ) {

	$id = (int) $_POST['id'];

	$data = array();

	$statement = $db->prepare("select * from tarifs_plaques WHERE id = :id");
	$statement->execute(array(':id' => $id));
	$row = $statement->fetch();

	if ( $row['longueur'] > $row['hauteur'] )
		$orientation = 'h';
	else
		$orientation = 'v';

	if ( $newL > $maxL OR $newH > $maxH ) {
		if ( $row['longueur'] == $row['hauteur'] ) {
			$width = 500;
			$height = 500;
		} elseif ( $row['longueur'] > $row['hauteur'] ) {
			$ratio = $newH / $newL;
			$width = $maxL;
			$height = $maxL * $ratio;
		} elseif ( $row['hauteur'] > $row['longueur'] ) {
			$ratio = $newL / $newH;
			$height = $maxH;
			$width = $maxH * $ratio;
		}
	} else {
		if ( $row['longueur'] < $row['hauteur'] ) {
			$ratio = $maxH / $newH;
			$width = $newL * $ratio;
			$height = $maxH;
		} elseif ( $row['hauteur'] < $row['longueur'] ) {
			$ratio = $newH / $newL;
			$width = $maxL;
			$height = $maxH * $ratio;
		} elseif ($row['hauteur'] == $row['longueur'] ) {
			$width = 500;
			$height = 500;
		}
	}

	$data = array(
		'id'				=> $row['id'],
		'prix' 				=> $row['prix'],
		'dimensions'		=> $row['dimensions'],
		'hauteur'			=> $row['hauteur'],
		'longueur'			=> $row['longueur'],
		'orientation'		=> $orientation,
		'entretoises'		=> $row['entretoises'],
		'entretoise_gauche' => $row['entretoise_gauche'],
		'entretoise_droite'	=> $row['entretoise_droite'],
		'stock'				=> true
	);

	echo json_encode( $data );

}


?>
