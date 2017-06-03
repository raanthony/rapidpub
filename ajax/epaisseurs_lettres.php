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

session_unset( $_SESSION['rapidpub'] );

require_once( '../includes/connexion.php' );
if ( isset( $_POST['matiere'] ) AND is_numeric( $_POST['matiere'] ) ) {
	$matiere = (int) $_POST['matiere'];
	$statement = $db->prepare("SELECT * FROM epaisseurs_lettres WHERE id_matiere = :id_matiere ORDER BY epaisseur ASC");
	$statement->execute( array( ':id_matiere' => $matiere ) );
	$row = $statement->fetchAll();
	$epaisseurs = array();

	foreach ( $row AS $epaisseur ) {
		$epaisseurs[] = array( 'nom' => $epaisseur['nom'], 'taille' => $epaisseur['epaisseur'], 'id' => $epaisseur['id'], 'couleurs' => $epaisseur['couleurs'] );
	}

	echo json_encode( $epaisseurs );
}
?>
